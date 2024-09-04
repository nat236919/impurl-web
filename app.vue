<script setup lang="ts">
import { ref } from "vue";

const title = ref("impURL - Shorten your URLs");
const description = ref("Where magic makes links shorter and sweeter");

useHead({
  title: title.value,
  meta: [
    {
      name: "ImpURL",
      content: description.value
    }
  ],
});

useSeoMeta({
  title: title.value,
  description: description.value,
  image: "/img/imp-logo.png",
  url: "",
  type: "website",
  site_name: "impURL",
  locale: "en_US",
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
html,
body {
  height: 100%;
  overflow-y: auto;
}

body {
  background: radial-gradient(ellipse at center, #fffffa 0%, #ffffff 35%, #c8dedf 100%);
  overflow-x: hidden;
  font-family: Helvetica, Arial, sans-serif;
}
</style>