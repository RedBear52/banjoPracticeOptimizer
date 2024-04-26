<template>
  <div class="profile-container">
    <h1>Profile</h1>
    <div>
      <div class="profile-details">
        <img id="avatar" :src="photoURL" alt="profile photo" />
        <p>Username: {{ username }}</p>
        <p>Email: {{ email }}</p>
      </div>
      <div class="profile-edit">
        <!-- <h2>Edit Profile</h2> -->
        <form action="submit">
          <!-- <div class="img-editor">
          <InputText v-model="photoURL" placheholder="img url"> </InputText>
        </div> -->
          <div class="p-field">
            <InputText
              class="p-inputtext-lg"
              id="username"
              v-if="isEditing"
              v-model="usernameInput"
              autocomplete="username"
              placeholder="username"
              :readonly="!isEditing"
            />
          </div>
          <!-- allowing users to edit emails (along w the requisite verification) requires an upgrade in firebase plan -->
          <!-- <div class="p-field">
          <InputText
            class="p-inputtext-lg"
            id="email"
            v-model="email"
            autocomplete="email"
            placeholder="email"
            :readonly="!isEditing"
          /> -->
          <!-- </div> -->
          <div class="btn-container">
            <Button class="btn" label="Edit" @click="edit" v-if="!isEditing" />
            <Button class="btn" label="Save" @click="save" v-if="isEditing" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

 

<script setup>
import { ref, onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { getAuth, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../main'
import Card from 'primevue/card'

const auth = getAuth()
const user = auth.currentUser

const username = ref('')
const usernameInput = ref('')
const email = ref('')
const photoURL = ref('')
const isEditing = ref(false)

onMounted(() => {
  if (user) {
    username.value = user.displayName
    email.value = user.email
    photoURL.value = user.photoURL
  }
  console.log('User:', user)
  console.log('Username:', username.value)
  console.log('Email:', email.value)
  console.log('Photo URL:', photoURL.value)
})

const edit = () => {
  // Load the user's profile details
  isEditing.value = true
}

const save = async () => {
  console.log('Profile details saved')
  console.log('Username:', username.value)
  console.log('Email:', email.value)

  updateProfile(auth.currentUser, {
    displayName: usernameInput.value,
    photoURL: photoURL.value,
  })
    .then(() => {
      console.log('Profile updated successfully')
      isEditing.value = false
    })
    .catch((error) => {
      console.error('Error updating profile:', error)
    })

  const docRef = doc(db, 'users', user.uid)
  await setDoc(docRef, {
    username: usernameInput.value,
    email: email.value,
    photoURL: photoURL.value,
  })
  username.value = usernameInput.value

  usernameInput.value = ''

  isEditing.value = false
}
</script>

<style scoped>
#avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.profile-container {
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  /* margin-top: 2rem; */
  width: 80vw;
  margin-left: 2rem;
  border: 1px solid hsl(0, 0%, 50%, 0.3);
  border-radius: 8px;
  padding: 2rem;
}
</style>