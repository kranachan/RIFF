<script setup lang="ts">
import { capitalize, ref, watch } from 'vue'
import { RouteRecordName, useRouter } from 'vue-router'
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
const routeName = computed(() => router.currentRoute.value.name)

const validateRoute = (routeName?: RouteRecordName | null): boolean => {
  if (!routeName) {
    return false
  }
  if (!(capitalize(routeName.toString()) in BottomNavigationRoute)) {
    return false
  }
  return true
}

const initialKey = (() => {
  if (validateRoute(routeName.value)) {
    return routeName.value as BottomNavigationRoute
  }
})()

const activeKey = ref<BottomNavigationRoute | undefined>(initialKey)

watch(routeName, (newRoute) => {
  if (validateRoute(newRoute)) {
    activeKey.value = routeName.value as BottomNavigationRoute
  }
})

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
