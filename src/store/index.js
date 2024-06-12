import { types } from 'mobx-state-tree';
import MetersStore from './meters';

const RootStore = types.model('RootStore', {
  meters: MetersStore,
});

export default RootStore;
