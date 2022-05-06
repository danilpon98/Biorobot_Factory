import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import directives from "@/directives";

// import app styles
require("./scss/app.scss");

createApp(App).use(directives).use(store).mount("#app");
