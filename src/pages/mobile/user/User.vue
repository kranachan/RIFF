<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import Tabbar from '@/components/tabbar/Tabbar.vue'
import Button from '@/components/button/Button.vue'
import Icon from '@/components/icon/Icon.vue'
import PageLayout from '@/components/page-layout/PageLayout.vue'
import { useGoBack } from '@/hooks'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import Avatar from '@/components/avatar/Avatar.vue'

const infoAnchorRef = ref<HTMLDivElement>()
const isInfoAnchorVisible = useElementVisibility(infoAnchorRef)

const route = useRoute()
const { userStore } = useStore()
const userId = route.params.userId as string
const user = computed(() => userStore.getUserById(userId))

onMounted(async () => {
  if (!user.value) {
    await userStore.fetchUserById(userId)
  }
})

const onBackClicked = useGoBack()

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
  <PageLayout class="user">
    <div class="header" :class="isInfoAnchorVisible && 'is-info-in-view'">
      <button class="header-action" @click="onBackClicked">
        <Icon name="ChevronLeft" />
      </button>
      <div class="header-info">
        <Avatar :size="32" />
        <section class="header-info-profile">
          <div class="header-info-name">{{ user?.name }}</div>
          <div class="header-info-bio">{{ user?.bio }}</div>
        </section>
      </div>
      <button class="header-action ml-auto">
        <Icon name="MoreVertical" />
      </button>
    </div>

    <div class="user-cover">
      <img v-if="user?.banner" :src="user.banner" alt="banner" />
    </div>

    <div class="user-profile">
      <div class="head">
        <Avatar :source="user?.avatar" :size="64" class="avatar" />
        <div class="stats">
          <div class="stat">
            <span class="stat-label">Following</span>
            <span class="stat-count">{{ user?.followingCount ?? 0 }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Follower</span>
            <span class="stat-count">{{ user?.followerCount ?? 0 }}</span>
          </div>
        </div>
        <Button>Follow</Button>
      </div>
      <div ref="infoAnchorRef" />
      <div class="nickname">{{ user?.name }}</div>
      <div class="bio" v-if="user?.bio">{{ user.bio }}</div>
    </div>
    <div class="tabbar-area" :class="!isInfoAnchorVisible && 'is-sticky'">
      <Tabbar :list="list" :active-key="1" />
    </div>
    <div class="timeline-area"></div>
  </PageLayout>
</template>

<style scoped>
@import url('./User.css');
</style>
