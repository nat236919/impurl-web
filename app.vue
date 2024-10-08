<script setup lang="ts">
import { ref } from "vue";

// Constants for static strings
const SITE_NAME = "impURL";
const TITLE = "impURL - Shorten your URLs";
const DESCRIPTION = "Where magic makes links shorter and sweeter";
const IMAGE_URL = "/img/imp-logo.png";
const LOCALE = "en_US";
const TYPE = "website";

useHead({
  title: TITLE,
  meta: [
    {
      name: SITE_NAME,
      content: DESCRIPTION,
    }
  ],
});

useSeoMeta({
  title: TITLE,
  description: DESCRIPTION,
  image: IMAGE_URL,
  url: "", // Consider dynamically setting this if possible
  type: TYPE,
  site_name: SITE_NAME,
  locale: LOCALE,
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