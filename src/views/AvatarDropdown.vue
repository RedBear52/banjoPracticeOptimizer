<template>
  <Button
    type="button"
    icon="pi pi-user"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="overlay_menu"
  />
  <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
</template>

<script setup>
import { ref } from 'vue'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import 'primeicons/primeicons.css'

const router = useRouter()
const menu = ref(null)
const items = ref([
  {
    label: 'Profile',
    icon: 'pi pi-fw pi-user',
    command: () => {
      router.push('/profile')
    },
  },
  {
    label: 'Register',
    icon: 'pi pi-fw pi-user-plus',
    command: () => {
      router.push('/register')
    },
  },
  {
    label: 'LogIn',
    icon: 'pi pi-fw pi-sign-in',
    command: () => {
      router.push('/login')
    },
  },
  {
    label: 'LogOut',
    icon: 'pi pi-fw pi-sign-out',
    command: () => {
      router.push('/logout')
    },
  },
  {
    label: 'Settings',
    icon: 'pi pi-fw pi-cog',
    command: () => {
      router.push('/settings')
    },
  },
])

const toggle = (event) => {
  menu.value.toggle(event)
}
</script>