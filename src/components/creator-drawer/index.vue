<script setup lang="ts">
import Drawer from '@/components/drawer/index.vue'
import Divider from '@/components/divider/index.vue'
import Icon from '@/components/icon/index.vue'
import Button from '@/components/button/index.vue'
import Tabbar from '@/components/tabbar/index.vue'
import StickyTips from '@/components/sticky-tips/index.vue'
import { ref } from 'vue'

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

const textareaRef = ref<HTMLTextAreaElement>()
const textareaWrapperHeight = ref<string>('auto')
const plain = ref<string>()

const onTextareaWrapperInput = (e: Event) => {
  plain.value = (e.target as HTMLDivElement).textContent ?? String()
}
</script>

<template>
  <Drawer title="Create" withOverlay :open="true">
    <div class="creator">
      <div class="creator-header">
        <div class="avatar"></div>
        <div
          class="textarea"
          contenteditable
          @input="(e) => onTextareaWrapperInput(e)"
          :style="{ height: textareaWrapperHeight }"
        >
          <textarea
            ref="textareaRef"
            class="textarea-form"
            placeholder="What’s happening? …"
            v-model="plain"
          />
        </div>
      </div>
      <Divider />
      <div class="creator-body">
        <StickyTips>
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
        <Button btnType="disabled">Publish</Button>
      </div>
    </div>
  </Drawer>
</template>

<style scoped>
@import url('./index.css');
</style>
