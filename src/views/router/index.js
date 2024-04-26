import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../../views/HomeView.vue";
import AddGoals from "../../views/AddGoals.vue";
import AddPracticeItem from "../../views/AddPracticeItem.vue";
import GoalKeeper from "../GoalKeeper.vue";
import Header from "../../views/Header.vue";
import NavBar from "../../views/NavBar.vue";
import PracticeNotes from "../../views/PracticeNotes.vue";
import ExperimentalPracticeRegimen from "../../views/ExperimentalPracticeRegimen.vue";
import PracticeTimer from "../../views/PracticeTimer.vue";
import Profile from "../../views/Profile.vue";
import Register from "../../views/Register.vue";
import LogIn from "../../views/LogIn.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomeView
        },
        {
            path: "/add-goals",
            name: "AddGoals",
            component: AddGoals
        },
        {
            path: "/add-practice-item",
            name: "AddPracticeItem",
            component: AddPracticeItem
        },
        {
            path: "/goal-keeper",
            name: "GoalKeeper",
            component: GoalKeeper
        },
        {
            path: "/header",
            name: "Header",
            component: Header
        },
        {
            path: "/nav-bar",
            name: "NavBar",
            component: NavBar
        },
        {
            path: "/practice-notes",
            name: "PracticeNotes",
            component: PracticeNotes
        },
        {
            path: "/goal-keeper",
            name: "GoalKeeper",
            component: GoalKeeper
        },
        {
            path: "/experimental-practice-regimen",
            name: "ExperimentalPracticeRegimen",
            component: ExperimentalPracticeRegimen
        },
        {
            path: "/timer/:id/:practiceItem/:minutes/:completed",
            name: "PracticeTimer",
            component: PracticeTimer
        },
        {
            path: "/profile",
            name: "Profile",
            component: Profile,
            meta: {
                requiresAuth: true
            }
        },
         {
            path: "/register",
            name: "Register",
            component: Register
        },
        {
            path: "/login",
            name: "Login",
            component: LogIn
        }
    ]
});

const getCurrentUser = () => {
 return new Promise((resolve, reject) => {
     const removeListener = onAuthStateChanged(getAuth(), user => {
         removeListener()
         resolve(user)
     }, reject)
 })
};

router.beforeEach(async (to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
       if(await getCurrentUser()) {
           next()
       } else {
        alert("You must be logged in to see this page")
        next("/")
    } 
    } else {
        next()
    }
})



export default router;
