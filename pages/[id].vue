<script setup lang="ts">
import { APIResponse } from "~~/types/APIResponse";

// Route and ID
const route = useRoute();
const id = computed(() => route.params.id);

// Redirect to original URL
const originalUrl = ref<string | null>(null);
originalUrl.value = await useFetch<APIResponse>("/api/redirect", {
    method: "POST",
    body: JSON.stringify({ "id": id.value })
}).then((response) => {
    if (response.data.value) {
        let data = response.data.value;
        if (!data || !data.original_url) {
            throw new Error("URL not found");
        } else {
            let originalUrl = data.original_url;
            return originalUrl;
        }

    } else {
        throw new Error("No URL found");
    }
}).catch((error) => {
    throw createError({
        statusCode: 404,
        message: error,
    });
});

if (await originalUrl.value) {
    await navigateTo(originalUrl.value, {
        external: true,
        open: {
            target: "_blank",
            windowFeatures: {
                width: 500,
                height: 500
            }
        }
    })
}
</script>

<template>
    <div>
        Loading...
    </div>
</template>
