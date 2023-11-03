import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import VueJsonPretty from 'vue-json-pretty'
// import ru from "element-plus/dist/locale/ru.mjs";

const app = createApp(App)
  .use(createPinia())
  .use(ElementPlus)
  .use(router)
  .use(VueJsonPretty)
  .mount("#app");
