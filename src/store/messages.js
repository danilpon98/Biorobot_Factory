export default {
  namespaced: true,
  state: {
    messages: [],
  },
  getters: {
    active: (state) => state.messages.length !== 0,
    one: (state) => {
      if (state.messages.length === 0) return false;
      return state.messages[0];
    },
    index: (state) => (id) => state.messages.findIndex((msg) => msg.id === id),
  },
  mutations: {
    add(state, message) {
      state.messages.push(message);
    },
    remove(state, index) {
      state.messages.splice(index, 1);
    },
  },
  actions: {
    add({ commit }, payload) {
      const id = new Date().getTime();
      commit("add", { ...payload, id });
    },
    remove({ commit, getters }, id) {
      commit("remove", getters.index(id));
    },
  },
};
