import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home-view.vue'
import AccountView from '@/views/account/_type.vue'
import { ROUTE_NAME } from '@/constant/tokens'
import EmptyLayout from '@/layouts/empty-layout.vue'
// import DefaultLayout from '@/layouts/default-layout.vue'
// import AccountLayout from '@/layouts/account-layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTE_NAME.home,
      component: HomeView,
    },
    {
      path: '/account/:type',
      name: ROUTE_NAME.account,
      component: AccountView,
      meta: {
        layout: EmptyLayout,
      },
    },
  ],
})

export default router
