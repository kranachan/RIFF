<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import Drawer from '@/components/drawer/Drawer.vue'
import Divider from '@/components/divider/Divider.vue'
import Icon from '@/components/icon/Icon.vue'
import Button from '@/components/button/Button.vue'
import StickyTips from '@/components/sticky-tips/StickyTips.vue'
import { useStore } from '@/store'
import { AlbumApi } from '@/api/album'
import { getLocalStorage } from '@/utils'

const IMAGE_LIMIT_COUNT = 20

const { app } = useStore()

const fileInputRef = ref()

const state = reactive<{
  plain: string
  isFocus: boolean
  images: { preview: string; file: File }[]
}>({
  plain: '',
  isFocus: false,
  images: [],
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

const onUpload = () => {
  fileInputRef.value?.click()
}

const onFileChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  const uploadableCount = IMAGE_LIMIT_COUNT - state.images.length

  if (files && files.length) {
    const len = files.length > uploadableCount ? uploadableCount : files.length

    for (let i = 0; i < len; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onload = function () {
        if (typeof this.result === 'string') {
          state.images.push({
            preview: this.result,
            file,
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }
}

const handleDeleteImage = (index: number) => {
  state.images.splice(index, 1)
}

const handleUpload = async () => {
  const token = await getLocalStorage('token')

  if (!token) {
    return
  }

  const formData = new FormData()
  for (let i = 0; i < state.images.length; i++) {
    formData.append('file', state.images[i].file)
  }
  try {
    const result = await AlbumApi.upload(token, formData)
    return result
  } catch (e) {
    console.warn(e)
  }
}

const handlePublish = async () => {
  const token = await getLocalStorage('token')
  const authorId = app.isLoggedIn && app.self?.id
  const uploadResult = await handleUpload()

  if (!token || !authorId || !uploadResult?.length) {
    return
  }

  const content = {
    image: uploadResult.join(','),
    plain: state.plain,
  }
  try {
    await AlbumApi.create(token, authorId, content)
    handleClose()
  } catch (e) {
    console.warn(e)
  }
}

const handleClose = () => {
  app.isShowCreator = false

  state.plain = ''
  state.images = []
}

const allowedPublish = computed(() => state.images.length && state.plain)
</script>

<template>
  <Drawer
    title="Create"
    withOverlay
    :open="app.isShowCreator"
    @close="handleClose"
  >
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
        <div class="image-list">
          <template v-if="state.images.length < IMAGE_LIMIT_COUNT">
            <StickyTips title="add-photo" icon="PlusSquare">
              <div class="upload" @click="onUpload">
                <div class="upload-wrapper">
                  <div class="icon">
                    <Icon name="Sticker" />
                  </div>
                </div>
              </div>
            </StickyTips>
          </template>
          <template v-for="(item, index) in state.images" :key="index">
            <div class="image">
              <div class="image-wrapper">
                <img :src="item.preview" />
              </div>
              <div class="delete" @click="handleDeleteImage(index)">
                <Icon name="X" :size="14" />
              </div>
            </div>
          </template>
        </div>
        <input
          ref="fileInputRef"
          class="file-input"
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          multiple
          @change="onFileChange"
        />
      </div>
      <div class="creator-footer">
        <Button
          class="publish"
          :disabled="!allowedPublish"
          @click="handlePublish"
        >
          Publish
        </Button>
      </div>
    </div>
  </Drawer>
</template>

<style scoped>
@import url('./CreatorDrawer.css');
</style>
