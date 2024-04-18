<template>
   
   <DataTable :value="goals" tableStyle="min-width: 50rem">
    <template  #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
            <span class="text-xl text-900 font-bold"><h2>Current Goals</h2></span>
                        <router-link to="/add-goals"><Button  value="Add Goals" rounded raised ><i class="pi pi-plus"></i><span>Set New Goal</span></Button></router-link>
        </div>
    </template>

    <Column field="goal" header="Goal" > 
        <template #body="slotProps">
        <span v-if="editingGoal && editingGoal.id === slotProps.data.id" >
  <InputText type="text" id="text" v-model="editingGoal.declaration"  />
  <span v-tooltip.top="'cancel changes'" @click.stop="editingGoal = null" class="pi pi-times"></span>
  <span v-tooltip.top="'save changes'" @click="updateGoal" class="pi pi-save"></span>
</span>
            <span v-else :class="{ completed: slotProps.data.completed}" >
                {{slotProps.data.declaration}}
        </span>
        </template>
    </Column>

    <Column field="edit" header="Edit Goal">
         <template #body="slotProps">
            <Button :disabled="slotProps.data.completed" class="edit-btn" @click="editGoal(slotProps.data.id)" label="Edit"  icon="pi pi-pencil" rounded raised ></Button>
         </template>
    </Column>
    <Column field="delete" header="Delete Goal">
        <template #body="slotProps">
            <Button :disabled="slotProps.data.completed" class="delete-btn" @click="deleteGoal(slotProps.data.id)" label="Delete" icon="pi pi-trash" rounded raised ></Button>
         </template>
    </Column>

      <Column field="day" header="Notes">
          <template #body="slotProps">
              <span v-tooltip.top="'add note'"  >
               <i class="pi pi-plus" :class="{ completed: slotProps.data.completed}" style="color: var(--button-color-text)" @click="addNote(slotProps.data.id)"></i> 
              </span>
              <span v-tooltip.top="'view note'" >
                <i class="pi pi-eye" :class="{ completed: slotProps.data.completed}" style="color: var(--button-color-text)" @click="viewNote(slotProps.data.id)"></i>
              </span>
          </template>
      </Column>

    <Column field="completed" header="Status" >
        <template #body="slotProps">
           <span :class="{ completed: slotProps.data.completed}">
            {{ getStatusText(slotProps.data.completed) }}
           </span>
        </template>
    </Column>
   
   <Column >
        <template #body="slotProps">
            <InputSwitch  v-model="slotProps.data.completed" v-tooltip.top="'toggle status'" @click="toggleStatusSwitch(slotProps.data)" />        
         </template>
    </Column>
 
</DataTable>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import InputText from 'primevue/inputtext';
import InputSwitch from 'primevue/inputswitch';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import 'primeicons/primeicons.css'

const goals = ref([])
const editingGoal = ref(null)
const goal = ref('')


onMounted(() => {
  const storedGoals = JSON.parse(localStorage.getItem('goals'))
  if (storedGoals) {
    goals.value = storedGoals
  }
  console.log(goals.value)
})

const addNote = (id) => {
  const item = goals.value.find(item => item.id === id);
  console.log(item)
  item.notes = prompt('Enter your notes here', item.notes);
  updateLocalStorage();
}
// TODO: CHANGE THIS TO A MODAL
const viewNote = (id) => {
  const item = goals.value.find(item => item.id === id);
  alert(item.notes);
}

const getStatusText = (status) => {
    console.log(status)
  return status ? 'Completed' : 'Not Completed';
}

const toggleStatusSwitch = (status) => {
    console.log(status);
    status.completed = !status.completed;
    updateLocalStorage();
}

const updateLocalStorage = () => {
    localStorage.setItem('practiceItems', JSON.stringify(goals.value));
}

const deleteGoal = (id) => {
  goals.value = goals.value.filter((goal) => goal.id !== id)
  deleteGoalFromLocalStorage(id)
}

const editGoal = (id) => {
  const goalToEdit = goals.value.find(goal => goal.id === id)
  console.log(id)
  if (goalToEdit) {
    editingGoal.value = {...goalToEdit}
  }
}

const updateGoal = () => {
  const goalIndex = goals.value.findIndex(goal => goal.id === editingGoal.value.id)
  if (goalIndex !== -1) {
    goals.value[goalIndex] = { ...editingGoal.value }
    addGoalsToLocalStorage()
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

<style scoped>
.delete-btn {
    background-color: var(--white);
}

.delete-btn:hover {
    background-color: var(--red-500);
    color: var(--white);
}

.delete-btn:disabled, .edit-btn:disabled {
    background-color: var(--gray-300);
    color: var(--gray-500);
    border: none;
}

.completed {
  color: var(--strikethrough-color);
  text-decoration: line-through;
  cursor: not-allowed;
}
</style>



