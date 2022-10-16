import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/account'
import { STORES } from '@/constant/tokens'

export const useAccountStore = defineStore(STORES.account, {
  state: () => {
    const user = ref(null)
    const hasLogin = computed(() => user.value != null)

    return { user, hasLogin }
  },
  actions: {
    async getUserInfo() {
      const userInfo = await getUserInfo()
      this.user = userInfo
    },
  },
})
