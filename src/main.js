// Vuetify 세팅 모아둔 곳
import { registerPlugins } from "@/plugins";
import App from "./App.vue";
import { createApp } from "vue";
import router from "./router";

import "unfonts.css";

const app = createApp(App);

registerPlugins(app);

app.use(router);
app.mount("#app");
