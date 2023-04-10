<script setup lang="ts">
import Icon from '@/components/icon/Icon.vue'
import Logo from '@/assets/branding/logo.svg?component'
import CreatorDrawer from '@/components/creator-drawer/CreatorDrawer.vue'
</script>

<template>
  <div class="header">
    <div class="header-fixed">
      <button class="header-button"><Icon name="Menu" /></button>
      <div class="header-logo">
        <Logo />
      </div>
      <div class="header-right">
        <button class="header-button">
          <Icon name="Bell" /><span class="tips">2</span>
        </button>
        <button class="header-button"><Icon name="Search" /></button>
      </div>
    </div>
  </div>
  <CreatorDrawer />
</template>

<style scoped>
@import url('./Explore.css');
</style>
