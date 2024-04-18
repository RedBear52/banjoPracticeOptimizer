import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../../views/HomeView.vue";
import AddGoals from "../../views/AddGoals.vue";
import AddPracticeItem from "../../views/AddPracticeItem.vue";
import GoalKeeper from "../GoalKeeper.vue";
import Header from "../../views/Header.vue";
import NavBar from "../../views/NavBar.vue";
import PracticeNotes from "../../views/PracticeNotes.vue";
import PracticeRegimen from "../../views/PracticeRegimen.vue";
import ExperimentalPracticeRegimen from "../../views/ExperimentalPracticeRegimen.vue";


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
            path: "/practice-regimen",
            name: "PracticeRegimen",
            component: PracticeRegimen
        },
        {
            path: "/experimental-practice-regimen",
            name: "ExperimentalPracticeRegimen",
            component: ExperimentalPracticeRegimen
        }
    ]
});

export default router;
