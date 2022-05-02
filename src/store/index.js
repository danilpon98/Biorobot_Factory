import { createStore } from "vuex";

import coins from "@/store/coins";
import messages from "@/store/messages";
import parts from "@/store/parts";

export default createStore({
  modules: {
    coins,
    messages,
    parts,
  },
  strict: process.env.NODE_ENV !== "production",
});
