import { RouteRecordRaw } from 'vue-router'
import Main from '@/pages/mobile/main/Main.vue'
import Explore from '@/pages/mobile/main/explore/Explore.vue'
import Following from '@/pages/mobile/main/following/Following.vue'
import Profile from '@/pages/mobile/main/profile/Profile.vue'
import Auth from '@/pages/mobile/main/auth/Auth.vue'
import User from '@/pages/mobile/user/User.vue'
import Album from '@/pages/mobile/album/Album.vue'
import Relationship from '@/pages/mobile/relationship/Relationship.vue'

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
    path: '/album/:albumId',
    component: Album,
  },
  {
    path: '/user/:userId/relationship',
    component: Relationship,
  },
]

export { routes }
