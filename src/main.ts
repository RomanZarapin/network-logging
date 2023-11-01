import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
// import ru from "element-plus/dist/locale/ru.mjs";

const app = createApp(App)
  .use(createPinia())
  .use(ElementPlus)
  .use(router)
  .mount("#app");
