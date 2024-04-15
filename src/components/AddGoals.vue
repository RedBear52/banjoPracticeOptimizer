<template>
  <div class="component-container">
    <h2>Set New Goal</h2>
    <form id="form" @submit.prevent="onSubmit">
      <div class="form-control">
        <label for="goal"></label>
        <input type="text" id="text" v-model="text" placeholder="Enter a new goal" />
      </div>
      <button type="submit">Add Goal</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const text = ref('')
const emit = defineEmits(['addGoal'])

const onSubmit = () => {
  console.log(text.value)
  if (!text.value) {
    toast.error('Please enter a valid goal !')
    return
  }

  const goalData = {
    declaration: text.value,
    completed: false
  }

  emit('addGoal', goalData)
  console.log(goalData.declaration)
  text.value = ''
}
</script>

<style></style>
