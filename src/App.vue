<template>
  <div class="main-container">
    <Header />
    <NavBar />
    <AddGoals @addGoal="handleSubmittedGoal" />
    <GoalKeeper :goals="goals" @deleteGoal="handleGoalDeleted" />
    <AddPracticeItem @addPracticeItem="handleSubmittedPracticeItem" />
    <PracticeRegimen
      :practiceItems="practiceItems"
      @deletePracticeItem="handlePracticeItemDeleted"
    />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import GoalKeeper from './components/GoalKeeper.vue'
import AddGoals from './components/AddGoals.vue'
import AddPracticeItem from './components/AddPracticeItem.vue'
import PracticeRegimen from './components/PracticeRegimen.vue'
import NavBar from './components/NavBar.vue'
import { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import { ref, onMounted } from 'vue'

const toast = useToast()

const goals = ref([])

const practiceItems = ref([])

onMounted(() => {
  const storedGoals = JSON.parse(localStorage.getItem('goals'))
  if (storedGoals) {
    goals.value = storedGoals
  }
  console.log(goals.value)

  const storedPracticeItems = JSON.parse(localStorage.getItem('practiceItems'))
  if (storedPracticeItems) {
    practiceItems.value = storedPracticeItems
  }
  console.log(practiceItems.value)
})

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

const handleGoalDeleted = (id) => {
  goals.value = goals.value.filter((goal) => goal.id !== id)
  deleteGoalFromLocalStorage(id)
  toast.success('Goal deleted successfully')
}

const handleSubmittedPracticeItem = (practiceItemData) => {
  console.log(practiceItemData)
  practiceItems.value.push({
    id: Math.random(),
    practiceItem: practiceItemData.practiceItem,
    minutes: practiceItemData.minutes,
    completed: practiceItemData.completed
  })

  console.log(practiceItems.value)

  addPracticeItemToLocalStorage()

  toast.success('Practice item successfully added!', {
    position: 'top-center',
    timeout: 2000
  })
}

const handlePracticeItemDeleted = (id) => {
  practiceItems.value = practiceItems.value.filter((practiceItems) => practiceItems.id !== id)
  deletePracticeItemFromLocalStorage(id)
  toast.success('Practice item deleted successfully')
}

const addGoalsToLocalStorage = () => {
  localStorage.setItem('goals', JSON.stringify(goals.value))
}

const addPracticeItemToLocalStorage = () => {
  localStorage.setItem('practiceItems', JSON.stringify(practiceItems.value))
}

const deleteGoalFromLocalStorage = (id) => {
  const storedGoals = JSON.parse(localStorage.getItem('goals'))
  const updatedGoals = storedGoals.filter((goal) => goal.id !== id)
  localStorage.setItem('goals', JSON.stringify(updatedGoals))
}

const deletePracticeItemFromLocalStorage = (id) => {
  const storedPracticeItems = JSON.parse(localStorage.getItem('practiceItems'))
  const updatedPracticeItems = storedPracticeItems.filter((practiceItem) => practiceItem.id !== id)
  localStorage.setItem('practiceItems', JSON.stringify(updatedPracticeItems))
}
</script>
