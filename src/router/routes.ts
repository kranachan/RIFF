import { RouteRecordRaw } from 'vue-router'
import Main from '@/pages/main/index.vue'
import Explore from '@/pages/main/explore/index.vue'
import Following from '@/pages/main/following/index.vue'
import Settings from '@/pages/main/settings/index.vue'
import User from '@/pages/user/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Main,
    redirect: 'explore',
    children: [
      {
        name: 'explore',
        path: '/explore',
        component: Explore,
      },
      {
        name: 'following',
        path: '/following',
        component: Following,
      },
      {
        name: 'settings',
        path: '/settings',
        component: Settings,
      },
    ],
  },
  {
    path: '/user/:userId',
    component: User,
  },
]

export { routes }
