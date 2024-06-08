import { flow, types } from 'mobx-state-tree';
import getCounters from '../api/index';

const Counter = types.model('Counter', {
  id: types.identifier,
  installation_date: types.string,
  is_automatic: types.boolean,
  initial_values: types.array,
  description: types.string,
});

const CountersStore = types
  .model('CountersStore', {
    counters: types.maybe(types.array(Counter)),
  })
  .actions((self) => {
    return {
      // eslint-disable-next-line require-yield
      load: flow(function* () {
        self.counters = getCounters('meters', { limit: 20, offset: 20 });
      }),
    };
  });

export default CountersStore;
