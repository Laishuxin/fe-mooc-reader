<template>
  <div>
    app
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>

    <RouterView></RouterView>
  </div>

  <div>
    button:
    <br />
    <van-button type="primary" @click="handleClick"> button </van-button>
  </div>

  <div class="box"></div>
</template>

<script setup>
import { getBooks } from '@api'
import { defaultLogger } from './utils/logger'

const handleClick = () => {
  console.log('ok')
  getBooks().then((res) => {
    console.log('res: ', res)
  })
}

defaultLogger.log('ok')
</script>

<style scoped>
.box {
  display: flex;
}
</style>
