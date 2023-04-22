<script setup lang="ts">
import { RouterView } from 'vue-router'
import BottomNavigation from '@/components/bottom-navigation/BottomNavigation.vue'
import PageLayout from '@/components/page-layout/PageLayout.vue'
</script>

<template>
  <PageLayout>
    <RouterView />
    <BottomNavigation />
  </PageLayout>
</template>
