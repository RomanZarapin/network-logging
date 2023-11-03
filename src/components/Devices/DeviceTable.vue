<template>
    <div>
     <el-table :data="deviceData"
       height="840"
       row-key="id"
       :width="tableWidth"
       border
       default-expand-all
       @row-click="openRequestComponent">
       <el-table-column prop="session" label="Сессия" sortable/>
       <el-table-column prop="number" label="Номер" sortable/>
       <el-table-column prop="method" label="Метод"/>
       <el-table-column prop="path" label="Путь"/>
       <el-table-column :formatter="(val)=>{
         return `${val.status};${val.status_code}`
       }" label="Статус">
        <template #default="scope">
         <el-tag
           :type="scope.row.status === 'done' ? 'success' : (scope.row.status === 'pending') ? 'warning' : 'danger'"
           disable-transitions
           >{{ scope.row.status }};{{scope.row.status_code}}</el-tag
         >
       </template></el-table-column>
       <el-table-column prop="created_at" label="Дата"/>
       <el-table-column prop="project.name" label="Проект"/>
     </el-table>
  </div>
 </template>
 
 <script lang="ts" setup>
 import { getDeviceData } from "@/api/devices/DeviceApi";
 import { defineEmits, ref, onMounted } from "vue";
 import {useRoute} from "vue-router";
 
 const deviceData = ref<any>([])
 const tableWidth = ref<number>(50)
 const device_id = Number(useRoute().params['id'])
 const emit = defineEmits(['open-request-component'])


 onMounted(()=>{
      getData();
 })
 
 
 function handleTableData(response: [])
 {
   let groupData = {};
   let tableData = [];
   response.forEach(request => {
     if(groupData[request.session] == undefined)
     {
       groupData[request.session] = request;
       groupData[request.session]['children'] = [];
     }
     else{
       groupData[request.session]['children'].push(request)
     }
   });
   for (const [session, data] of Object.entries(groupData))
   {
     tableData.unshift(data);
   }
   return tableData;
 }
 
 
 async function getData()
 {
   let response = await getDeviceData(device_id);
   deviceData.value = handleTableData(response.data.requests);
 }

 function openRequestComponent(request_data: any)
 {
    emit('open-request-component', request_data)
 }

 
 </script>