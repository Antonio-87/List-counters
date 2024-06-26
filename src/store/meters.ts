import { Instance, flow, types } from 'mobx-state-tree';
import {
  fetchAddress,
  fetchDeleteMeter,
  fetchMeters,
  shemaMeter,
} from '../api/index';

export const Meter = types.model('Meter', {
  id: types.identifier,
  _type: types.array(types.string),
  installation_date: types.string,
  is_automatic: types.boolean,
  area: types.model({
    id: types.string,
  }),
  initial_values: types.array(types.number),
  description: types.optional(types.string, ''),
  address: types.optional(types.string, ''),
});

const MetersModel = types.model('Meters', {
  meters: types.array(Meter),
});

// Тип для объекта MetersType
export type MetersType = Instance<typeof MetersModel>;

const MetersStore = types
  .model('MetersStore', {
    meters: types.maybe(types.array(Meter)),
    currentPage: types.optional(types.number, 1),
    totalPages: types.optional(types.number, 1),
  })
  .actions((self) => {
    const getAddress = (meterId: string) => {
      const meter =
        self.meters && self.meters.find((m) => m.area.id === meterId);
      return meter ? meter.address : null;
    };

    return {
      totalMeters: flow(function* () {
        const metersData = yield fetchMeters();
        self.totalPages = Math.ceil(metersData.count / 20);
      }),

      deleteMeter: flow(function* (meterId: string) {
        try {
          yield fetchDeleteMeter(meterId);
          const index = self.meters?.findIndex((meter) => meter.id === meterId);

          if (index !== -1) self.meters?.splice(Number(index), 1);

          if (self.meters?.length === 0 && self.currentPage > 1)
            self.currentPage -= 1;
        } catch (error) {
          console.error('Error deleting meter', error);
        }
      }),
      getMeters: flow(function* () {
        const offset = (self.currentPage - 1) * 20;
        const metersData = yield fetchMeters(20, offset);
        yield Promise.all(
          metersData.meters.map(async (meter: shemaMeter) => {
            const addressOld = getAddress(meter.area.id);

            if (!addressOld) {
              const addressData = await fetchAddress(meter.area.id);

              meter.address = `${addressData.house.address},${addressData.str_number_full}`;
            } else {
              meter.address = addressOld;
            }
          })
        );

        self.meters = metersData.meters.map((meter: shemaMeter) => ({
          id: meter.id,
          _type: meter._type,
          installation_date: meter.installation_date,
          is_automatic: meter.is_automatic ?? false,
          area: { id: meter.area.id },
          initial_values: meter.initial_values,
          description: meter.description || '',
          address: meter.address || '',
        }));
      }),
    };
  })
  .actions((self) => ({
    afterCreate() {
      self.totalMeters();
      self.getMeters();
    },
    setCurrentPage(page: number) {
      self.currentPage = page;
      self.getMeters();
    },
    afterDelete(id: string) {
      self.deleteMeter(id).then(() => self.getMeters());
    },
  }));
export type MetersStoreType = Instance<typeof MetersStore>;
export default MetersStore as typeof MetersStore & { load: () => void };
