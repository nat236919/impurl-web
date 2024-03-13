<script setup lang="ts">
import { APIResponse } from "~~/types/APIResponse";

const route = useRoute();
const id = computed(() => route.params.id);
const originalUrl = ref(null);

const res = await useFetch<APIResponse>("/api/redirect", {
    method: "POST",
    body: JSON.stringify({ "id": id.value })
}).catch((error) => {
    console.error(error);
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
} else {
    // Redirect to original URL
    originalUrl.value = computed(() => data.value.original_url);
}
</script>

<template>
    <div>
        Loading...
        {{ data }}
        {{ originalUrl }}
    </div>
</template>
