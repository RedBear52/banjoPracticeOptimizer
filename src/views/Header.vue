<template>
  <div class="header-container" :class="{ scrolling: isScrolling }">
    <div>
      <img src="../assets/images/pbbLogo.jpg" alt="" />
    </div>
    <div class="card flex justify-content-center hamburger-container">
      <AvatarDropdown />

      <Button
        class="hamburger"
        type="button"
        icon="pi pi-bars"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_menu"
      />
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import AvatarDropdown from './AvatarDropdown.vue'
import 'primeicons/primeicons.css'

const router = useRouter()
const menu = ref(null)
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    command: () => {
      router.push('/')
    },
  },
  {
    label: 'Goal Keeper',
    icon: 'pi pi-fw pi-trophy',
    command: () => {
      router.push('/goal-keeper')
    },
  },
  {
    label: 'Practice Regimen',
    icon: 'pi pi-fw pi-receipt',
    command: () => {
      router.push('/practice-regimen/')
    },
  },
])

const isScrolling = ref(false)

const toggle = (event) => {
  menu.value.toggle(event)
}

const handleScroll = () => {
  console.log(window.scrollY)
  console.log(isScrolling.value)

  isScrolling.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>


<style>
.card {
  display: flex;
}

.card button {
  background-color: var(--color-primary);
  color: var(--color);
  margin: 0;
  padding-right: 0;
  min-width: 50px;
  cursor: pointer;
  border: 1px solid var(--white);
}

.header-container {
  background-color: white;
  border-color: var(--cheap-pine-color-faded-300);
  color: var(--color);
  margin-bottom: 1px;
  padding-bottom: 1rem;
  width: 100vw;
  z-index: 900;
  transition: ease-out 0.3s;
}

.header-container.scrolling {
  transition: ease-in 0.3s;
  box-shadow: 0 2px 12px -2px var(--cheap-pine-color-faded-300);
  /* background-color: var(--cheap-pine-color); */
  background-color: rgb(254, 255, 255);
  opacity: 1;
}

img {
  max-height: 125px;
  border-radius: 8px;
  border: dotted 4px var(--butterscotch);
  margin-left: 1rem;
  margin-top: 1rem;
}

.hamburger-container {
  position: fixed;
  right: 0;
  top: 2rem;
  background-color: var(--color-primary);
  color: var(--color);
  border: none;
}

.hamburger {
  background-color: var(--color-primary);
  color: var(--color);
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

.hamburger:hover,
.hamburger:focus,
.hamburger:active {
  outline: none;
  border: none;
  box-shadow: none;
}

button.p-button {
  background-color: var(--color-primary);
  color: var(--color);
  border: none;
}

button.p-button:hover {
  background-color: initial;
  border: none;
}
</style>
