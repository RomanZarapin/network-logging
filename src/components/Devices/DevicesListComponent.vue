<template>
 <div>
    <el-table :data="deviceList">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="count_requests" label="Счетчик запросов"/>
      <el-table-column prop="name" label="Устройство"/>
      <el-table-column prop="version" label="Версия"/>
    </el-table>
 </div>
</template>

<script lang="ts" setup>
import { getDeviceList } from "@/api/devices/DeviceApi";
import { ref, onMounted } from "vue";

const deviceList = ref<any>([])

onMounted(()=>{
    getTableData();
})

async function getTableData() {

    let response = await getDeviceList();
    deviceList.value = response.data.devices.data.slice(1, 50);
    console.log(deviceList.value);
    return deviceList;
}

</script>