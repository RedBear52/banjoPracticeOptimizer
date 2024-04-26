<template>
  <div class="header-container">
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
import { ref } from 'vue'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import AvatarDropdown from './AvatarDropdown.vue'
import 'primeicons/primeicons.css'

const router = useRouter()
const menu = ref(null)
const items = ref([
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

const toggle = (event) => {
  menu.value.toggle(event)
}
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
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: var(--color-primary);
  color: var(--color);
  margin-bottom: 1px;
}

img {
  max-height: 265px;
  /* border: 1px solid var(--border-color-faded); */
  border-radius: 8px;
  /* box-shadow: 6px 6px 7px 1px var(--shadow-color); */
  /* border-bottom: dashed 1px var(--shadow-color); */
}

.hamburger-container {
  position: fixed;
  right: 0;
  top: 2rem;
  background-color: var(--color-primary);
  color: var(--color);
}

.hamburger {
  background-color: var(--color-primary);
  color: var(--color);
  border: none;
  margin: 0;
  padding: 0;
  /* font-size: larger; */
  cursor: pointer;
}

.hamburger:hover,
.hamburger:focus,
.hamburger:active {
  outline: none;
  border: none;
  box-shadow: none;
}

button.p-button:hover {
  background-color: initial !important;
  color: initial !important;
}
</style>
