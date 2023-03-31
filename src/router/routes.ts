import { RouteRecordRaw } from 'vue-router'
import Main from '@/pages/main/index.vue'
import Explore from '@/pages/main/explore/index.vue'
import Following from '@/pages/main/following/index.vue'
import Profile from '@/pages/main/profile/index.vue'
import Auth from '@/pages/main/auth/index.vue'
import User from '@/pages/user/index.vue'
import Relationship from '@/pages/relationship/index.vue'

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
        name: 'profile',
        path: '/profile',
        component: Profile,
      },
      {
        name: 'auth',
        path: '/auth',
        component: Auth,
      },
    ],
  },
  {
    path: '/user/:userId',
    component: User,
  },
  {
    path: '/user/:userId/relationship',
    component: Relationship,
  },
]

export { routes }
