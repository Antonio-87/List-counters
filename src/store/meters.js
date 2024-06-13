import { flow, types } from 'mobx-state-tree';
import { fetchAddress, fetchMeters } from '../api/index';

const Meter = types.model('Meter', {
  id: types.identifier,
  _type: types.array(types.string),
  installation_date: types.string,
  is_automatic: types.boolean,
  area: types.object,
  initial_values: types.optional(types.array(types.number), [0.0]),
  description: types.maybe(types.string),
  address: types.maybe(types.string),
});

const MetersStore = types
  .model('MetersStore', {
    meters: types.maybe(types.array(Meter)),
  })
  .actions((self) => {
    const getAddress = (meterId) => {
      const meter = self.meters.find((m) => m.area.id === meterId);
      return meter ? meter.address : null;
    };
    return {
      load: flow(function* () {
        const metersData = yield fetchMeters(20, 20);

        yield Promise.all(
          metersData.meters.map(async (meter) => {
            const addressOld = getAddress(meter.area.id);
            if (!addressOld) {
              const addressData = await fetchAddress(meter.area.id);
              meter.address = `${addressData.house.address},${addressData.str_number_full}`;
            } else {
              meter.address = addressOld;
            }
            return Promise.resolve();
          })
        );

        self.meters = metersData.meters;
      }),
      afterCreate() {
        self.load;
      },
    };
  });

export default MetersStore;
