<script setup lang="ts">
import { User } from '@/models'
import Button from '../button/Button.vue'

const props = defineProps<{
  user: User
  isSelf?: boolean
}>()

const btnVariant: 'outlined' | undefined = props.user.following
  ? 'outlined'
  : undefined
const displayedText = props.user.following ? 'Followed' : 'Follow'

const onClicked = () => {}
</script>

<template>
  <Button v-if="!isSelf" :variant="btnVariant" @click="onClicked">
    {{ displayedText }}
  </Button>
</template>
