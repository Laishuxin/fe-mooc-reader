<template>
  <!-- <account-layout>
    <router-view />
  </account-layout> -->

  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/default-layout.vue'

const route = useRoute()
const layout = computed(() => {
  return route.meta.layout != null ? route.meta.layout : DefaultLayout
})
</script>

<style scoped>
.box {
  display: flex;
}
</style>
