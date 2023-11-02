import PageWrap from "@/views/PageWrap.vue";
import DeviceListView from "@/views/Devices/DeviceListView.vue";
import DeviceView from "@/views/Devices/DeviceView.vue";

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/devices",
    component: DeviceListView,
    name: "devices"
  },
  {
    path: "/devices/:id",
    component: DeviceView,
    name: "device"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
