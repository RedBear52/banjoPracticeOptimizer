<template>
  <div class="main-container">
    <div class="card">
      <form action="submit">
        <div class="p-field">
          <h1>Register</h1>

          <!-- <label for="username">Username</label> -->
          <InputText
            class="p-inputtext-lg"
            id="email"
            v-model="email"
            autocomplete="email"
            placeholder="email"
          />
        </div>
        <div class="p-field">
          <!-- <label for="password">Password</label> -->
          <Password
            class="p-inputtext-lg"
            id="password"
            v-model="password"
            placeholder="password"
            :inputProps="{ autocomplete: true }"
          />
        </div>
        <div class="btn-container">
          <Button class="btn" label="Sign Up" @click="register" />
          <Button
            class="google-btn"
            label="Sign Up with Google"
            icon="pi pi-google"
            @click="signInWithGoogle"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Password from 'primevue/password'
import { useRouter } from 'vue-router'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
const value = ref(null)
const email = ref('')
const password = ref('')
const router = useRouter()

// TODO: Add more validation and error handling
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
  router.push('/profile')
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      // const credential = GoogleAuthProvider.credentialFromResult(result)
      // const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      console.log(user)
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.log(errorCode, errorMessage, email, credential)
    })
  router.push('/profile')
}
</script>

<style scoped>
.p-field {
  width: 100%;
}

.p-inputtext-lg {
  width: 80%;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  width: 100vw;
}

.btn {
  background-color: red;
  padding: 1rem;
  max-width: 120px;
  cursor: pointer;
  background-color: hsla(30, 66%, 65%, 1);
  margin-top: 2rem;
}

.btn-container {
  display: flex;
  flex-direction: row;
  min-width: 300px;
  justify-content: space-between;
}

.google-btn {
  margin-top: 2rem;
  border: 1px solid hsl(0, 0%, 50%, 0.3);
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  border-radius: 8px;
  border: 1px solid hsl(0, 0%, 50%, 0.3);
  box-shadow: 4px 4px 10px hsl(0, 0%, 50%, 0.3);
  padding: 4rem;
  padding-top: 0;
  border-radius: 8px;
  margin-top: -4rem;
}

h1 {
  justify-self: flex-start;
}
</style>