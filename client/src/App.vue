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
    <van-button type="primary" @click="handleLoading">loading</van-button>
  </div>

  <div class="box"></div>
</template>

<script setup>
import { getBooks } from '@api'
import { Toast } from 'vant'
import { defaultLogger } from './utils/logger'

const handleClick = () => {
  console.log('ok')
  getBooks().then((res) => {
    console.log('res: ', res)
  })
}

let instance = null
const handleLoading = () => {
  if (instance != null) {
    instance.clear()
    instance = null
  } else {
    instance = Toast({
      type: 'loading',
      duration: 30 * 1000,
      forbidClick: true,
    })
  }
}

defaultLogger.log('ok')
</script>

<style scoped>
.box {
  display: flex;
}
</style>
