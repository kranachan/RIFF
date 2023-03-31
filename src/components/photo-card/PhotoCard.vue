<script setup lang="ts">
import Avatar from '@/components/avatar/Avatar.vue'
</script>

<template>
  <div class="photo-card">
    <img class="cover" />
    <div class="info">
      <Avatar source="" :size="24" />
      <div class="nickname">[name]</div>
    </div>
  </div>
</template>

<style scoped>
@import url('./PhotoCard.css');
</style>
