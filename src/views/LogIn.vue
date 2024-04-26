<template>
  <h1>Log In</h1>
  <div class="card">
    <form action="submit">
      <div class="p-field">
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
        <Password
          id="password"
          v-model="password"
          autocomplete="password"
          placeholder="password"
          :feedback="false"
        />
      </div>
      <div class="error-container">
        <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
      </div>
      <Button class="btn" label="Sign Up" @click="login" />
      <Button class="btn" label="Sign in w Google" @click="signInWithGoogle" />
    </form>
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
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
const value = ref('null')
const email = ref('')
const errorMessage = ref(null)
const password = ref('')
const router = useRouter()
// Add more validation and error handling
const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      // Signed in
      console.log('successfully signed in!')
      const user = userCredential.user
      console.log(user)
      router.push('/profile')
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errorMessage.value = 'No account with that email was found'
          break
        case 'auth/invalid-credential':
          errorMessage.value = 'Incorrect password'
          break
        default:
          errorMessage.value = 'Email or password was incorrect'
          break
      }

      const errCode = error.code
      const errMessage = error.message
      console.log(errCode, errMessage)
    })
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      console.log(user)
      router.push('/profile')
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
}
</script>

<style scoped>
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
  border-radius: 8px;
}
</style>