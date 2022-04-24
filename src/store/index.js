import { createStore } from "vuex";

import coins from "@/store/coins";
import messages from "@/store/messages";

export default createStore({
  modules: {
    coins,
    messages,
  },
  strict: process.env.NODE_ENV !== "production",
});
