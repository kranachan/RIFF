import { RouteRecordRaw } from 'vue-router'
import Main from '@/pages/main/Main.vue'
import Explore from '@/pages/main/explore/Explore.vue'
import Following from '@/pages/main/following/Following.vue'
import Profile from '@/pages/main/profile/Profile.vue'
import Auth from '@/pages/main/auth/Auth.vue'
import User from '@/pages/user/User.vue'
import Relationship from '@/pages/relationship/Relationship.vue'

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
