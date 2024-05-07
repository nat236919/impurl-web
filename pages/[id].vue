<script setup lang="ts">
import { APIResponse } from "~~/types/APIResponse";

// Route and ID
const route = useRoute();
const id = computed(() => route.params.id);

// Redirect to original URL
// const originalUrl = "http://nuttaphat.com";
const originalUrl = ref<string | null>(null);
const errorMessage = ref<string | null>(null);

async function redirectToOriginalUrl(url: string) {
    try {
        await navigateTo(url, { external: true });
    } catch (error) {
        errorMessage.value = "Browser does not allow redirection.";
    }
}

try {
    const response = await useFetch<APIResponse>("/api/redirect", {
        method: "POST",
        body: JSON.stringify({ id: id.value }),
        timeout: 30000, // to set the timeout to 30 seconds
    });

    if (response.data.value) {
        const data = response.data.value;
        if (!data || !data.original_url) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Page Not Found'
            })
        } else {
            originalUrl.value = data.original_url;
            await redirectToOriginalUrl(originalUrl.value);
        }
    } else {
        throw createError({
            statusCode: 404,
            statusMessage: 'Page Not Found'
        })
    }
} catch (error) {
    throw createError({
        statusCode: 404,
        message: error,
    });
}
</script>

<template>
    <div class="relative max-w-5xl mx-auto pt-16 sm:pt-20 lg:pt-28">
        <h3 class="mt-4 text-slate-600 text-center text-lg sm:text-xl max-w-3xl mx-auto dark:text-slate-400">
            <span v-if="errorMessage">{{ errorMessage }}</span>
            <span v-else>Redirecting...</span>
        </h3>
    </div>
</template>
