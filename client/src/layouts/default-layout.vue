<template>
  <div class="default-layout">
    <div class="header-wrapper">
      <m-header>
        <template #default>
          <div v-if="hasLogin" class="avatar">
            {{ firstChar }}
          </div>

          <router-link
            v-else
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
import { useAccountStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const store = useAccountStore()
const { hasLogin, user } = storeToRefs(store)

const firstChar = computed(() => {
  if (user.value == null) return ''
  const nickname = user.value.nickname
  // 获取首字符并大写
  return `${nickname.substring(0, 1).toUpperCase()}`
})
</script>

<style lang="scss" scoped>
.header-wrapper {
  padding: 8px 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: #fff;
  z-index: 10;
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

.avatar {
  $size: 28px;
  width: $size;
  height: $size;
  background: var(--van-primary-color);
  color: #fff;
  border-radius: 999px;
  line-height: $size;
  text-align: center;
}
</style>
