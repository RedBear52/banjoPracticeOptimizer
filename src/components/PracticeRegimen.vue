<template>
  <div class="component-container">
    <h2>Practice Regimen</h2>
    <ul class="practice-list" id="practice-list">
      <h3>Current Practice Items</h3>
      <li v-for="item in practiceItems" :key="item.id">
        <span> {{ item.practiceItem }}</span>
        <span> {{ item.minutes }} minutes</span>
        <button class="delete-btn" @click="deletePracticeItem(item.id)">
          <div class="x">x</div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const emit = defineEmits(['deletePracticeItem'])

const props = defineProps({
  practiceItems: Array,
  required: true
})

const deletePracticeItem = (id) => {
  emit('deletePracticeItem', id)
}
</script>
