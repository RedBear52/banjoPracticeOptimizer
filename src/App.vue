<template>
  <!-- <main> -->
  <Header />
  <!-- <NavBar /> -->
  <RouterView />
  <!-- </main> -->
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './views/Header.vue'
// import NavBar from './views/NavBar.vue'
</script>