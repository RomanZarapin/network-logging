<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Запрос № {{requestID}}</span>
        <el-button class="button" @click="closeRequestCard">Скрыть информацию</el-button>
      </div>
    </template>
    <div class="card-with-btn">
        <span>{{ method }}: {{ url }}</span>
        <el-button class="button" @click="copyCURL" >Скопировать CURL</el-button>
    </div>
    <el-collapse>
      <el-collapse-item title="Заголовки ответа" name="0">
        <div>
          <vue-json-pretty :data="responseHeaders" :virtual="true" :showIcon="true" :showLineNumber="true"
          :onNodeClick="copyResHNodeData" :collapsedOnClickBrackets="false" :height="height1"/>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Ответ" name="1">
        <div>
          <vue-json-pretty :data="responseData" :virtual="true" :showIcon="true" :showLineNumber="true"
          :onNodeClick="copyResBNodeData" :collapsedOnClickBrackets="false" :height="height2"/>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Заголовки запроса" name="2">
        <div>
          <vue-json-pretty :data="requestHeaders" :virtual="true" :showIcon="true" :showLineNumber="true"
          :onNodeClick="copyReqHNodeData" :collapsedOnClickBrackets="false"/>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Полезная нагрузка запроса" name="3">
        <div style="word-break: break-word;">
          <vue-json-pretty :data="requestData" :virtual="true" :showIcon="true" :showLineNumber="true"
          :onNodeClick="copyReqBNodeData" :collapsedOnClickBrackets="false"/>
        </div>
      </el-collapse-item>
      <el-collapse-item title="CURL" name="4">
        <p style="word-break: break-word; text-align: start;">
            {{ CURL }}
        </p>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { LocationQueryValue } from 'vue-router';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

const requestID = ref<LocationQueryValue | LocationQueryValue[]>()
const requestData = ref<any>({})

const responseData = ref<any> ({})
const responseHeaders = ref<any> ({})
const requestHeaders = ref<any> ({})
const CURL = ref<String> ("")
const method = ref<String> ("")
const url = ref<String> ("")

const height1 = computed(() => Math.min(JSON.stringify(responseHeaders.value, null, 2).split('\n').length * 20 + 20, 500))
const height2 = computed(() => Math.min(JSON.stringify(responseData.value, null, 2).split('\n').length * 20 + 20, 500))

const props = defineProps(['requestData'])
const emit = defineEmits(['close-request-component'])

function copyCURL(){
  navigator.clipboard.writeText(CURL.value.toString())
}

function closeRequestCard(){
  emit('close-request-component')
}

function CopyNodeData(nodeData: any, baseObject: any){
  switch (nodeData.type) {
    case "content":
      navigator.clipboard.writeText(JSON.stringify(nodeData.content))
      break;
    case "arrayStart":
    case "objectStart":
      let path = nodeData.path.replaceAll(/\]\[|[\[]/g, ".")
      path = path.replaceAll(/["\]]/g, "")
      path = path.split('.')
      for (var i=1, len=path.length; i<len; i++){
        baseObject = baseObject[path[i]];
      };
      navigator.clipboard.writeText(JSON.stringify(baseObject))
      break;
  }
}

function copyReqHNodeData(data: any){
  CopyNodeData(data, requestHeaders.value)
}

function copyResBNodeData(data: any){
    CopyNodeData(data, responseData.value)
}

function copyReqBNodeData(data: any){
  CopyNodeData(data, requestData.value)
}

function copyResHNodeData(data: any){
  CopyNodeData(data, responseHeaders.value)
}

function updateCard(){
  console.log('here', props.requestData)
  let request_data = props.requestData
  requestID.value = request_data.id
  url.value = request_data.url
  responseData.value = JSON.parse(request_data.response)
  requestData.value = JSON.parse(request_data.payload)
  responseHeaders.value = JSON.parse(request_data.headers_request)
  requestHeaders.value = JSON.parse(request_data.headers_response)
  CURL.value = request_data.curl
  method.value = request_data.method
}

watch(
  () => props.requestData.id,
  async newRequestID => {
    updateCard()
  }
)
updateCard()

</script>


<style>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-with-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 18px;
  }
</style>