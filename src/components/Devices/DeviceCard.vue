<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Запрос № {{requestID}}</span>
        <el-button class="button">Скрыть информацию</el-button>
      </div>
    </template>
    <div class="card-header">
        <span>Метод {{ method }}</span>
        <el-button class="button">Скопировать CURL</el-button>
    </div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="Заголовки ответа" name="0">
        <div>
          <vue-json-pretty :data="responseHeaders" :virtual="true"/>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Ответ" name="1">
        <div>
          <vue-json-pretty :data="responseData" :virtual="true"/>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Заголовки запроса" name="2">
        <div>
          <vue-json-pretty :data="requestHeaders" :virtual="true"/>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Полезная нагрузка запроса" name="3">
        <div>
          <vue-json-pretty :data="requestHeaders" :virtual="true"/>
        </div>
      </el-collapse-item>
      <el-collapse-item title="CURL" name="4">
        <div>
            {{ CURL }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { LocationQueryValue, useRoute } from 'vue-router';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

const route = useRoute()
const requestID = ref<LocationQueryValue | LocationQueryValue[]>()
const requestData = ref<Object>({})

const responseData = ref<Object> ({})
const responseHeaders = ref<Object> ({})
const requestHeaders = ref<Object> ({})
const CURL = ref<String> ("")
const method = ref<String> ("")

const props = defineProps(['requestData'])
console.log(props.requestData)

watch(
  () => route.query.request_id,
  async newRequestID => {
    requestID.value = route.query.request_id
    let request_data = props.requestData
    console.log(request_data)
    responseData.value = JSON.parse(request_data.response)
    requestData.value = JSON.parse(request_data.payload)
    responseHeaders.value = JSON.parse(request_data.headers_request)
    requestHeaders.value = JSON.parse(request_data.headers_response)
    CURL.value = JSON.parse(request_data.curl)
    method.value = JSON.parse(request_data.method)
  }
)

</script>


<style>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>