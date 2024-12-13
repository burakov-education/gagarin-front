<script setup>
import {onMounted, ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import Preloader from "@/components/Preloader.vue";

const missions = ref([])
const isLoading = ref(false)

const updateMissions = async () => {
  isLoading.value = false

  const { code, data } = await apiFetch('get', '/lunar-missions')

  missions.value = data.map(mission => {
    const newMission = mission.mission

    newMission.isOpen = false

    return newMission
  })

  isLoading.value = true
}
onMounted(async () => {
  await updateMissions()
})

const deleteMission = async (mission) => {
  if (confirm('Delete???')) {
    await apiFetch('delete', `/lunar-missions/${mission.id}`)
    await updateMissions()
  }
}
</script>

<template>
  <div class="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
    <RouterLink to="/add-mission" class="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mb-4">
      Добавить миссию
    </RouterLink>

    <Preloader v-if="!isLoading" />
    <div class="px-4 mb-10 sm:px-0 bg-white shadow-xl rounded"
         v-if="isLoading"
         v-for="mission in missions"
    >
      <div class="flex justify-between w-full items-center p-6">
        <h2 class="text-base font-semibold leading-7 text-sky-600 text-xl">{{ mission.name }}</h2>
        <div class="flex gap-4">
          <button class="button-open" :class="{'rotate': mission.isOpen}" @click="mission.isOpen = !mission.isOpen">
            <i class="fa fa-angle-down text-xl" aria-hidden="true"></i>
          </button>
          <RouterLink :to="`/add-mission/${mission.id}`">
            <i class="fa fa-edit text-xl" aria-hidden="true"></i>
          </RouterLink>
          <button @click="deleteMission(mission)">
            <i class="fa fa-trash text-xl text-red-500" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="px-6" v-if="mission.isOpen">
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Дата запуска: {{ mission.launch_details.launch_date }}</p>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Дата посадки: {{ mission.landing_details.landing_date }}</p>
        <div class="mt-6 border-t border-gray-100">
          <dl class="divide-y divide-gray-100">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Место запуска</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ mission.launch_details.launch_site.name }}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Широта</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ mission.launch_details.launch_site.location.latitude }}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Долгота</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ mission.launch_details.launch_site.location.longitude }}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Место посадки</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ mission.landing_details.landing_site.name }}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Широта</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ mission.landing_details.landing_site.coordinates.latitude }}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Долгота</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ mission.landing_details.landing_site.coordinates.longitude }}</dd>
            </div>
          </dl>
        </div>
        <h2 class="my-6 text-xl text-sky-600">Информация о космическом корабле</h2>
        <div class="px-4 sm:px-0">
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Лунный модуль: {{ mission.spacecraft.lunar_module }}</p>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Управляющий модуль: {{ mission.spacecraft.command_module }}</p>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <ul>
            <li class="flex justify-between gap-x-6 py-5"
              v-for="crew in mission.spacecraft.crew"
            >
              <div class="flex gap-x-4">
                <p class="text-sm font-semibold text-gray-900">{{ crew.name }}</p>
                <p class="mt-1 text-xs text-gray-500">{{ crew.role }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <a class="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600" href="">К списку миссий</a>
  </div>
</template>

<style scoped>
.button-open {
  transition: transform 0.3s;
}
.button-open.rotate {
  transform: rotate(180deg);
}
</style>
