<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '../icon/index.vue'

interface NavItem {
  key: string
  icon: string
  title: string
  route: string
}

const router = useRouter()

const list = [
  { key: 'explore', icon: 'Ghost', title: 'Explore', route: '/explore' },
  { key: 'following', icon: 'Users', title: 'Following', route: '/following' },
  { key: 'settings', icon: 'Settings', title: 'Settings', route: '/settings' },
]

const activeKey = ref('explore')

const handleClickItem = (item: NavItem) => {
  activeKey.value = item.key
  router.replace(item.route)
}
</script>

<template>
  <div class="navigation">
    <template v-for="item in list" :key="item.key">
      <div
        class="navigation-item"
        :class="activeKey === item.key && 'active'"
        @click="handleClickItem(item)"
      >
        <div class="icon">
          <Icon :name="item.icon" />
        </div>
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped>
@import url('./index.css');
</style>
