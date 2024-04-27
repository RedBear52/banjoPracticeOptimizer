<template>
  <div class="data-table-container">
    <DataTable
      :value="filteredRegimen"
      tableStyle="min-width: 50rem"
      class="data-table"
    >
      <template #header>
        <div
          class="margin-mitigate flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <span class="text-xl text-900 font-bold"
            ><h1>Practice Regimen</h1></span
          >
          <router-link to="/add-practice-item"
            ><Button class="practice-btn" value="Notes" rounded raised
              ><i class="pi pi-plus"></i><span>Add Practice Item</span></Button
            ></router-link
          >
          <TabMenu :model="tabItems"> </TabMenu>
        </div>
      </template>
      <Column field="practiceItem" header="Practice Item">
        <template #body="slotProps">
          <span v-if="editingItem && editingItem.id === slotProps.data.id">
            <InputText type="text" id="text" v-model="tempItem.practiceItem" />
            <span
              v-tooltip.top="'cancel changes'"
              @click.stop="editingItem = null"
              class="pi pi-times"
            ></span>
            <span
              v-tooltip.top="'save changes'"
              @click="updatePracticeItem"
              class="pi pi-save"
            ></span>
          </span>
          <span v-else :class="{ completed: slotProps.data.completed }">
            {{ slotProps.data.practiceItem }}
          </span>
        </template>
      </Column>
      <Column field="minutes" header="Focus Time">
        <template #body="slotProps">
          <span
            class="minutes-edit-span"
            v-if="editingItem && editingItem.id === slotProps.data.id"
          >
            <InputNumber
              class="minutes-edit-field"
              type="number"
              id="number"
              v-model="tempItem.minutes"
            />
          </span>
          <span v-else :class="{ completed: slotProps.data.completed }">
            {{ slotProps.data.minutes }} minutes
          </span>
        </template>
      </Column>
      <Column field="timer" header="Timer">
        <template #body="slotProps">
          <span
            @click="openPracticeTimer(slotProps.data.id)"
            :class="{ completed: slotProps.data.completed }"
          >
            <i class="pi pi-fw pi-clock"></i>
          </span>
        </template>
      </Column>
      <Column field="edit" header="Edit Item">
        <template #body="slotProps">
          <Button
            :disabled="slotProps.data.completed"
            class="edit-item-btn"
            @click="editPracticeItem(slotProps.data.id)"
            label="Edit"
            icon="pi pi-pencil"
            rounded
            raised
          ></Button>
        </template>
      </Column>
      <Column field="delete" header="Delete Item">
        <template #body="slotProps">
          <Button
            :disabled="slotProps.data.completed"
            class="delete-btn"
            @click="deletePracticeItem(slotProps.data.id)"
            label="Delete"
            icon="pi pi-trash"
            rounded
            raised
          ></Button>
        </template>
      </Column>
      <Column field="day" header="Notes">
        <template #body="slotProps">
          <span v-tooltip.top="'add note'">
            <i
              class="pi pi-plus"
              :class="{ completed: slotProps.data.completed }"
              style="color: var(--button-color-text)"
              @click="addNote(slotProps.data.id)"
            ></i>
          </span>
          <span v-tooltip.top="'view note'">
            <i
              class="pi pi-eye"
              :class="{ completed: slotProps.data.completed }"
              style="color: var(--button-color-text)"
              @click="viewNote(slotProps.data.id)"
            ></i>
          </span>
        </template>
      </Column>
      <Column field="completed" header="Status">
        <template #body="slotProps">
          <span :class="{ completed: slotProps.data.completed }">
            {{ getStatusText(slotProps.data.completed) }}
          </span>
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <span v-tooltip.top="'toggle status'">
            <InputSwitch
              v-model="slotProps.data.completed"
              v-tooltip.top="'toggle status'"
              @click="toggleStatusSwitch(slotProps.data)"
            />
          </span>
        </template>
      </Column>
      <template #footer>
        total practice time: {{ totalMinutes(filteredRegimen) }} minutes
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  where,
  query,
} from 'firebase/firestore'
import { db } from '../main'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import TabMenu from 'primevue/tabmenu'
import 'primeicons/primeicons.css'

