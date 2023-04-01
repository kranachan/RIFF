import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: import.meta.env.VITE_ENABLE_HASH_MODE
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
