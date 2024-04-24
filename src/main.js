import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import './assets/styles.css'
import router from './views/router/index.js'
import PrimeVue  from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import {initializeApp} from 'firebase/app'
import { getFirestore} from 'firebase/firestore'
import '../CheapPine-Sans.otf'

const firebaseConfig = {
  apiKey: "AIzaSyBxWkqDfaBHYmBGnBGbwokDKhW6LBBWBxg",
  authDomain: "banjo-practice-optimizer.firebaseapp.com",
  projectId: "banjo-practice-optimizer",
  storageBucket: "banjo-practice-optimizer.appspot.com",
  messagingSenderId: "591935296074",
  appId: "1:591935296074:web:eda21d92b91566f6ecccb3"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp); 
export { db }


const app = createApp(App)
app.directive('tooltip', Tooltip);
app.use(router)
app.use(PrimeVue)
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
