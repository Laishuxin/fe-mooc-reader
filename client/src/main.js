import { createApp } from "vue"
import { merge, mergeWith } from "lodash-es"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

import "./assets/main.css"
import "amfe-flexible"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount("#app")

const a = {
  a: "a",
  getA() {
    return "a"
  },
}

const b = {
  b: "1",
  getA() {
    return "b"
  },
}

const res = merge(a, b)

console.log(res, a)
res.a = "123"
console.log(res, a)
