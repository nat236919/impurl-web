<script setup lang="ts">
// const reqUrl = "https://localhost:3000/";
const reqUrl = useRequestURL(); // Change this to localhost if running locally
const curYear = new Date().getFullYear();
const inputUrl = ref(null);
const res = ref(null);
const loading = ref(false);

async function shrinkUrl() {
    if (!inputUrl.value) {
        alert("Please enter a URL");
        return;
    }

    // Check valid URL
    const validUrl = new RegExp(
        "^(http|https)://[^s/$.?#].[^s]*$"
    );
    if (!validUrl.test(inputUrl.value)) {
        alert("Please enter a valid URL");
        return;
    }

    loading.value = true;

    try {
        // Call the API
        res.value = await useFetch("/api/urls", {
            method: "POST",
            body: JSON.stringify({ "original_url": inputUrl.value }),
            timeout: 10000, // to set the timeout to 10 seconds
        });
    } catch (error) {
        res.value = { error: error.message };
    } finally {
        loading.value = false;
    }
}

async function copyToClipboard() {
    let fullUrl = `${reqUrl}${res.value.data.id}`;
    if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(fullUrl);
            alert("Copied to clipboard");
        } catch (err) {
            fallbackCopyTextToClipboard(fullUrl);
        }
    } else {
        fallbackCopyTextToClipboard(fullUrl);
    }
}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        alert("Fallback: Copying text command was " + msg);
    } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
}
</script>

<template>
    <div class="relative max-w-5xl mx-auto pt-16 sm:pt-20 lg:pt-28 px-4 sm:px-0">
        <!-- Logo -->
        <img class="h-auto max-w-full mx-auto logo" src="/img/imp-logo.png" alt="Imp Logo" />
        <!-- Title -->
        <h1
            class="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
            impURL
        </h1>
        <h3 class="mt-4 text-slate-600 text-center text-lg sm:text-xl max-w-3xl mx-auto dark:text-slate-400">
            Where magic makes links shorter and sweeter
        </h3>
        <!-- Call to Action -->
        <div
            class="mt-6 sm:mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm">
            <input
                class="w-full sm:w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
                :class="{ 'loading-input': loading }"
                id="url" name="url" type="url" v-model="inputUrl" placeholder="Enter your long URL here"
                :disabled="loading"
            />
                <button class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400
                    focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-4 rounded-lg flex
                    items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
                    @click="shrinkUrl"
                >
                    <span v-if="loading" class="animate-spin">
                        <!-- Spinner icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-5 h-5 mx-auto">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </span>
                    <span v-else>Shrink!</span>
                </button>
        </div>
        <!-- Result -->
        <div class="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm" v-if="res">
            <div v-if="res.data">
                <div class="text-sm leading-6" v-if="res.data.id">
                    <blockquote
                        class="relative flex flex-col-reverse bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
                        <span>
                            {{ reqUrl }}{{ res.data.id }}
                            <button @click="copyToClipboard">
                                <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor" viewBox="0 0 18 20">
                                    <path
                                        d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z">
                                    </path>
                                    <path
                                        d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z">
                                    </path>
                                </svg>
                            </button>
                        </span>
                    </blockquote>
                </div>
            </div>
            <div v-else>
                <!-- Error text -->
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

<style lang="scss" scoped>
.ocean {
    height: 5%;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #015871;
}

.wave {
    background: url(https://cdn.kcak11.com/codepen_assets/wave_animation/wave.svg) repeat-x;
    position: absolute;
    top: -198px;
    width: 6400px;
    height: 198px;
    animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
    transform: translate3d(0, 0, 0);
}

.wave:nth-of-type(2) {
    top: -175px;
    animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite,
        swell 7s ease -1.25s infinite;
    opacity: 1;
}

@keyframes wave {
    0% {
        margin-left: 0;
    }

    100% {
        margin-left: -1600px;
    }
}

@keyframes swell {

    0%,
    100% {
        transform: translate3d(0, -25px, 0);
    }

    50% {
        transform: translate3d(0, 5px, 0);
    }
}

.endWave {
    display: none;
}

.logo {
    max-width: 250px;
    animation: wiggle 20s;
    animation-iteration-count: infinite;
}

@keyframes wiggle {
    0% {
        transform: translate(1px, 1px) rotate(0deg);
    }

    10% {
        transform: translate(-1px, -2px) rotate(-1deg);
    }

    20% {
        transform: translate(-3px, 0px) rotate(1deg);
    }

    30% {
        transform: translate(3px, 2px) rotate(0deg);
    }

    40% {
        transform: translate(1px, -1px) rotate(1deg);
    }

    50% {
        transform: translate(-1px, 2px) rotate(-1deg);
    }

    60% {
        transform: translate(-3px, 1px) rotate(0deg);
    }

    70% {
        transform: translate(3px, 1px) rotate(-1deg);
    }

    80% {
        transform: translate(-1px, -1px) rotate(1deg);
    }

    90% {
        transform: translate(1px, 2px) rotate(0deg);
    }

    100% {
        transform: translate(1px, -2px) rotate(-1deg);
    }
}

.success-message {
    color: rgb(70, 255, 70);
}

.err-message {
    color: rgb(255, 70, 70);
}

.loading-input {
    background-color: #D3D3D3; /* equivalent to bg-gray-300 */
    color: #808080; /* equivalent to text-gray-500 */
    cursor: not-allowed;
}
</style>
