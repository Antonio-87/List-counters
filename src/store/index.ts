import { types } from 'mobx-state-tree';
import MetersStore from './meters.ts';

const RootStore = types.model('RootStore', {
  meters: types.optional(MetersStore, {}),
  currentPage: 1,
  totalPages: 1,
});

export default RootStore;
