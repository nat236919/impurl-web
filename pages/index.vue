<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const apiUrl = computed(() => `${runtimeConfig.apiHost}/v1/urls`);
const apiSecretKey = computed(() => runtimeConfig.apiSecretKey);
const curYear = new Date().getFullYear();
const url = ref(null)

const res = ref(null);
async function shrinkUrl() {
    if (!url.value) {
        alert("Please enter a URL");
        return;
    }

    // Check valid URL
    const validUrl = new RegExp(
        "^(http|https)://[^s/$.?#].[^s]*$"
    );
    if (!validUrl.test(url.value)) {
        alert("Please enter a valid URL");
        return;
    }

    // Call the API
    res.value = await useFetch("/api/urls", {
        method: "POST",
        body: JSON.stringify({ "original_url": url.value })
    });
}
</script>

<template>
    <div class="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
        <!-- Title -->
        <h1
            class="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
            impURL
        </h1>
        <h3 class="mt-4 text-slate-600 text-center text-lg sm:text-xl max-w-3xl mx-auto dark:text-slate-400">
            Where magic makes links shorter and sweeter
        </h3>
        <!-- Call to Action -->
        <div class="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
            <input
                class="items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
                id="url" name="url" type="url" v-model="url" placeholder="Enter your long URL here" required />
            <button class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400
                focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex
                items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
                @click="shrinkUrl">
                Shrink!
            </button>
        </div>
        <!-- Result -->
        <div class="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm" v-if="res">
            <div v-if="res.data">
                <p class="text-center text-slate-600 dark:text-slate-400 success-message">
                    {{ res.data.id }}
                </p>
            </div>
            <div v-else>
                <!-- Red text -->
                <p class="text-center text-slate-600 dark:text-slate-400 err-message">
                    {{ res.error }}
                </p>
            </div>
        </div>
        <!-- Footer -->
        <div class="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
            <div>
                <!-- Author -->
                <p class="text-center text-slate-600 dark:text-slate-400">
                    Made with ❤️ by <a href="https://www.mythnolia.com" target="_blank" class="underline">Mythnolia</a>
                </p>
                <!-- Copyright -->
                <p class="text-center text-slate-600 dark:text-slate-400">
                    &copy; {{ curYear }} All rights reserved.
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
body {
    background-color: #fcfcfc;
}

.success-message {
    color: rgb(70, 255, 70);
}

.err-message {
    color: rgb(255, 70, 70);
}
</style>
