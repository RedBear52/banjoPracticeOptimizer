<template>
    <DataTable :value="practiceRegimen" tableStyle="min-width: 50rem">
    <template  #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
            <span class="text-xl text-900 font-bold"><h2>Practice Regimen</h2></span>
            <Button  value="Notes" rounded raised ><i class="pi pi-clipboard"></i><span>Notes</span></Button>
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
        <Column field="completed" header="Status" >
        <template #body="slotProps">
           <span :class="{ completed: slotProps.data.completed}">
            {{ getStatusText(slotProps.data.completed) }}
           </span>
        </template>
    </Column>
    <Column >
        <template #body="slotProps">
            <InputSwitch  v-model="slotProps.data.completed" @click="toggleStatusSwitch(slotProps.data)" />        
         </template>
    </Column>
    <template #footer> total practice time is: {{totalMinutes(practiceRegimen)}} </template>
</DataTable>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputSwitch from 'primevue/inputswitch';


import 'primeicons/primeicons.css'

const id = ref(0);
const practiceItem = ref('');
const minutes = ref(0);
const completed = ref(false);
const practiceRegimen = ref([]);
const checked = ref(false);
const editingItem = ref(null);
const tempItem = reactive({ id: null, practiceItem: '' });
const cancel = ref(false);

    onMounted(() => {
  const storedPracticeItems = JSON.parse(localStorage.getItem('practiceItems'))
  if (storedPracticeItems) {
    practiceRegimen.value = storedPracticeItems
  }
  console.log(practiceRegimen.value)
})

const getStatusText = (status) => {
    
  return status ? 'Completed' : 'Not Completed';
}

const toggleStatusSwitch = (status) => {
    console.log(status);
    status.completed = !status.completed;
    updateLocalStorage();
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
  deletePracticeItemFromLocalStorage(id)
}

const deletePracticeItemFromLocalStorage = (id) => {
  const storedPracticeItems = JSON.parse(localStorage.getItem('practiceItems'))
  const updatedPracticeItems = storedPracticeItems.filter((practiceItem) => practiceItem.id !== id)
  localStorage.setItem('practiceItems', JSON.stringify(updatedPracticeItems))
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



.pi .pi-save {
    /* color: var(--green-500); */
}
</style>