<template>
  <h1>Register</h1>
  <div class="card">
    <form action="submit">
      <div class="p-fluid">
        <div class="p-field">
          <label for="username">Username</label>
          <InputText id="username" v-model="value" autocomplete="username" />
          <label for="username">First Name</label>
          <InputText id="firstname" v-model="value" autocomplete="firstname" />
          <label for="username">Last Name</label>
          <InputText id="lastname" v-model="value" autocomplete="lastname" />
        </div>
        <div class="p-field">
          <label for="password">Password</label>
          <Password id="password" v-model="value" />
        </div>
        <Button label="Submit" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Password from 'primevue/password'

const value = ref(null)
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

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  border-radius: 8px;
  border: 1px solid hsl(0, 0%, 50%, 0.3);
  box-shadow: 4px 4px 10px hsl(0, 0%, 50%, 0.3);
  /* background-color: hsla(30, 66%, 65%, 1); */
  padding: 2rem;
  border-radius: 8px;
}
</style>