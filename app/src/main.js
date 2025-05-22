import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import VueClipboard from "vue-clipboard2";

createApp(App)
  .use(VueClipboard)
  .mount("#app");
