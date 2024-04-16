<template>
  <div class="component-container">
    <h2>Add Practice Item</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-control">
        <label for="practice-item"></label>
        <textarea type="text" id="text" v-model="text" placeholder="Enter a new practice item" />
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
import { ref, onMounted} from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const text = ref([])
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
  if (!text.value || number.value <= 0) {
    toast.error('Please enter a valid practice item AND valid practice time value!')
    return
  }

  const practiceItemData = {
    practiceItem: text.value,
    minutes: number.value,
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

const addPracticeItemToLocalStorage = () => {
  localStorage.setItem('practiceItems', JSON.stringify(practiceItems.value))
}
</script>
