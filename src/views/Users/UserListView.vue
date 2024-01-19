<template>
    <el-button @click="visible = true">
      Добавить пользователя
    </el-button>
    <UserModal :visible="visible" :userData="{}" @close-modal="visible = false"/>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { ElButton, ElDialog } from 'element-plus'
  import { CircleCloseFilled } from '@element-plus/icons-vue'
  import UserModal from '@/views/Users/components/UserModal'
  
  const visible = ref(false)
  </script>
  
  <style scoped>
  .my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  </style>
  