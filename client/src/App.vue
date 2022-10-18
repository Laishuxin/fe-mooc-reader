<template>
  <!-- <account-layout>
    <router-view />
  </account-layout> -->

  <component :is="layout">
    <router-view v-slot="{ Component, route }">
      <transition
        :name="route.meta.transition || 'van-fade'"
        :mode="route.meta.mode"
        :duration="route.meta.duration"
      >
        <keep-alive :include="include">
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </transition>
    </router-view>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DefaultLayout from './layouts/default-layout.vue'

const route = useRoute()
const router = useRouter()

const include = computed(() =>
  router
    .getRoutes()
    .filter((item) => item.meta.keepAlive)
    .map((item) => item.name),
)
const layout = computed(() => {
  return route.meta.layout != null ? route.meta.layout : DefaultLayout
})
</script>

<style scoped>
.box {
  display: flex;
}
</style>
