<script setup lang="ts">
import { reactive } from 'vue'
import BottomSheet from '@/components/bottom-sheet/BottomSheet.vue'
import Divider from '@/components/divider/Divider.vue'
import Icon from '@/components/icon/Icon.vue'
import Button from '@/components/button/Button.vue'
import Tabbar from '@/components/tabbar/Tabbar.vue'
import StickyTips from '@/components/sticky-tips/StickyTips.vue'

const list = [
  {
    key: 1,
    label: 'Photo',
  },
  {
    key: 2,
    label: 'Album',
  },
]

const state = reactive<{
  plain: string
  isFocus: boolean
}>({
  plain: '',
  isFocus: false,
})

const onTextareaWrapperInput = (e: Event) => {
  state.plain = (e.target as HTMLDivElement).textContent ?? String()
}

const onTextareaFocus = () => {
  state.isFocus = true
}

const onTextareaBlur = () => {
  state.isFocus = false
}
</script>

<template>
  <BottomSheet title="Create" withOverlay :open="true">
    <div class="creator">
      <div class="creator-header">
        <div class="avatar"></div>
        <div
          class="textarea-wrapper"
          contenteditable
          @input="(e: Event) => onTextareaWrapperInput(e)"
          @focus="onTextareaFocus"
          @blur="onTextareaBlur"
        >
          <textarea class="textarea" v-model="state.plain" />
          <span class="placeholder" v-if="!state.isFocus && !state.plain">
            What’s happening? …
          </span>
        </div>
      </div>
      <Divider />
      <div class="creator-body">
        <StickyTips title="add-photo" icon="PlusSquare">
          <div class="upload">
            <div class="icon">
              <Icon name="Sticker" />
            </div>
          </div>
        </StickyTips>
      </div>
      <div class="creator-footer">
        <div class="tabbar-wrapper">
          <Tabbar :list="list" :activeKey="1" />
        </div>
        <Button>Publish</Button>
      </div>
    </div>
  </BottomSheet>
</template>

<style scoped>
@import url('./Composer.css');
</style>
