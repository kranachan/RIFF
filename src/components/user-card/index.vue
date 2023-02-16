<script setup lang="ts">
import Button from '@/components/button/index.vue'
import Avatar from '@/components/avatar/index.vue'
</script>

<template>
  <div class="user-card">
    <Avatar source="" />
    <div class="info-box">
      <p class="nickname">[name]</p>
      <p class="sign">[information]</p>
    </div>
    <div class="action-wrapper">
      <Button>Follow</Button>
    </div>
  </div>
</template>

<style scoped>
@import url('./index.css');
</style>
