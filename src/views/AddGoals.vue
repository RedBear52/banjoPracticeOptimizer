<template>
  <div class="new-goal-container">
    <div class="component-container">
    <h2>Set New Goal</h2>
    <form id="form" @submit.prevent="onSubmit">
      <div class="form-control">
        <InputText type="text" id="text" v-model="text" placeholder="Enter a new goal" />
      </div>
      <button type="submit">Add Goal</button>
    </form>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import  InputText  from 'primevue/inputtext'
import { useRouter } from 'vue-router'

const toast = useToast()
const text = ref('')
const goals = ref([])
const emit = defineEmits(['addGoal'])
const router = useRouter()

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

  router.push('/goal-keeper')

}

const addGoalsToLocalStorage = () => {
  localStorage.setItem('goals', JSON.stringify(goals.value))
}
</script>

<style scoped>
.new-goal-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  width: 100vw;
}

.component-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  border-radius: 8px;
  border: 1px solid hsl(0, 0%, 50%, 0.3);
  box-shadow: 4px 4px 10px hsl(0, 0%, 50%, 0.3);
}

.component-container h2 {
  align-self: flex-start;

}

#text {
  width: 50vw;
}
</style>
