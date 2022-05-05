export default {
  namespaced: true,
  state: {
    robots: [
      {
        id: 1,
        type: "front",
        gender: "male",
        price: 10,
        requirements: {
          bioarm: 4,
          microchip: 4,
          soul: 1,
        },
      },
      {
        id: 2,
        type: "front",
        gender: "famale",
        price: 12,
        requirements: {
          bioarm: 4,
          microchip: 3,
          soul: 1,
        },
      },
      {
        id: 3,
        type: "design",
        gender: "male",
        price: 9,
        requirements: {
          bioarm: 3,
          microchip: 4,
          soul: 2,
        },
      },
      {
        id: 4,
        type: "design",
        gender: "famale",
        price: 16,
        requirements: {
          bioarm: 4,
          microchip: 4,
          soul: 3,
        },
      },
    ],
    manufactured: [],
  },
  getters: {
    one:
      (state) =>
      ({ type, gender }) => {
        return state.robots.find(
          (robot) => robot.type === type && robot.gender === gender
        );
      },
    isManufactured: (state) => (id) => state.manufactured.includes(id),
  },
  mutations: {
    addToManufactured(state, id) {
      state.manufactured.push(id);
    },
  },
  actions: {
    make({ getters, commit, dispatch }, id) {
      if (!getters.isManufactured(id)) {
        commit("addToManufactured", id);
        dispatch(
          "messages/add",
          {
            title: "Биоробот произведён",
            description: "Поздравляем! Вы произвели биоробота",
          },
          { root: true }
        );
      }
    },
  },
};
