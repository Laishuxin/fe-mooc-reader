<template>
  <div class="default-layout">
    <div class="header-wrapper">
      <van-row
        class="header"
        tag="header"
        justify="space-between"
        align="center"
      >
        <van-col class="header__left">
          <a href="/">
            <img class="logo" :src="logo" alt="logo" />
          </a>
        </van-col>

        <van-col class="header__right">
          <router-link to="/login" class="login-btn"> 登录 </router-link>
        </van-col>
      </van-row>
    </div>

    <main class="main">
      <slot />
    </main>

    <!-- <footer class="footer"></footer> -->
  </div>
</template>

<script setup>
import logo from '@/assets/logo.png'
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

.header {
  display: flex;
  align-items: center;
  width: 100%;

  &__left {
    .logo {
      width: 80px;
    }
  }

  &__right {
    .login-btn {
      display: block;
      font-size: var(--van-font-size-md);
      color: var(--van-primary-color);
      background: var(--van-secondary-color);
      padding: 8px 16px;
      border-radius: 16px;
    }
  }
}

.main {
  padding-top: 48px;
}
</style>
