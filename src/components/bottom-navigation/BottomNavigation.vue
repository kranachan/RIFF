<script setup lang="ts">
import { capitalize, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LucideIconKey } from '@/constants/icon'
import Icon from '@/components/icon/Icon.vue'
import FloatingLand from '@/components/floating-land/FloatingLand.vue'
import Avatar from '@/components/avatar/Avatar.vue'
import { useStore } from '@/store'
import { computed } from '@vue/reactivity'

interface RouteItem {
  key: BottomNavigationRoute
  icon: LucideIconKey
  title: string
  route: string
}

enum BottomNavigationRoute {
  Explore = 'explore',
  Following = 'following',
  Profile = 'profile',
  Auth = 'auth',
}

const { app } = useStore()

const routes = computed<RouteItem[]>(() => [
  {
    key: BottomNavigationRoute.Explore,
    icon: 'Ghost',
    title: 'Explore',
    route: '/explore',
  },
  {
    key: BottomNavigationRoute.Following,
    icon: 'Users',
    title: 'Following',
    route: '/following',
  },
  {
    key: app.state.isLoggedIn
      ? BottomNavigationRoute.Profile
      : BottomNavigationRoute.Auth,
    icon: 'AtSign',
    title: app.state.isLoggedIn
      ? app.state.self?.username ?? '[Unknown]'
      : 'Auth',
    route: app.state.isLoggedIn ? '/profile' : '/auth',
  },
])

const router = useRouter()
const routeName = router.currentRoute.value.name

const initialKey = (() => {
  if (!routeName) {
    return
  }
  const isValidRoute = capitalize(routeName.toString()) in BottomNavigationRoute
  if (!isValidRoute) {
    return
  }
  return routeName as BottomNavigationRoute
})()

const activeKey = ref(initialKey)

const handleClickItem = (item: RouteItem) => {
  activeKey.value = item.key
  router.replace(item.route)
}
</script>

<template>
  <FloatingLand>
    <div class="navigation">
      <template v-for="route in routes" :key="route.key">
        <div
          class="navigation-item"
          :class="activeKey === route.key && 'active'"
          @click="handleClickItem(route)"
        >
          <div class="icon">
            <Avatar
              class="z-10"
              v-if="
                route.key === BottomNavigationRoute.Profile &&
                app.state.isLoggedIn
              "
              :source="app.state.self?.avatar"
              :size="24"
            />
            <Icon v-else :name="route.icon" />
          </div>
          <div class="text">{{ route.title }}</div>
        </div>
      </template>
    </div>
  </FloatingLand>
</template>

<style scoped>
@import url('./BottomNavigation.css');
</style>
