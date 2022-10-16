<template>
  <div class="default-layout">
    <div class="header-wrapper">
      <m-header>
        <template #default>
          <router-link
            :to="{ name: ROUTE_NAME.account, params: { type: 'login' } }"
            class="account-link"
          >
            登录
          </router-link>
        </template>
      </m-header>
    </div>

    <main class="main">
      <slot />
    </main>

    <!-- <footer class="footer"></footer> -->
  </div>
</template>

<script setup>
import { ROUTE_NAME } from '@/constant/tokens'
import MHeader from '@/components/ui/m-header.vue'
</script>

<style lang="scss" scoped>
.header-wrapper {
  padding: 8px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: #fff;
}

.account-link {
  display: block;
  font-size: var(--van-font-size-md);
  color: var(--van-primary-color);
  background: var(--van-secondary-color);
  padding: 8px 16px;
  border-radius: 16px;
}

.main {
  padding-top: 48px;
}
</style>
