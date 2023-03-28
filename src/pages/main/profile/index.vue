<script setup lang="ts">
import Button from '@/components/button/index.vue'
import Divider from '@/components/divider/index.vue'
import Icon from '@/components/icon/index.vue'
import PhotoCard from '@/components/photo-card/index.vue'
import HorizontalList from '@/components/horizontal-list/index.vue'
import Avatar from '@/components/avatar/index.vue'
</script>

<template>
  <div class="settings">
    <div class="fixed-top">
      <div class="profile">
        <div class="profile-inner">
          <Avatar source="" :size="48" />
          <div class="nickname">[name]</div>
          <Button variant="outline" class="edit">Edit Profile</Button>
        </div>
        <div class="profile-mask" />
      </div>

      <div class="stats">
        <div class="stat">
          <span class="label">Photos</span>
          <span class="count">346</span>
        </div>
        <div class="divider" />
        <div class="stat">
          <span class="label">Albums</span>
          <span class="count">24</span>
        </div>
        <div class="divider" />
        <div class="stat">
          <span class="label">Following</span>
          <span class="count">121</span>
        </div>
        <div class="divider" />
        <div class="stat">
          <span class="label">Follower</span>
          <span class="count">3.4k</span>
        </div>
      </div>

      <Divider />
    </div>

    <div class="main">
      <div class="box">
        <div class="header">
          <div class="title">
            <div class="icon"><Icon name="Heart" /></div>
            <p class="text">Liked</p>
          </div>
          <div class="link">
            <Icon name="ChevronRight" />
          </div>
        </div>
        <div class="body">
          <HorizontalList>
            <template v-for="item in 10">
              <div class="card-wrapper"><PhotoCard /></div>
            </template>
          </HorizontalList>
        </div>
      </div>

      <div class="box">
        <div class="header">
          <div class="title">
            <div class="icon"><Icon name="History" /></div>
            <p class="text">History</p>
          </div>
          <div class="link">
            <Icon name="ChevronRight" />
          </div>
        </div>
        <div class="body">
          <HorizontalList>
            <template v-for="item in 10">
              <div class="card-wrapper"><PhotoCard /></div>
            </template>
          </HorizontalList>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('./index.css');
</style>
