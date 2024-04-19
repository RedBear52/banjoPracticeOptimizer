<template>
      <div class="data-table-container">
        <DataTable  :value="filteredRegimen" tableStyle="min-width: 50rem" class="data-table" >      <template  #header>
          <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <span class="text-xl text-900 font-bold"><h2>Practice Regimen</h2></span>
                        <router-link to="/add-practice-item"><Button  value="Notes" rounded raised ><i class="pi pi-plus"></i><span>Add Practice Item</span></Button></router-link>

      <TabMenu :model="tabItems">
        
      </TabMenu>
          </div>
      </template>
      <Column field="practiceItem" header="Practice Item" > 
          <template #body="slotProps">
              <span v-if="editingItem && editingItem.id === slotProps.data.id" >
                  <InputText type="text" id="text" v-model="tempItem.practiceItem"  />
                  <span v-tooltip.top="'cancel changes'" @click.stop="editingItem = null" class="pi pi-times"></span>
            <span v-tooltip.top="'save changes'" @click="updatePracticeItem" class="pi pi-save"></span>
              </span>
            <span v-else :class="{ completed: slotProps.data.completed}" >
              {{slotProps.data.practiceItem}}
            </span>
          </template>
      </Column>
      <Column field="minutes" header="Focus Time" >
          <template #body="slotProps">
          <span :class="{ completed: slotProps.data.completed}">
              {{ slotProps.data.minutes }} minutes
          </span>
          </template>
      </Column>
      <Column field="edit" header="Edit Item">
          <template #body="slotProps">
              <Button  :disabled="slotProps.data.completed" class="edit-btn" @click="editPracticeItem(slotProps.data.id)" label="Edit"  icon="pi pi-pencil" rounded raised ></Button>
          </template>
      </Column>
      <Column field="delete" header="Delete Item">
          <template #body="slotProps">
              <Button :disabled="slotProps.data.completed" class="delete-btn" @click="deletePracticeItem(slotProps.data.id)" label="Delete" icon="pi pi-trash" rounded raised ></Button>
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
              <span v-tooltip.top="'toggle status'">
                <InputSwitch  v-model="slotProps.data.completed" v-tooltip.top="'toggle status'" @click="toggleStatusSwitch(slotProps.data)" /> 
              </span>       
          </template>
      </Column>
      <template #footer> total practice time is: {{totalMinutes(filteredRegimen)}} </template>
  </DataTable>
      </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputSwitch from 'primevue/inputswitch';
import TabMenu from 'primevue/tabmenu';


import 'primeicons/primeicons.css'

const id = ref(0);
const practiceItem = ref('');
const minutes = ref(0);
const completed = ref(false);
const practiceRegimen = ref([]);
const filteredRegimen = ref([]);
const checked = ref(false);
const editingItem = ref(null);
const tempItem = reactive({ id: null, practiceItem: '' });
const cancel = ref(false);

