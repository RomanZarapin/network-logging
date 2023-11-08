<template>
  <div style="display: flex;">
    <div :style="{width: deviceTableWidth}">
      <DeviceTable
       @open-request-component="openRequestComponent"
      />
    </div>
    <div v-if="requestVision" style="width: 45%; margin-left: 20px; max-width: 45%;">
      <DeviceCard :requestData="requestData"
      @close-request-component="hideRequestData"
      />
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

const requestVision = ref<Boolean>(false)
const requestChoosen = ref<Boolean>(requestVision.value)
const deviceTableWidth = ref<string>('100%')
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

function openRequestComponent(request_data: object)
 {  
    requestData.value = request_data
    requestVision.value = true
    deviceTableWidth.value = '55%'
    requestChoosen.value = true
 }
</script>