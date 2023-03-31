<script setup lang="ts">
import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import Tabbar from '@/components/tabbar/Tabbar.vue'
import Button from '@/components/button/Button.vue'
import Icon from '@/components/icon/Icon.vue'

const anchorRef = ref<HTMLDivElement>()

const anchorVisible = useElementVisibility(anchorRef)

const list = [
  {
    key: 1,
    label: 'ALL',
  },
  {
    key: 2,
    label: 'Albums',
  },
  {
    key: 3,
    label: 'Portrait',
  },
  {
    key: 4,
    label: 'Illustration',
  },
  {
    key: 5,
    label: 'Illustration',
  },
]
</script>

<template>
  <div class="user">
    <div class="header" :class="anchorVisible && 'transparent'">
      <button class="button"><Icon name="ChevronLeft" /></button>
      <div class="info">
        <div class="info-wrapper">
          <div class="info-avatar"></div>
          <div class="info-right">
            <div class="info-nickname">[name]</div>
            <div class="info-datetime">[information]</div>
          </div>
        </div>
      </div>
      <button class="button"><Icon name="MoreVertical" /></button>
    </div>

    <div class="user-cover">
      <img v-lazy="" alt="banner" />
    </div>

    <div class="user-profile">
      <div class="head">
        <div class="avatar"></div>
        <div class="stats">
          <div class="stat">
            <span class="stat-label">Following</span>
            <span class="stat-count">122</span>
          </div>
          <div class="stat">
            <span class="stat-label">Follower</span>
            <span class="stat-count">3.4k</span>
          </div>
        </div>
        <Button>Follow</Button>
      </div>
      <div class="nickname">[name]</div>
      <div class="sign">[information]</div>
    </div>

    <div class="tabbar-area">
      <div class="tarbar" :class="!anchorVisible && 'is-fixed'">
        <Tabbar :list="list" :active-key="1" />
      </div>
      <div class="anchor" ref="anchorRef" />
    </div>
    <div class="list-area"></div>
  </div>
</template>

<style scoped>
@import url('./User.css');
</style>