const practiceRegimen = ref([])
const filteredRegimen = ref([])
const editingItem = ref(null)
const tempItem = reactive({ id: null, practiceItem: '' })
const router = useRouter()
const auth = getAuth()

const tabItems = [
  {
    label: 'Monday',
    command: () => {
      filteredRegimen.value.filter((item) => item.day === 'Monday')
      const mondayRegimen = practiceRegimen.value.filter(
        (item) => item.day === 'Monday'
      )
      console.log(mondayRegimen)
      filteredRegimen.value = mondayRegimen
    },
  },
  {
    label: 'Tuesday',
    command: () => {
      filteredRegimen.value.filter((item) => item.day === 'Tuesday')
      const tuesdayRegimen = practiceRegimen.value.filter(
        (item) => item.day === 'Tuesday'
      )
      console.log(tuesdayRegimen)
      filteredRegimen.value = tuesdayRegimen
    },
  },
  {
    label: 'Wednesday',
    command: () => {
      filteredRegimen.value.filter((item) => item.day === 'Wednesday')
      const wednesdayRegimen = practiceRegimen.value.filter(
        (item) => item.day === 'Wednesday'
      )
      console.log(wednesdayRegimen)
      filteredRegimen.value = wednesdayRegimen
    },
  },
  {
    label: 'Thursday',
    command: () => {
      filteredRegimen.value.filter((item) => item.day === 'Thursday')
      const thursdayRegimen = practiceRegimen.value.filter(
        (item) => item.day === 'Thursday'
      )
      console.log(thursdayRegimen)
      filteredRegimen.value = thursdayRegimen
    },
  },
  {
    label: 'Friday',
    command: () => {
      filteredRegimen.value.filter((item) => item.day === 'Friday')
      const fridayRegimen = practiceRegimen.value.filter(
        (item) => item.day === 'Friday'
      )
      console.log(fridayRegimen)
      filteredRegimen.value = fridayRegimen
    },
  },
  {
    label: 'Saturday',
    command: () => {
      filteredRegimen.value.filter((item) => item.day === 'Saturday')
      const saturdayRegimen = practiceRegimen.value.filter(
        (item) => item.day === 'Saturday'
      )
      console.log(saturdayRegimen)
      filteredRegimen.value = saturdayRegimen
    },
  },
  {
    label: 'Sunday',
    command: () => {
      filteredRegimen.value.filter((item) => item.day === 'Sunday')
      const sundayRegimen = practiceRegimen.value.filter(
        (item) => item.day === 'Sunday'
      )
      console.log(sundayRegimen)
      filteredRegimen.value = sundayRegimen
    },
  },
]

onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      router.push('/login')
    } else {
      console.log(user.uid)
      try {
        const q = query(
          collection(db, 'practiceRegimen'),
          where('userId', '==', user.uid)
          // where('day', '==', useRouter().currentRoute.value.params.day)
        )

        const querySnapshot = await getDocs(q)
        console.log(querySnapshot)
        practiceRegimen.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        filteredRegimen.value.filter((item) => item.day === 'Monday')
        const mondayRegimen = practiceRegimen.value.filter(
          (item) => item.day === 'Monday'
        )
        console.log(mondayRegimen)
        filteredRegimen.value = mondayRegimen

        console.log(filteredRegimen.value)
      } catch (error) {
        console.error('Error retrieving documents: ', error)
      }
    }
  })

  onUnmounted(() => {
    unsubscribe()
  })
})

const getStatusText = (status) => {
  return status ? 'Completed' : 'Not Completed'
}

const toggleStatusSwitch = (status) => {
  console.log(status)
  status.completed = !status.completed
  updateFirestoreCompletedStatus(status)
}

const updateFirestoreCompletedStatus = async (status) => {
  try {
    await updateDoc(doc(db, 'practiceRegimen', status.id), {
      completed: status.completed,
    })
    console.log(status.id)
  } catch (error) {
    console.error('Error updating document: ', error)
  }
}

