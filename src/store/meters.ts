import { flow, types } from 'mobx-state-tree';
import { fetchAddress, fetchMeters, shemaMeter } from '../api/index';

export const Meter = types.model('Meter', {
  id: types.identifier,
  _type: types.array(types.string),
  installation_date: types.string,
  is_automatic: types.boolean,
  area: types.model({
    id: types.string,
  }),
  initial_values: types.optional(types.array(types.number), [0.0]),
  description: types.optional(types.string, ''),
  address: types.optional(types.string, ''),
});

const MetersStore = types
  .model('MetersStore', {
    meters: types.maybe(types.array(Meter)),
  })
  .actions((self) => {
    const getAddress = (meterId: string) => {
      const meter =
        self.meters && self.meters.find((m) => m.area.id === meterId);
      return meter ? meter.address : null;
    };
    return {
      load: flow(function* () {
        const metersData = yield fetchMeters(20, 20);

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
      self.load();
    },
  }));

export default MetersStore as typeof MetersStore & { load: () => void };