<template >
  <div class="main-container">
    <div class="card">
      <form action="submit">
        <div class="p-field">
          <h1>Log In</h1>

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
            class="p-inputtext-lg"
            id="password"
            :inputProps="{ autocomplete: true }"
            v-model="password"
            placeholder="password"
            :feedback="false"
          />
        </div>
        <div class="error-container">
          <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
        </div>
        <div class="btn-container">
          <Button class="btn" label="Log In" @click="login" />
          <Button
            class="google-btn"
            label="Log in w Google"
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
  margin-top: 2rem;
}

h1 {
  justify-self: flex-start;
  margin-top: 2rem;
}
</style>