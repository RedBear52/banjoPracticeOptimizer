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
import { ref, onMounted, computed } from 'vue'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import 'primeicons/primeicons.css'

const isLoggedIn = ref(false)
const router = useRouter()
const menu = ref(null)
const items = computed(() => {
  const baseItems = [
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
      command: () => {
        router.push('/profile')
      },
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      command: () => {
        router.push('/settings')
      },
    },
  ]

  if (isLoggedIn.value) {
    return [
      ...baseItems,
      {
        label: 'LogOut',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          handleSignOut()
        },
      },
    ]
  } else {
    return [
      ...baseItems,
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
    ]
  }
})

let auth = getAuth()
onMounted(() => {
  auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const toggle = (event) => {
  menu.value.toggle(event)
}

const handleSignOut = () => {
  // Sign out the user
  console.log('signing out')
  signOut(getAuth())
  router.push('/')
}
</script>