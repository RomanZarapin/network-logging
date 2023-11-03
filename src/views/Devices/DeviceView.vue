<template>
  <el-button
   type="primary"
   v-if="requestVision"
   @click='hideRequestData'
   :icon="ArrowLeft"
   style="margin-bottom: 20px;"
  >Свернуть запрос</el-button>
  <el-button
   type="primary"
   v-else
   @click='expandRequestData'
   :icon="ArrowRight"
   v-show="Boolean(requestChoosen)"
   style="margin-bottom: 20px;"
  >Развернуть запрос</el-button>
  <div style="display: flex;">
    <div :style="{width: deviceTableWidth}">
      <DeviceTable
       @open-request-component="openRequestComponent"
      />
    </div>
    <div v-if="requestVision" style="width: 45%; margin-left: 20px; max-width: 45%;">
      <DeviceCard :requestData="requestData"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DeviceTable from '@/components/Devices/DeviceTable'; 
import DeviceCard from '@/components/Devices/DeviceCard';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  ArrowLeft,
  ArrowRight,
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const device_id = Number(useRoute().params['id'])
const requestVision = ref<Boolean>(Boolean(route.query.request_id))
const requestChoosen = ref<Boolean>(requestVision.value)
const deviceTableWidth = ref<string>((Boolean(route.query.request_id)) ? '55%': '100%')
const requestData = ref<Object | null | undefined>({test: '123'})

function hideRequestData()
{
  requestVision.value = false
  deviceTableWidth.value = '100%'
}

function expandRequestData()
{
  requestVision.value = true
  deviceTableWidth.value = '55%'
}

watch(
  () => route.query.request_id,
  async newRequestID => {
    requestVision.value = Boolean(route.query.request_id)
    deviceTableWidth.value = '55%'
    requestChoosen.value = true
  }
)

function openRequestComponent(request_data: object)
 {   
    requestData.value = request_data
    router.push({name: "device", params: {id: device_id}, query: {request_id: request_data.id}})
 }

</script>