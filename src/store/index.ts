import { types } from 'mobx-state-tree';
import MetersStore from './meters.ts';

const RootStore = types.model('RootStore', {
  meters: types.optional(MetersStore, {}),
});

export default RootStore;
