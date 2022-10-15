import { merge } from 'lodash-es'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './app.vue'
import router from './router'

// vant

// Toast
import { Toast, Notify, Dialog } from 'vant'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
// import 'vant/es/image-preview/style'

import 'amfe-flexible'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, Notify, Dialog)

app.mount('#app')

const a = {
  a: 'a',
  getA() {
    return 'a'
  },
}

const b = {
  b: '1',
  getA() {
    return 'b'
  },
}

const res = merge(a, b)

console.log(res, a)
res.a = '123'
console.log(res, a)
