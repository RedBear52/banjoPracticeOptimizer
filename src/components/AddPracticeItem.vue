<template>
  <div class="component-container">
    <h2>Add Practice Item</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-control">
        <label for="practice-item"></label>
        <input type="text" id="text" v-model="text" placeholder="Enter a new practice item" />
      </div>
      <div class="form-control">
        <label for="practice-time"></label>
        <input type="number" id="number" v-model="number" placeholder="Enter a new practice item" />
      </div>
      <button type="submit">Add Practice Item</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useToast } from 'vue-toastification'

const toast = useToast()
const text = ref('')
const number = ref(0)
const emit = defineEmits(['addPracticeItem'])

const onSubmit = () => {
  console.log(text.value)
  console.log(number.value)
  if (!text.value || number.value <= 0) {
    toast.error('Please enter a valid practice item AND valid practice time value!')
    return
  }

  const practiceItemData = {
    practiceItem: text.value,
    minutes: number.value,
    completed: false
  }

  emit('addPracticeItem', practiceItemData)

  console.log(practiceItemData.practiceItem)
  text.value = ''
}
</script>
