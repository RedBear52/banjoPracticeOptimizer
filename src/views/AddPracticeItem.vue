<template>
  <div class="add-goal-container">
    <div class="component-container">
    <h2>Add Practice Item</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-control">
        <label for="practice-day"></label>
        <Dropdown  v-model="selectedDay" :options="days" optionLabel="name" placeholder="Day of the week" />
      </div>
      <div class="form-control">
        <label for="practice-item"></label>
        <InputText type="text" id="text" v-model="text" placeholder="Enter a new practice item" />
      </div>
      <div class="form-control">
        <label for="practice-time">Number of minutes to focus on this practice item</label>
        <InputText type="number" id="number" v-model="number" placeholder="minutes" />
      </div>
      <button type="submit">Add Practice Item</button>
    </form>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

const router = useRouter()
const toast = useToast()
const text = ref([])
const selectedDay = ref()
const days = ref([
  { name: 'Monday', code: 'M' },
  { name: 'Tuesday', code: 'T' },
  { name: 'Wednesday', code: 'W' },
  { name: 'Thursday', code: 'Th' },
  { name: 'Friday', code: 'F' },
  { name: 'Saturday', code: 'S' },
  { name: 'Sunday', code: 'Su' }
])
const number = ref(0)
const practiceItems = ref([])

onMounted(() => {
  const storedPracticeItems = JSON.parse(localStorage.getItem('practiceItems'))
  if (storedPracticeItems) {
    practiceItems.value = storedPracticeItems
  }
  console.log(practiceItems.value)
})

const onSubmit = () => {
  console.log(text.value)
  console.log(number.value)
  console.log(selectedDay.value)
  console.log(practiceItems.value)
  if (!text.value || number.value <= 0 || !selectedDay.value) {
    toast.error('Please enter a valid practice item AND valid practice time value AND day of the week!')
    return
  }

  const practiceItemData = {
    day: selectedDay.value.name,
    practiceItem: text.value,
    minutes: number.value,
    notes: '',
    completed: false
  }

  handleSubmittedPracticeItem(practiceItemData)

  console.log(practiceItemData.practiceItem)
  text.value = ''
}

const handleSubmittedPracticeItem = (practiceItemData) => {
  console.log(practiceItemData)
  practiceItems.value.push({
    id: Math.random(),
    day: practiceItemData.day,
    practiceItem: practiceItemData.practiceItem,
    minutes: practiceItemData.minutes,
    notes: practiceItemData.notes,
    completed: practiceItemData.completed
  })

  console.log(practiceItems.value)

  addPracticeItemToLocalStorage()

  toast.success('Practice item successfully added!', {
    position: 'top-center',
    timeout: 2000
  })

  router.push('/experimental-practice-regimen')
}

const addPracticeItemToLocalStorage = () => {
  localStorage.setItem('practiceItems', JSON.stringify(practiceItems.value))
}
</script>

<style scoped>
.add-goal-container {
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
</style>
