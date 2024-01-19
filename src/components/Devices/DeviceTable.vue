<template>
    <div>
     <el-table :data="deviceData"
       height="840"
       row-key="id"
       :width="tableWidth"
       border
       default-expand-all
       highlight-current-row
       @row-click="openRequestComponent">
       <el-table-column prop="session" label="Сессия" :width="110" sortable/>
       <el-table-column prop="number" label="Номер" :width="110" sortable/>
       <el-table-column prop="method" label="Метод" :width="90"/>
       <el-table-column prop="path" label="Путь"/>
       <el-table-column :width="110" :formatter="(val)=>{
         return `${val.status};${val.status_code}`
       }" label="Статус">
        <template #default="scope">
         <el-tag
           :type="scope.row.status === 'done' ? 'success' : (scope.row.status === 'pending') ? 'warning' : 'danger'"
           disable-transitions
           >{{ scope.row.status }};{{scope.row.status_code}}</el-tag
         >
       </template></el-table-column>
       <el-table-column prop="created_at" label="Дата" :width="160" :formatter="(val)=>{
          let created_at = new Date(val.created_at)
          
          return created_at.toLocaleString()
        }"/>
       <el-table-column prop="project.name" label="Проект" :width="140"/>
     </el-table>
  </div>
 </template>
 
 <script lang="ts" setup>
 import { getDeviceData } from "@/api/devices/DeviceApi";
 import { defineEmits, ref, onMounted } from "vue";
 import {useRoute, useRouter} from "vue-router";
 
 const route = useRoute()
 const deviceData = ref<any>([])
 const tableWidth = ref<number>(50)
 const device_id = Number(route.params['id'])
 const emit = defineEmits(['open-request-component'])
 const router = useRouter()


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
    let request_id = route.query.request_id;
    deviceData.value = handleTableData(response.data.requests);
    if (request_id){
      let request_data = response.data.requests.find((request: any) => request.id = request_id)
      emit('open-request-component', request_data)
    }
 }

 function openRequestComponent(request_data: any)
 {
    router.push({name: "device", params: {id: device_id}, query: {request_id: request_data.id}})
    emit('open-request-component', request_data)
 }
 
 </script>