// TODO:   CHANGE THIS TO A MODAL
const addNote = (id) => {
  const item = practiceRegimen.value.find((item) => item.id === id)
  console.log(item)
  item.notes = prompt('Enter your notes here', item.notes)
  AddNoteInFirestore(item)
}
// TODO:   CHANGE THIS TO A MODAL
const AddNoteInFirestore = async (item) => {
  try {
    await updateDoc(doc(db, 'practiceRegimen', item.id), {
      notes: item.notes,
    })
  } catch (error) {
    console.error('Error updating document: ', error)
  }
}

const openPracticeTimer = (id) => {
  const item = practiceRegimen.value.find((item) => item.id === id)
  console.log(item)
  router.push({
    name: 'PracticeTimer',
    params: {
      id: item.id,
      practiceItem: item.practiceItem,
      minutes: item.minutes,
      completed: item.completed,
      day: item.day,
    },
  })
}

const viewNote = (id) => {
  const item = practiceRegimen.value.find((item) => item.id === id)
  alert(item.notes)
}

const editPracticeItem = (id) => {
  const item = practiceRegimen.value.find((item) => item.id === id)
  editingItem.value = item
  Object.assign(tempItem, item)
}

const updatePracticeItem = () => {
  Object.assign(editingItem.value, tempItem)
  updatePracticeItemInFirebase()
  editingItem.value = null
}

const updatePracticeItemInFirebase = () => {
  try {
    updateDoc(doc(db, 'practiceRegimen', editingItem.value.id), {
      practiceItem: editingItem.value.practiceItem,
      minutes: editingItem.value.minutes,
    })
  } catch (error) {
    console.error('Error updating document: ', error)
  }
}

const totalMinutes = (practiceRegimen) => {
  return practiceRegimen.reduce((acc, item) => acc + Number(item.minutes), 0)
}

const deletePracticeItem = (id) => {
  practiceRegimen.value = practiceRegimen.value.filter(
    (practiceItems) => practiceItems.id !== id
  )
  filteredRegimen.value = filteredRegimen.value.filter(
    (practiceItems) => practiceItems.id !== id
  )
  deletePracticeItemFromFirebase(id)
}

const deletePracticeItemFromFirebase = (id) => {
  try {
    deleteDoc(doc(db, 'practiceRegimen', id))
  } catch (error) {
    console.error('Error deleting document: ', error)
  }
}
</script>

<style scoped>
.data-table-container {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.data-table {
  width: 80%;
}

:deep(.p-column-title) {
  /* color: var(--button-color-border); */
}

button {
  margin-bottom: 1.75rem;
  margin-top: 1.5rem;
}

.practice-btn {
  margin-bottom: 1.75rem;
}

.practice-btn:hover {
  background-color: var(--button-color-border);
}

:deep(li.p-highlight a) {
  background-color: rgba(223, 195, 140, 1);
  border: 1px solid var(--black);
}

:deep(li.p-highlight a span) {
  color: var(--cheap-pine-color);
}

:deep(li a) {
  border: 1px solid var(--black);
  border-bottom: none;
  background-color: var(--cheap-pine-color-faded);
}

:deep(li a span) {
  font-family: 'Cheap Pine', sans-serif;
  font-size: 1.25rem;
  letter-spacing: 1.5px;
  /* color: var(--white); */
  color: var(--cheap-pine-color-faded-text);
}

.delete-btn {
  background-color: var(--white);
}

.delete-btn:hover {
  background-color: var(--red-500);
  color: var(--white);
}

.edit-item-btn {
  background-color: var(--white);
}

.edit-item-btn:hover {
  background-color: var(--button-color-border);
  color: var(--white);
}

.delete-btn:disabled,
.edit-btn:disabled {
  background-color: var(--gray-300);
  color: var(--gray-500);
  border: none;
}

.completed {
  color: var(--strikethrough-color);
  text-decoration: line-through;
  cursor: not-allowed;
}

i.completed {
  filter: grayscale(100%);
  cursor: not-allowed;
}

h1 {
  margin-top: 0;
}
</style>