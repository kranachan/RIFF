import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: import.meta.env.VITE_HASH_MODE_ENABLED
    ? createWebHashHistory()
    : createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
