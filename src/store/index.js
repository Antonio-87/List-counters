import { types } from 'mobx-state-tree';
import CountersStore from './counters';
import AdressesStore from './adresses';

const RootStore = types.model('RootStore', {
  counters: CountersStore,
  adresses: AdressesStore,
});

export default RootStore;
