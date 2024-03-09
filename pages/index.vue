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
            <div>
                <div class="mt-2">
                    <input id="url" name="url" type="url" v-model="url" required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>
            <button
                class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
                @click="shortenURL()">
                Shrink!
            </button>
        </div>
        <!-- Footer -->
        <div class="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
            <div>
                <p class="text-center text-slate-600 dark:text-slate-400">
                    Made with ❤️ by <a href="https://www.mythnolia.com" target="_blank" class="underline">Mythnolia</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
console.log("Loading runtimeConfig in index.vue")
const runtimeConfig = useRuntimeConfig()
console.log(runtimeConfig)
</script>

<script>
export default {
    data() {
        return {
            url: "",
            shortenedURL: ""
        }
    },
    methods: {
        async shortenURL() {
            console.log("Shortening URL")
            console.log(this.url)
        },
    },
}
</script>

<style></style>
