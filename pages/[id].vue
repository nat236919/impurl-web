<template>
    <div>
        <p>ID: {{ id }}</p>
        <p>API URL: {{ apiUrl }}</p>
        <p>Response: {{ res }}</p>
    </div>
</template>

<script setup lang="ts">
import { APIResponse } from "~~/types/APIResponse";

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
console.log(route);
console.log(runtimeConfig);

const id = computed(() => route.params.id);
const apiUrl = computed(() => `${runtimeConfig.apiHost}/v1/urls/${id.value}/?token=${runtimeConfig.apiSecretKey}`);

const res = await useFetch<APIResponse>(apiUrl.value);
console.log(res);
</script>
