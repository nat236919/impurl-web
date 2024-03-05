<template>
    <div>
        <h1>Home Page</h1>
    </div>
</template>

<script setup>
console.log("Loading runtimeConfig in index.vue")
const runtimeConfig = useRuntimeConfig()
console.log(runtimeConfig)
</script>

<script>
</script>

<style>
</style>
