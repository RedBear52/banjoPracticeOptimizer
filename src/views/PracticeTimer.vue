<template class="main-container">
  <div class="timer-container">
    <div class="title">
      <h1>Practice Timer</h1>
    </div>
    <div class="timer">
      <div class="focus">
        <p><strong>Practice Focus:</strong></p>
        <span
          ><p>{{ practiceItem }}</p>
        </span>
      </div>
      <div class="clock-container">
        <div class="timer-clock-container">
          <span class="time">{{ formatTime(timeElapsed) }}</span>
          <span
            v-if="
              (interval === undefined) |
                (state === 'stopped') |
                (state === 'paused')
            "
            @click="start"
            ><i
              v-tooltip.top="'start timer'"
              style="font-size: 2.5rem"
              class="pi pi-play"
            ></i
          ></span>
          <span
            style="font-size: 2.5rem"
            v-if="state === 'running'"
            @click="pause"
            ><i
              v-tooltip.top="'pause timer'"
              style="font-size: 2.5rem"
              class="pi pi-pause"
            ></i
          ></span>
          <span
            style="font-size: 2.5rem"
            v-if="state === 'paused' || state === 'stopped'"
            @click="restart"
            ><i
              v-tooltip.top="'reset timer'"
              style="font-size: 2.5rem"
              class="pi pi-refresh"
            ></i
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup >
import { ref, onMounted } from 'vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../main'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import 'primeicons/primeicons.css'
import Tooltip from 'primevue/tooltip'

const router = useRouter()
const route = useRouter().currentRoute.value
const toast = useToast()
const id = ref(0)
const practiceItem = ref('')
const day = ref('')
const minutes = ref(0)
const completed = ref(false)
const timeElapsed = ref(2)
const interval = ref(undefined)
const state = ref('stopped' | 'running' | 'paused')

onMounted(() => {
  const params = route.params
  id.value = params.id
  practiceItem.value = params.practiceItem
  minutes.value = params.minutes
  completed.value = params.completed
  day.value = params.day
  timeElapsed.value = minutes.value * 60
})

const formatTime = (elapsedtime) => {
  const minutes = `0${Math.floor(elapsedtime / 60)}`.slice(-2)
  const seconds = `0${elapsedtime % 60}`.slice(-2)
  return `${minutes}:${seconds}`
}

const start = () => {
  state.value = 'running'
  console.log('start')

  interval.value = setInterval(() => {
    if (timeElapsed.value > 0) {
      timeElapsed.value--
    } else {
      clearInterval(interval.value)
      markAsCompleted()
    }
  }, 10)
}

const pause = () => {
  state.value = 'paused'
  console.log('pause')
  clearInterval(interval.value)
}

const restart = () => {
  state.value = 'stopped'
  timeElapsed.value = minutes.value * 60
}

const markAsCompleted = async () => {
  const params = route.params
  console.log(params)
  try {
    await updateDoc(doc(db, 'practiceRegimen', id.value), {
      completed: true,
      day: params.day,
    })
    console.log(params.day, params.day)
  } catch (error) {
    console.error('Error updating document: ', error)
  }

  toast.success('Practice item completed!', {
    position: 'top-center',
  })

  router.push('/practice-regimen/')
}
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  /* width: 100vw; */
}

h1 {
  margin-left: 2rem;
}

.clock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  border: 1px solid hsl(0, 0%, 50%, 0.3);
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem;
  width: 44vw;
  background-color: var(--cheap-pine-color);
}

.timer-clock-container {
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  border: 1px solid var(--cheap-pine-color-faded-300);
  background-color: var(--container-background-color);
  border-radius: 8px;
  width: 40vw;
}

.focus {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.clock-container span {
  margin: 1rem;
  cursor: pointer;
  color: var(--cheap-pine-color);
}

.time {
  font-size: 4rem;
  margin-bottom: 3rem;
}

.timer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  width: 100vw;
}
</style>