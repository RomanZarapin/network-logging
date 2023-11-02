<template>
  <div id="app" style="display: flex; width: 100%;">
    <div>
      <MenuComponent/>
    </div>
    <div style="width: 100%;">
      <RouterView/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import MenuComponent from "./components/BaseComponents/MenuComponent.vue";

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
