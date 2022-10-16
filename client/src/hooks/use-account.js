import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ROUTE_NAME } from '@/constant/tokens'

export const useAccount = () => {
  const route = useRoute()

  // 是否在登录页面
  const isLogin = computed(() => {
    return route.name == ROUTE_NAME.account && route.params.type == 'login'
  })

  const isRegister = computed(() => {
    return route.name == ROUTE_NAME.account && route.params.type == 'register'
  })

  return {
    isLogin,
    isRegister,
  }
}
