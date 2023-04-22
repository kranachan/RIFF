import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueLazyload from 'vue-lazyload'
import router from '@/router'
import { MotionPlugin } from '@vueuse/motion'
import { GesturePlugin } from '@vueuse/gesture'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import VWave from 'v-wave'
import { plugin as VueTippy, TippyOptions } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import '@/App.css'
import App from '@/App.vue'
import { RouteTransition } from './constants'

const app = createApp(App)
const pinia = createPinia()

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  if (to.meta.transition) {
    return
  }
  to.meta.transition =
    toDepth < fromDepth ? RouteTransition.SlideLeft : RouteTransition.SlideRight
})

app.use(pinia)
app.use(router)
app.use(VueLazyload)
app.use<{ defaultProps: TippyOptions }>(VueTippy, {
  defaultProps: { animation: 'scale' },
})
app.use(MotionPlugin)
app.use(GesturePlugin)
app.use(autoAnimatePlugin)
app.use(VWave, {})
app.mount('#app')
