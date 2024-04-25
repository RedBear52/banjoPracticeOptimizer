<template>
  <div class="component-container">
    <h2>Goal Keeper</h2>
    <ul class="goal-list" id="goal-list">
      <h3>Current Goals</h3>
      <li v-for="goal in goals" :key="goal.id">
        <span v-if="editingGoal && editingGoal.id === goal.id">
          <InputText
            type="text"
            id="text"
            v-model="editingGoal.declaration"
            @blur="updateGoal"
          />
          <button @click="editingGoal = null">Cancel</button>
          <button @click="updateGoal">Save</button>
        </span>
        <span v-else>
          {{ goal.declaration }}
          <button class="edit-btn" @click="editGoal(goal.id)">Edit Goal</button>
          <button class="delete-btn" @click="deleteGoal(goal.id)">
            Delete Goal
          </button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const toast = useToast()
const goals = ref([])
const editingGoal = ref(null)
const text = ref('')

onMounted(() => {
  const storedGoals = JSON.parse(localStorage.getItem('goals'))
  if (storedGoals) {
    goals.value = storedGoals
  }
  console.log(goals.value)
})

const deleteGoal = (id) => {
  goals.value = goals.value.filter((goal) => goal.id !== id)
  deleteGoalFromLocalStorage(id)
  toast.success('Goal deleted successfully')
}

const editGoal = (id) => {
  const goalToEdit = goals.value.find((goal) => goal.id === id)
  if (goalToEdit) {
    // Set the goal to be edited
    editingGoal.value = { ...goalToEdit }
  }
}

const updateGoal = () => {
  const goalIndex = goals.value.findIndex(
    (goal) => goal.id === editingGoal.value.id
  )
  if (goalIndex !== -1) {
    goals.value[goalIndex] = editingGoal.value
    addGoalsToLocalStorage()
    toast.success('Goal updated successfully')
  }
  editingGoal.value = null
}

const addGoalsToLocalStorage = () => {
  localStorage.setItem('goals', JSON.stringify(goals.value))
}

const deleteGoalFromLocalStorage = (id) => {
  localStorage.setItem('goals', JSON.stringify(goals.value))
}
</script>
