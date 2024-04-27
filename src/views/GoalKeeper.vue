<template>
  <div class="data-table-container">
    <DataTable :value="goals" tableStyle="min-width: 50rem" class="data-table">
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <span class="text-xl text-900 font-bold"><h1>Current Goals</h1></span>
          <router-link to="/add-goals"
            ><Button class="add-goal" value="Add Goals" rounded raised
              ><i class="pi pi-plus"></i><span>Set New Goal</span></Button
            ></router-link
          >
        </div>
      </template>

      <Column field="goal" header="Goal">
        <template #body="slotProps">
          <span v-if="editingGoal && editingGoal.id === slotProps.data.id">
            <InputText
              type="text"
              id="text"
              v-model="editingGoal.declaration"
            />
            <span
              v-tooltip.top="'cancel changes'"
              @click.stop="editingGoal = null"
              class="pi pi-times"
            ></span>
            <span
              v-tooltip.top="'save changes'"
              @click="updateGoal"
              class="pi pi-save"
            ></span>
          </span>
          <span v-else :class="{ completed: slotProps.data.completed }">
            {{ slotProps.data.declaration }}
          </span>
        </template>
      </Column>
      <Column field="edit" header="Edit Goal">
        <template #body="slotProps">
          <Button
            :disabled="slotProps.data.completed"
            class="edit-item-btn"
            @click="editGoal(slotProps.data.id)"
            label="Edit"
            icon="pi pi-pencil"
            rounded
            raised
          ></Button>
        </template>
      </Column>
      <Column field="delete" header="Delete Goal">
        <template #body="slotProps">
          <Button
            :disabled="slotProps.data.completed"
            class="delete-btn"
            @click="deleteGoal(slotProps.data.id)"
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
          <InputSwitch
            v-model="slotProps.data.completed"
            v-tooltip.top="'toggle status'"
            @click="toggleStatusSwitch(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../main'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import InputText from 'primevue/inputtext'
import InputSwitch from 'primevue/inputswitch'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import 'primeicons/primeicons.css'

const auth = getAuth()
const goals = ref([])
const editingGoal = ref(null)

onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const q = query(
          collection(db, 'goals'),
          where('userId', '==', user.uid)
        )
        const querySnapshot = await getDocs(q)
        goals.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log(goals.value)
      } catch (error) {
        console.error('Error retrieving documents: ', error)
      }
    } else {
      console.log('User is not signed in')
      router.push('/login')
    }
  })

  // Call unsubscribe when the component unmounts
  onUnmounted(() => {
    unsubscribe()
  })
})

const addNote = (id) => {
  const item = goals.value.find((item) => item.id === id)
  console.log(item)
  //  add note to goal object in firestore
  const note = prompt('Add a note to this goal')
  if (note) {
    item.notes = note
    AddNoteInFirestore(item)
  }
}

const AddNoteInFirestore = async (item) => {
  try {
    await updateDoc(doc(db, 'goals', item.id), {
      notes: item.notes,
    })
  } catch (error) {
    console.error('Error updating document: ', error)
  }
}

// TODO: CHANGE THIS TO A MODAL
const viewNote = (id) => {
  const item = goals.value.find((item) => item.id === id)
  //  show note from firestore in primevue Dialog
  alert(item.notes)
}

const getStatusText = (status) => {
  console.log(status)
  return status ? 'Completed' : 'Not Completed'
}

const toggleStatusSwitch = (status) => {
  console.log(status)
  status.completed = !status.completed
  updateFirestoreCompletedStatus(status)
}

const updateFirestoreCompletedStatus = async (status) => {
  try {
    await updateDoc(doc(db, 'goals', status.id), {
      // find firestore item by id and update the completed status
      completed: status.completed,
    })
  } catch (error) {
    console.error('Error updating document: ', error)
  }
}

const deleteGoal = (id) => {
  goals.value = goals.value.filter((goal) => goal.id !== id)
  deleteGoalFromFirestore(id)
}

const editGoal = (id) => {
  const goalToEdit = goals.value.find((goal) => goal.id === id)
  console.log(id)
  if (goalToEdit) {
    //  edit in firestore
    editingGoal.value = { ...goalToEdit }
  }
}

const updateGoal = () => {
  const goalIndex = goals.value.findIndex(
    (goal) => goal.id === editingGoal.value.id
  )
  if (goalIndex !== -1) {
    goals.value[goalIndex] = { ...editingGoal.value }
    // update edited goal in firestore
    updateGoalInFirestore(editingGoal.value)
  }
  editingGoal.value = null
}

const updateGoalInFirestore = async (goal) => {
  try {
    await updateDoc(doc(db, 'goals', goal.id), {
      declaration: goal.declaration,
    })
  } catch (error) {
    console.error('Error updating document: ', error)
  }
}

const deleteGoalFromFirestore = (id) => {
  try {
    deleteDoc(doc(db, 'goals', id))
  } catch (error) {
    console.error('Error deleting document: ', error)
  }
}
</script>

<style scoped>
.add-goal:hover {
  background-color: var(--button-color-border);
}

.edit-item-btn {
  background-color: var(--button-color);
  color: var(--button-color-text);
}

.edit-item-btn:hover {
  background-color: var(--button-color-border);
}

.delete-btn:hover {
  background-color: var(--red-500);
  color: var(--white);
}

.delete-btn:disabled,
.edit-item-btn:disabled {
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

.data-table-container {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.data-table {
  width: 80%;
}

h1 {
  margin-bottom: 1rem;
}

h2 {
  margin-bottom: 0.5rem;
  font-size: 2rem;
}
</style>



