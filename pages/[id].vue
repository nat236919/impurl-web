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

(async () => {
    try {
        const response = await useFetch<APIResponse>("/api/redirect", {
            method: "POST",
            body: JSON.stringify({ id: id.value })
        });

        if (response.data.value) {
            const data = response.data.value;
            if (!data || !data.original_url) {
                throw new Error("URL not found");
            } else {
                originalUrl.value = data.original_url;
                await redirectToOriginalUrl(originalUrl.value);
            }
        } else {
            throw new Error("URL not found");
        }
    } catch (error) {
        throw createError({
            statusCode: 404,
            message: error,
        });
    }
})();
</script>

<template>
    <div class="relative max-w-5xl mx-auto pt-16 sm:pt-20 lg:pt-28">
        <h3 v-if="errorMessage" class="mt-4 text-red-600 text-center text-lg sm:text-xl max-w-3xl mx-auto dark:text-red-400">
            {{ errorMessage }}
        </h3>
        <h3 v-else class="mt-4 text-slate-600 text-center text-lg sm:text-xl max-w-3xl mx-auto dark:text-slate-400">
            LOADING...
        </h3>
    </div>
</template>
