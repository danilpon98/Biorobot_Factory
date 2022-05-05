import { createStore } from "vuex";

import coins from "@/store/coins";
import messages from "@/store/messages";
import parts from "@/store/parts";
import robots from "@/store/robots";

export default createStore({
  modules: {
    coins,
    messages,
    parts,
    robots,
  },
  strict: process.env.NODE_ENV !== "production",
});
