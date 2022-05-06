export default {
  namespaced: true,
  state: {
    parts: [
      {
        id: "bioarm",
        name: "Биорука",
        plural: "биоруки,биоруки,биорук",
        purchasePrice: 7,
        salePrice: 5,
        availability: 5,
      },
      {
        id: "microchip",
        name: "Микрочип",
        plural: "микрочипа,микрочипа,микрочипов",
        purchasePrice: 5,
        salePrice: 3,
        availability: 5,
      },
      {
        id: "soul",
        name: "Душа",
        plural: "души,души,душь",
        purchasePrice: 25,
        salePrice: 15,
        availability: 5,
      },
    ],
  },
  getters: {
    all: (state) => state.parts,
    one: (state) => (id) => state.parts.find((part) => part.id === id),
    allAssoc: (state) => {
      return state.parts.reduce((prev, curr) => {
        prev[curr.id] = { ...curr };
        return prev;
      }, {});
    },
  },
  mutations: {
    update(state, newPart) {
      state.parts = [
        ...state.parts.map((part) =>
          part.id !== newPart.id ? part : { ...part, ...newPart }
        ),
      ];
    },
  },
  actions: {
    buy({ commit, getters, rootGetters, dispatch }, id) {
      const coins = rootGetters["coins/all"];
      const part = { ...getters.one(id) };
      dispatch("coins/update", coins - part.purchasePrice, { root: true });
      part.availability++;
      commit("update", part);
    },
    sell({ commit, getters, rootGetters, dispatch }, id) {
      const coins = rootGetters["coins/all"];
      const part = { ...getters.one(id) };
      dispatch("coins/update", coins + part.salePrice, { root: true });
      part.availability--;
      commit("update", part);
    },
    setAvailability({ commit, getters }, { id, availability }) {
      const part = { ...getters.one(id) };
      part.availability = availability;
      commit("update", part);
    },
  },
};
