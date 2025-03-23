import "./assets/styles/index.scss";

import { createApp } from "vue";

import App from "./App.vue";
import { createAppStore } from "./store";

const store = createAppStore();

const app = createApp(App);

app.use(store);

app.mount("#app");
