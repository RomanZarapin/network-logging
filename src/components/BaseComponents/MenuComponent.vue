<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @select="handleClick"
    >
      <el-menu-item index="devices">
        <el-icon :size="20"><iphone/></el-icon>
        <template #title>Устройства</template>
      </el-menu-item>
      <el-menu-item index="users">
        <el-icon :size="20" ><user-filled/></el-icon>
        <template #title>Пользователи</template>
      </el-menu-item>
      <el-menu-item index="settings">
        <el-icon :size="20"><setting/></el-icon>
        <template #title>Настройки</template>
      </el-menu-item>

    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import router from '@/router';
  import {
    Menu as IconMenu,
    Setting,
    Iphone,
    UserFilled
    } from '@element-plus/icons-vue'
  
  const isCollapse = ref(false)
  const handleClick = (menuItem: any) => {
    router.push({name: menuItem});
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>
  
  <style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
  }
  </style>
  