<script setup lang="ts">
import Icon from '@/components/icon/index.vue'
import Logo from '@/assets/branding/logo.svg?component'
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
</template>

<style scoped>
@import url('./index.css');
</style>
