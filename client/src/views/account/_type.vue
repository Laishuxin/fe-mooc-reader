<template>
  <div class="container">
    <div class="logo">
      <router-link to="/">
        <img src="/logo2.png" alt="logo" />
      </router-link>
    </div>

    <div class="wrapper">
      <van-form class="account-form" @submit="handleSubmit">
        <van-cell-group inset>
          <van-field
            v-model="form.username"
            name="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="form.password"
            type="password"
            name="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div class="submit-btn-wrapper">
          <van-button round block type="primary" native-type="submit">
            {{ btnText }}
          </van-button>
        </div>
      </van-form>

      <div class="location">
        <router-link :to="to" class="location__link">
          {{ text }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { login, register } from '@api/account'
import { JWT_TOKEN, ROUTE_NAME } from '@/constant/tokens'
import { useRoute, useRouter } from 'vue-router'
import { defaultStorage } from '@/utils/storage'
import { normalizeJwtToken } from '@/utils'
import { useAccountStore } from '@stores'

const form = reactive({
  username: '',
  password: '',
})

const route = useRoute()
const router = useRouter()
// 是否在登录页面
const isLogin = computed(() => {
  return route.params.type != 'register'
})

const btnText = computed(() => {
  return isLogin.value ? '登录' : '注册'
})
const text = computed(() => {
  return isLogin.value ? '前往注册' : '前往登录'
})

const to = computed(() => {
  const res = {
    name: ROUTE_NAME.account,
    params: { type: 'register' },
  }

  if (isLogin.value == false) {
    res.params.type = 'login'
  }

  return res
})

const accountStore = useAccountStore()

const _setToken = (token) => {
  token = normalizeJwtToken(token)
  defaultStorage.setItem(JWT_TOKEN, token)
}

const _redirect = () => {
  const redirectUrl = route.query.redirect_url
  if (redirectUrl != null) {
    router.replace({ path: redirectUrl })
  } else {
    router.replace({ name: ROUTE_NAME.home })
  }
}

const handleSubmit = async () => {
  const fetcher = isLogin.value ? login : register
  const res = await fetcher(form, {
    loading: true,
    showMessageWhenError: true,
    catchException: true,
    errorMessageConfig: {
      containerType: 'Toast',
    },
  })
  if (res == null) return

  _setToken(res.access_token)
  await accountStore.getUserInfo()
  _redirect()
}
</script>

<style lang="scss" scoped>
.container {
  background: url('@images/bg.png') no-repeat;
  height: 100vh;

  .wrapper {
    padding: 160px 16px 64px;
  }

  .logo {
    position: absolute;
    left: 50%;
    top: 48px;
    transform: translateX(-50%);
  }
}

.location {
  margin-top: 8px;
  text-align: center;

  &__link {
    color: var(--van-primary-color);
  }
}

.submit-btn-wrapper {
  margin: 16px;
}
</style>
