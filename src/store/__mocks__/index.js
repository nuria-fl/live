import Vue from 'vue';
import Vuex from 'vuex';
import items from '../../data/items'

Vue.use(Vuex);

export const getters = {
  isInventoryFull: jest.fn().mockReturnValue(false),
  slotsInInventoryLeft: jest.fn().mockReturnValue(8),
  craftableItems: jest.fn().mockReturnValue()
};

export const mutations = {
  pauseGame: jest.fn(),
  playGame: jest.fn(),
  changePage: jest.fn(),
  increaseDayCount: jest.fn(),
  decrease: jest.fn(),
  increase: jest.fn(),
  addInventory: jest.fn(),
  removeInventory: jest.fn(),
  disable: jest.fn(),
  enable: jest.fn(),
  enableFire: jest.fn(),
  disableFire: jest.fn(),
  getSick: jest.fn(),
  getCured: jest.fn()
};

export const actions = {
  initInventory: jest.fn(),
  decreaseAsync: jest.fn(),
  increaseAsync: jest.fn(),
  scavenge: jest.fn(),
  hunt: jest.fn(),
  removeItemsById: jest.fn()
};

export const state = {
  gameOver: false,
  causeOfDeath: null,
  paused: false,
  disabled: false,
  stats: {
    health: 100,
    water: 100,
    food: 100,
    energy: 100
  },
  existingItems: items,
  inventory: [],
  hasFire: false,
  isSick: false,
  daysSurvived: 0,
  currentPage: 'home'
};

// eslint-disable-next-line no-underscore-dangle
export function __createMocks(custom = { getters: {}, mutations: {}, actions: {}, state: {} }) {
  const mockGetters = Object.assign({}, getters, custom.getters);
  const mockMutations = Object.assign({}, mutations, custom.mutations);
  const mockActions = Object.assign({}, actions, custom.actions);
  const mockState = Object.assign({}, state, custom.state);

  return {
    getters: mockGetters,
    mutations: mockMutations,
    actions: mockActions,
    state: mockState,
    store: new Vuex.Store({
      getters: mockGetters,
      mutations: mockMutations,
      actions: mockActions,
      state: mockState,
    }),
  };
}

export const store = __createMocks().store;
