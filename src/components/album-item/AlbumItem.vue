<script setup lang="ts">
import { Album } from '@/models'
import Avatar from '../avatar/Avatar.vue'
import ImageProvider from '../image-provider/ImageProvider.vue'
import { Starport } from 'vue-starport'
import Icon from '../icon/Icon.vue'
import { useRouter } from 'vue-router'
import Divider from '../divider/Divider.vue'
import Rough from '@/assets/icons/rough.svg?component'
import { useStore } from '@/store'
import { toRelativeTime } from '@/utils'

const props = defineProps<{
  album: Album
  withBack?: boolean
}>()

const router = useRouter()
const { app, userStore } = useStore()
const author = userStore.getUserById(props.album.authorId)

const onBackClicked = () => {
  router.back()
}
</script>

<template>
  <div class="root">
    <div :class="['header', withBack && 'with-back']">
      <button class="back-action" v-if="withBack">
        <Icon name="ChevronLeft" @click="onBackClicked" />
      </button>
      <Avatar :size="32" :source="author?.avatar" />
      <section class="info">
        <b class="name">{{ author?.name ?? '[Unknown]' }}</b>
        <span class="date"
          >Posted album {{ toRelativeTime(album.createdAt) }} ago</span
        >
      </section>
      <button class="menu-action">
        <Icon name="MoreVertical" :size="16" />
      </button>
    </div>
    <div class="image-with-action">
      <Starport class="image-wrapper" :port="album.id" :duration="500">
        <ImageProvider ripple :url="album.content.image?.url" />
      </Starport>
      <button
        class="like-action"
        v-motion
        :initial="{ scale: 0 }"
        :enter="{ scale: 1, transition: { delay: 500 } }"
        :tapped="{ scale: 0.9 }"
      >
        <Icon class="like-action-icon" name="Heart" :size="32" />
      </button>
    </div>
    <p class="plain">{{ album.content.plain ?? '[Untitled]' }}</p>
    <div class="actions">
      <button><Icon name="MessageCircle" /> {{ album.commentCount }}</button>
      <button><Icon name="Bookmark" /></button>
      <button class="forward-action">
        <Rough class="forward-action-rough" />
        <Icon name="Forward" />
        <span
          :class="[
            'forward-action-text',
            app.getters.isDarkScheme && 'with-stroke',
          ]"
          >Share</span
        >
      </button>
    </div>
    <Divider />
  </div>
</template>

<style scoped>
@import url('./AlbumItem.css');
</style>
