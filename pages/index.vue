<script setup lang="ts">
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
    <div class="relative max-w-5xl mx-auto pt-16 sm:pt-20 lg:pt-28">
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
                class="w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
                id="url" name="url" type="url" v-model="url" placeholder="Enter your long URL here" required />
            <button class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400
                focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-4 rounded-lg flex
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
html,
body {
    height: 100%;
}

body {
    background: radial-gradient(ellipse at center, #fffffa 0%, #ffffff 35%, #c8dedf 100%);
    overflow: hidden;
}

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
</style>
