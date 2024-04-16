<template>
  <div class="component-container">
    <h2>Set New Goal</h2>
    <form id="form" @submit.prevent="onSubmit">
      <div class="form-control">
        <label for="goal"></label>
        <textarea type="text" id="text" v-model="text" placeholder="Enter a new goal" />
      </div>
      <button type="submit">Add Goal</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const text = ref('')
const goals = ref([])
const emit = defineEmits(['addGoal'])

  onMounted(() => {
    const storedGoals = JSON.parse(localStorage.getItem('goals'))
    if (storedGoals) {
      goals.value = storedGoals
    }
    console.log(goals.value)
  })

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

  handleSubmittedGoal(goalData)

  console.log(goalData.declaration)
  text.value = ''
}

const handleSubmittedGoal = (goalData) => {
  console.log(goalData)
  goals.value.push({
    id: Math.random(),
    declaration: goalData.declaration,
    completed: goalData.completed
  })

   console.log(goals.value)

  addGoalsToLocalStorage()

  toast.success('Goal successfully added!', {
    position: 'top-center',
    timeout: 2000
  })
}

const addGoalsToLocalStorage = () => {
  localStorage.setItem('goals', JSON.stringify(goals.value))
}
</script>

<style></style>
