<template>
  <!-- <main> -->
  <Header class="header" />
  <RouterView />
  <!-- </main> -->
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './views/Header.vue'
</script>

<style>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>