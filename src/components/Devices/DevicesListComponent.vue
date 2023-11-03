<template>
 <div>
    <el-table :data="deviceList" height="840" @row-click="openDeviceView">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="uuid" label="UUID"></el-table-column>
      <el-table-column prop="name" label="Устройство"/>
      <el-table-column prop="type" label="Тип"/>
      <el-table-column prop="version" label="Версия"/>
      <el-table-column prop="count_requests" label="Счетчик запросов"/>
      <el-table-column prop="updated_at" label="Последнее обновление"/>
    </el-table>
 </div>
  <div class="pagination-block">
    <el-pagination 
      v-if="visablePafinationFlag"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 25, 50, 100]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="prev, pager, next, jumper, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-pagination 
      v-else
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 25, 50, 100]"
      :small="small"
      :background="background"
      layout="sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { getDeviceList } from "@/api/devices/DeviceApi";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const deviceList = ref<any>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)
const total = ref<number>(100)
const visablePafinationFlag = ref(false)
const router = useRouter()

onMounted(()=>{
    getTableData();
})

async function getTableData() {
    let parameters = {
      'page': currentPage.value,
      'per_page': pageSize.value
    }
    let response = await getDeviceList(parameters);
    deviceList.value = response.data.devices.data;
    currentPage.value = response.data.devices.current_page
    total.value = response.data.devices.total
    visablePafinationFlag.value = (total.value > pageSize.value)
    return deviceList;
}

function openDeviceView(device: object){
  router.push({name: "device", params: {id: device.id}})
}

const handleSizeChange = (val: number) => {
  currentPage.value = 1;
  pageSize.value = val;
  getTableData();
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getTableData();
}

</script>


<style scoped>
.pagination-block {
  box-sizing: border-box;
  height: 60px;

  padding-right: 16px;

  background: #FFFFFF;
  border-top: 1px solid var(--text_secondary);

  display: flex;
  align-items: center;
  justify-content: flex-end;

  z-index: 10;
}
</style>