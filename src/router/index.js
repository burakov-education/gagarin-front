import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from "@/views/AuthView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import GagarinView from "@/views/GagarinView.vue";
import MissionView from "@/views/MissionView.vue";
import SpaceFlightView from "@/views/SpaceFlightView.vue";
import SearchView from "@/views/SearchView.vue";
import AddSpaceFlightView from "@/views/AddSpaceFlightView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView,
    },
    {
      path: '/gagarin',
      name: 'gagarin',
      component: GagarinView,
    },
    {
      path: '/mission',
      name: 'mission',
      component: MissionView,
    },
    {
      path: '/space-flight',
      name: 'space-flight',
      component: SpaceFlightView,
    },
    {
      path: '/space-flight/create',
      name: 'space-flight-create',
      component: AddSpaceFlightView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
  ],
})

export default router
