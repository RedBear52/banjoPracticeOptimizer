<template>
  <div class="profile-container">
    <h1>Profile</h1>
    <div>
      <div class="profile-details">
        <img id="avatar" :src="photoURLInput" alt="profile photo" />
        <p><strong>Username:</strong> {{ username }}</p>
        <p><strong>Email:</strong> {{ email }}</p>
      </div>
      <div class="profile-edit">
        <!-- <h2>Edit Profile</h2> -->
        <form action="submit">
          <div class="img-editor">
            <label v-if="isEditing" for="photoURL">Photo URL</label>
            <InputText
              class="p-inputtext-lg"
              id="photoURL"
              v-if="isEditing"
              v-model="photoURLInput"
              :readonly="!isEditing"
              placeholder="img url"
            >
            </InputText>
          </div>
          <div class="p-field">
            <label v-if="isEditing" for="username">Username</label>
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
            <Button
              class="icon-btn"
              icon="pi pi-pencil"
              @click="edit"
              v-if="!isEditing"
              v-tooltip.bottom="'edit profile'"
            />
            <Button
              class="icon-btn"
              icon="pi pi-save"
              @click="save"
              v-if="isEditing"
              v-tooltip.bottom="'save changes'"
            />
            <Button
              class="icon-btn"
              icon="pi pi-times"
              @click="cancel"
              v-if="isEditing"
              v-tooltip.bottom="'cancel edit'"
            />
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
import Tooltip from 'primevue/tooltip'
import 'primeicons/primeicons.css'

const auth = getAuth()
const user = auth.currentUser

const username = ref('')
const usernameInput = ref('')
const email = ref('')
const photoURL = ref('')
const photoURLInput = ref('')
const isEditing = ref(false)

onMounted(() => {
  if (user) {
    username.value = user.displayName
    email.value = user.email
    photoURLInput.value = user.photoURL
  }
  console.log('User:', user)
  console.log('Username:', username.value)
  console.log('Email:', email.value)
  console.log('Photo URL:', photoURL.value)
})

const edit = () => {
  // Load the user's profile details
  photoURLInput.value = photoURL.value || photoURLInput.value
  usernameInput.value = username.value || usernameInput.value

  isEditing.value = true
}

const save = async () => {
  console.log('Profile details saved')
  console.log('Username:', username.value)
  console.log('Email:', email.value)

  updateProfile(auth.currentUser, {
    displayName: usernameInput.value,
    photoURL: photoURLInput.value,
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
    photoURL: photoURLInput.value,
  })
  username.value = usernameInput.value
  photoURL.value = photoURLInput.value

  photoURL.value = ''
  usernameInput.value = ''

  isEditing.value = false
}

const cancel = () => {
  photoURLInput.value = photoURL.value || photoURLInput.value
  usernameInput.value = username.value || usernameInput.value
  isEditing.value = false
}
</script>

<style scoped>
p {
  font-size: 1.25rem;
}

.icon-btn {
  background-color: transparent;
  border: none;
  width: 40px;
  height: 40px;
  color: hsl(0, 0%, 50%);
}

#avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.profile-container {
  width: 94vw;
  margin-left: 2rem;
  border: 1px solid hsl(0, 0%, 50%, 0.3);
  border-radius: 8px;
  padding: 1rem;
}

.profile-details {
  padding: 1rem;
}

.profile-details p {
  margin: 0.5rem;
}
</style>