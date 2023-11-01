<template>
  <div>{{ info }}</div>
</template>

<script lang="ts" setup>
import { getTestData } from "@/api/test/test";
import { onMounted, ref } from "vue";

const info = ref<any>({});

onMounted(() => {
  getData();
});

async function getData() {
  info.value = await getTestData();
}
</script>
