<script setup lang="ts">
import Button from '@/components/button/Button.vue'
import Avatar from '@/components/avatar/Avatar.vue'
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
@import url('./UserCard.css');
</style>
