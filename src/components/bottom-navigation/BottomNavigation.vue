<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { LucideIconKey } from '@/constants/icon'
import Icon from '@/components/icon/Icon.vue'
import FloatingLand from '@/components/floating-land/FloatingLand.vue'
import Avatar from '@/components/avatar/Avatar.vue'
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'

interface RouteItem {
  key: BottomNavigationRoute
  icon: LucideIconKey
  title: string
  route: string
}

enum BottomNavigationRoute {
  Explore,
  Following,
  Profile,
}

const { app } = useStore()
const { self, isLoggedIn } = storeToRefs(app)

const routes: RouteItem[] = [
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
    key: BottomNavigationRoute.Profile,
    icon: 'AtSign',
    title: isLoggedIn.value ? self.value?.username ?? '[Unknown User]' : 'Auth',
    route: isLoggedIn.value ? '/profile' : '/auth',
  },
]

const router = useRouter()
const activeKey = ref(BottomNavigationRoute.Explore)

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
              v-if="route.key === BottomNavigationRoute.Profile && isLoggedIn"
              :source="self?.avatar"
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