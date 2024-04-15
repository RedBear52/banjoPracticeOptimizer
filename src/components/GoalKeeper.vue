<template>
  <div class="component-container">
    <h2>Goal Keeper</h2>
    <ul class="goal-list" id="goal-list">
      <h3>Current Goals</h3>
      <li v-for="goal in goals" :key="goal.id">
        <span> {{ goal.declaration }}</span
        ><button class="delete-btn" @click="deleteGoal(goal.id)"><div class="x">x</div></button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const emit = defineEmits(['deleteGoal'])

const props = defineProps({
  goals: Array,
  required: true
})

const deleteGoal = (id) => {
  emit('deleteGoal', id)
}
</script>

<style></style>
