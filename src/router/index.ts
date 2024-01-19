import PageWrap from "@/views/PageWrap.vue";
import DeviceListView from "@/views/Devices/DeviceListView.vue";
import DeviceView from "@/views/Devices/DeviceView.vue";
import SettingsView from "@/views/Settings/SettingsView.vue";

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import UserListViewVue from "@/views/Users/UserListView.vue";

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
  },
  {
    path: "/users",
    component: UserListViewVue,
    name: "users"
  },
  {
    path: "/settings",
    component: SettingsView,
    name: "settings"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
