<script setup lang="ts">
import { reactive } from 'vue'
import Icon from '@/components/icon/Icon.vue'
import Tabbar from '@/components/tabbar/Tabbar.vue'
import Divider from '@/components/divider/Divider.vue'
import UserCard from '@/components/user-card/UserCard.vue'

const list = [
  {
    key: 1,
    label: 'Following',
  },
  {
    key: 2,
    label: 'Follower',
  },
]

const state = reactive<{
  activeKey: number
}>({
  activeKey: 1,
})

const onTabbarChange = (key: number) => {
  state.activeKey = key
}
</script>

<template>
  <div class="relationship">
    <div class="header">
      <div class="navigation">
        <div class="back"><Icon name="ChevronLeft" /></div>
        <span class="title">Relationship</span>
      </div>
      <Divider />
      <div class="tabbar-wrapper">
        <Tabbar
          :list="list"
          :active-key="state.activeKey"
          @change="onTabbarChange"
        />
      </div>
    </div>

    <div class="main">
      <div class="list-wrapper" v-show="state.activeKey === 1">
        <UserCard />
      </div>
      <div class="list-wrapper" v-show="state.activeKey === 2">
        <UserCard />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('./Relationship.css');
</style>
