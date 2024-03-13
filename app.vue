<script setup lang="ts">
useHead({
  title: "impURL - Shorten your URLs",
  meta: [
    {
      name: "ImpURL",
      content: "Where magic makes links shorter and sweeter"
    }
  ],
});

useSeoMeta({
  title: "impURL - Shorten your URLs",
  description: "Where magic makes links shorter and sweeter",
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
}

body {
  background: radial-gradient(ellipse at center, #fffffa 0%, #ffffff 35%, #c8dedf 100%);
  overflow: hidden;
  font-family: cursive !important;
}
</style>