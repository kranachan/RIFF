import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueLazyload from 'vue-lazyload'
import router from '@/router'
import { MotionPlugin } from '@vueuse/motion'
import { plugin as VueTippy, TippyOptions } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import '@/App.css'
import App from '@/App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueLazyload)
app.use<{ defaultProps: TippyOptions }>(VueTippy, {
  defaultProps: { animation: 'scale' },
})
app.use(MotionPlugin)
app.mount('#app')
