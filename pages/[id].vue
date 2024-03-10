<script setup lang="ts">
import { APIResponse } from "~~/types/APIResponse";

// Get Route and Runtime Config
const route = useRoute();
const runtimeConfig = useRuntimeConfig();

// Get ID and API URL
const id = computed(() => route.params.id);
const apiUrl = computed(() => `${runtimeConfig.apiHost}/v1/urls/${id.value}`);

// Fetch Data
const res = await useFetch<APIResponse>(apiUrl.value, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "X-Api-Key": runtimeConfig.apiSecretKey,
    },
}).catch((error) => {
    throw createError({
        statusCode: 404,
        message: "URL not found",
    });
});

// Get data from Response
const data = computed(() => res.data.value);

// Redirect to 404 if data not found
if (!data.value || !data.value.original_url) {
    throw createError({
        statusCode: 404,
        message: "URL not found",
    });
}
const originalUrl = computed(() => data.value.original_url);
</script>

<template>
    <div>
        Loading...
        {{ data }}
        {{ originalUrl }}
    </div>
</template>
