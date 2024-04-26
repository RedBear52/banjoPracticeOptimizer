<template>
  <nav class="nav-container">
    <ul class="nav">
      <li>
        <router-link class="router-link" active-class="active" to="/"
          >Home</router-link
        >
      </li>
      <li>
        <router-link class="router-link" active-class="active" to="/add-goals"
          >Add Goals</router-link
        >
      </li>
      <li>
        <router-link class="router-link" active-class="active" to="/goal-keeper"
          >Goal Keeper</router-link
        >
      </li>

      <li>
        <router-link
          class="router-link"
          active-class="active"
          to="/add-practice-item"
          >Add Practice Item</router-link
        >
      </li>
      <li>
        <router-link
          class="router-link"
          active-class="active"
          to="/practice-regimen"
          >Practice Regimen</router-link
        >
      </li>
      <li>
        <router-link
          class="router-link"
          active-class="active"
          to="/practice-regimen"
          >Practice Regimen</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
import 'primeicons/primeicons.css'
</script>

<style>
</style>