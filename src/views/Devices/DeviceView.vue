<template>
   <div>
    <el-table :data="deviceData"
      height="840"
      row-key="id"
      border
      default-expand-all>
      <el-table-column prop="session" label="Сессия" sortable/>
      <el-table-column prop="number" label="Номер" sortable/>
      <el-table-column prop="method" label="Метод"/>
      <el-table-column prop="path" label="Путь"/>
      <el-table-column :formatter="(val)=>{
        return `${val.status};${val.status_code}`
      }" label="Статус">
       <template #default="scope">
        <el-tag
          :type="scope.row.status === 'done' ? 'success' : (scope.row.status === 'pending') ? 'warning' : 'error'"
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
import { ref, onMounted } from "vue";
import {useRoute} from "vue-router";

const deviceData = ref<any>([])
const id = Number(useRoute().params['id'])

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
  let response = await getDeviceData(id);
  console.log(response.data.requests)
  deviceData.value = handleTableData(response.data.requests);
}

</script>