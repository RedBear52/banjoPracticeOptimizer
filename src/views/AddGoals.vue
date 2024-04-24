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
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import  InputText  from 'primevue/inputtext'
import { useRouter } from 'vue-router'
import { db } from '../main'
import { collection, addDoc } from 'firebase/firestore'

const toast = useToast()
const text = ref('')
const router = useRouter()

const onSubmit = async () => {
  if (!text.value) {
  toast.error('Please enter a valid goal !')
  return
    }
    try {
      const docRef = await addDoc(collection(db, 'goals'), {
        declaration: text.value,
        completed: false
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
      console.log(text.value)

      toast.success('Goal successfully added!', {
        position: 'top-center',
        timeout: 2000
  })
  text.value = ''

  router.push('/goal-keeper')
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
