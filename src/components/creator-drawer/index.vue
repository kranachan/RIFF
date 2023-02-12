<script setup lang="ts">
import { reactive } from 'vue'
import Drawer from '@/components/drawer/index.vue'
import Divider from '@/components/divider/index.vue'
import Icon from '@/components/icon/index.vue'
import Button from '@/components/button/index.vue'
import Tabbar from '@/components/tabbar/index.vue'
import StickyTips from '@/components/sticky-tips/index.vue'

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
  <Drawer title="Create" withOverlay :open="true">
    <div class="creator">
      <div class="creator-header">
        <div class="avatar"></div>
        <div
          class="textarea-wrapper"
          contenteditable
          @input="(e) => onTextareaWrapperInput(e)"
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
        <Button variant="disabled">Publish</Button>
      </div>
    </div>
  </Drawer>
</template>

<style scoped>
@import url('./index.css');
</style>
