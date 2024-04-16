<template>
  <div class="component-container">
    <h2>Practice Regimen</h2>
    <ul class="practice-list" id="practice-list">
      <h3>Current Practice Items</h3>
      <li v-for="item in practiceItems" :key="item.id">
        <span v-if="editingItem && editingItem.id === item.id">
          <textarea type="text" v-model="editingItem.practiceItem" @blur="updatePracticeItem" />
          <input type="number" v-model="editingItem.minutes" @blur="updatePracticeItem" />
          <button @click="editingItem = null">Cancel</button>
          <button @click="updatePracticeItem">Save</button>
        </span>
        <span> {{ item.practiceItem }}</span>
        <span> {{ item.minutes }} minutes</span>
        <button class="edit-btn" @click="editPracticeItem(item.id)">Edit</button>
        <button class="delete-btn" @click="deletePracticeItem(item.id)">
         Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const toast = useToast()
const practiceItems = ref([])
const editingItem = ref(null)

onMounted(() => {
  const storedPracticeItems = JSON.parse(localStorage.getItem('practiceItems'))
  if (storedPracticeItems) {
    practiceItems.value = storedPracticeItems
  }
  console.log(practiceItems.value)
})
const editPracticeItem = (id) => {
  const itemToEdit = practiceItems.value.find((item) => item.id === id)
  if (itemToEdit) {
    editingItem.value = { ...itemToEdit }
  }
}

const updatePracticeItem = () => {
  const itemIndex = practiceItems.value.findIndex((item) => item.id === editingItem.value.id)
  if (itemIndex !== -1) {
    practiceItems.value[itemIndex] = editingItem.value
    addPracticeItemsToLocalStorage()
    toast.success('Practice item updated successfully')
  }
  editingItem.value = null
}

const addPracticeItemsToLocalStorage = () => {
  localStorage.setItem('practiceItems', JSON.stringify(practiceItems.value))
}

const deletePracticeItem = (id) => {
  practiceItems.value = practiceItems.value.filter((practiceItems) => practiceItems.id !== id)
  deletePracticeItemFromLocalStorage(id)
  toast.success('Practice item deleted successfully')
}

const deletePracticeItemFromLocalStorage = (id) => {
  const storedPracticeItems = JSON.parse(localStorage.getItem('practiceItems'))
  const updatedPracticeItems = storedPracticeItems.filter((practiceItem) => practiceItem.id !== id)
  localStorage.setItem('practiceItems', JSON.stringify(updatedPracticeItems))
}
</script>
