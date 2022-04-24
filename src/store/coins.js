import { plural } from "@/utils/plural";
export default {
  namespaced: true,
  state: {
    coins: 45,
    maxCoins: 100,
  },
  getters: {
    all: (state) => state.coins,
  },
  mutations: {
    setCoins(state, coins) {
      state.coins = coins;
    },
  },
  actions: {
    update({ commit, state, dispatch }, coins) {
      if (coins >= state.maxCoins) {
        dispatch(
          "messages/add",
          {
            title: "Количество монет ограничено",
            description: `Вы не можете нацыганить более ${state.maxCoins} 
            ${plural(state.maxCoins, ["монеты", "монет", "монет"])} biorobo`,
            img: "img/coin-big.png",
          },
          { root: true }
        );
        commit("setCoins", state.maxCoins);
      } else {
        commit("setCoins", coins);
      }
    },
  },
};