const tabItems = ([
  {
    label: 'Monday',
    command: () => {
    const mondayRegimen = practiceRegimen.value.filter((item) => item.day === 'Monday')
    console.log(mondayRegimen)
    filteredRegimen.value = mondayRegimen
    } 
  },
  {
    label: 'Tuesday',
    command: () => {
    filteredRegimen.value.filter((item) => item.day === 'Tuesday')
    const tuesdayRegimen = practiceRegimen.value.filter((item) => item.day === 'Tuesday')
    console.log(tuesdayRegimen)
    filteredRegimen.value = tuesdayRegimen
    }
  },
  {label: 'Wednesday',
    command: () => {
   filteredRegimen.value.filter((item) => item.day === 'Wednesday')
    const wednesdayRegimen = practiceRegimen.value.filter((item) => item.day === 'Wednesday')
    console.log(wednesdayRegimen)
    filteredRegimen.value = wednesdayRegimen
    } },
  {label: 'Thursday',
    command: () => {
   filteredRegimen.value.filter((item) => item.day === 'Thursday')
    const thursdayRegimen = practiceRegimen.value.filter((item) => item.day === 'Thursday')
    console.log(thursdayRegimen)
    filteredRegimen.value = thursdayRegimen
    } },
  {label: 'Friday',
    command: () => {
   filteredRegimen.value.filter((item) => item.day === 'Friday')
    const fridayRegimen = practiceRegimen.value.filter((item) => item.day === 'Friday')
    console.log(fridayRegimen)
    filteredRegimen.value = fridayRegimen
    } },
  {label: 'Saturday',
    command: () => {
   filteredRegimen.value.filter((item) => item.day === 'Saturday')
    const saturdayRegimen = practiceRegimen.value.filter((item) => item.day === 'Saturday')
    console.log(saturdayRegimen)
    filteredRegimen.value = saturdayRegimen
    } },
  {label: 'Sunday',
    command: () => {
   filteredRegimen.value.filter((item) => item.day === 'Sunday')
    const sundayRegimen = practiceRegimen.value.filter((item) => item.day === 'Sunday')
    console.log(sundayRegimen)
    filteredRegimen.value = sundayRegimen
    }
  }
]);

onMounted(() => {
  const storedPracticeItems = JSON.parse(localStorage.getItem('practiceItems'))
  if (storedPracticeItems) {
    practiceRegimen.value = storedPracticeItems
    filteredRegimen.value = storedPracticeItems.filter((item) => item.day === 'Monday'); // Filter for Monday items
  }
  console.log(practiceRegimen.value)
  console.log(filteredRegimen.value)
})

const getStatusText = (status) => {
    
  return status ? 'Completed' : 'Not Completed';
}

const toggleStatusSwitch = (status) => {
    console.log(status);
    status.completed = !status.completed;
    updateLocalStorage();
}
// TODO:   CHANGE THIS TO A MODAL
const addNote = (id) => {
  const item = practiceRegimen.value.find(item => item.id === id);
  console.log(item)
  item.notes = prompt('Enter your notes here', item.notes);
  updateLocalStorage();
}
// TODO: CHANGE THIS TO A MODAL
const viewNote = (id) => {
  const item = practiceRegimen.value.find(item => item.id === id);
  alert(item.notes);
}

const editPracticeItem = (id) => {
  const item = practiceRegimen.value.find(item => item.id === id);
  editingItem.value = item;
  Object.assign(tempItem, item);
}

const updatePracticeItem = () => {
  Object.assign(editingItem.value, tempItem);
  updateLocalStorage();
  editingItem.value = null;
}


const totalMinutes = (practiceRegimen) => {
    return practiceRegimen.reduce((acc, item) => acc + Number(item.minutes), 0);
}

const updateLocalStorage = () => {
    localStorage.setItem('practiceItems', JSON.stringify(practiceRegimen.value));
}

const deletePracticeItem = (id) => {
  practiceRegimen.value = practiceRegimen.value.filter((practiceItems) => practiceItems.id !== id)
  filteredRegimen.value = filteredRegimen.value.filter((practiceItems) => practiceItems.id !== id)
  deletePracticeItemFromLocalStorage(id)
}

const deletePracticeItemFromLocalStorage = (id) => {
  const storedPracticeItems = JSON.parse(localStorage.getItem('practiceItems'))
  const updatedPracticeItems = storedPracticeItems.filter((practiceItem) => practiceItem.id !== id)
  localStorage.setItem('practiceItems', JSON.stringify(updatedPracticeItems))
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

button {
  margin-bottom: 1.75rem;
  margin-top: 0.75rem;
}

h2 {
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

:deep(li.p-highlight a )  {
  background-color: rgba(223, 195,	140, 1);
  color: var(--button-color-text);
}

:deep(li.p-highlight a span)  {
  color: var(--button-color-tab-text);
}

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

 i.completed {
  filter: grayscale(100%);
  cursor: not-allowed;
} 

.p-tabmenuitem {
  background-color: red;
  color: red;
}


</style>