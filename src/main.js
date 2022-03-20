import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

// import app styles
require("./scss/app.scss");

createApp(App).use(store).mount("#app");
