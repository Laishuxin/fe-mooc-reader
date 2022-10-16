<template>
  <van-row class="header" tag="header" justify="space-between" align="center">
    <van-col class="header__left">
      <logo />
    </van-col>

    <van-col class="header__right">
      <slot />
    </van-col>
  </van-row>
</template>

<script setup>
import Logo from './logo.vue'
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  width: 100%;

  &__right {
    .account-link {
      display: block;
      font-size: var(--van-font-size-md);
    }
  }
}
</style>
