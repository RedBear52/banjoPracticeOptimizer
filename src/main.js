import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import './assets/styles.css'

const app = createApp(App)
app.use(Toast, {
  position: 'top-center',
  timeout: 4000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  toastClassName: 'toast-style',
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false
})
app.mount('#app')
