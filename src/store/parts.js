export default {
  namespaced: true,
  state: {
    parts: [
      {
        id: "bioarm",
        name: "Биорука",
        purchasePrice: 7,
        salePrice: 5,
        availability: 1,
      },
      {
        id: "microchip",
        name: "Микрочип",
        purchasePrice: 5,
        salePrice: 3,
        availability: 1,
      },
      {
        id: "soul",
        name: "Душа",
        purchasePrice: 25,
        salePrice: 15,
        availability: 0,
      },
    ],
  },
  getters: {
    all: (state) => state.parts,
    one: (state) => (id) => state.parts.find((part) => part.id === id),
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
    buy({ commit, getters, rootGetters }, id) {
      const coins = rootGetters["coins/all"];
      const part = { ...getters.one(id) };
      commit("coins/setCoins", coins - part.purchasePrice, { root: true });
      part.availability++;
      commit("update", part);
    },
  },
};
