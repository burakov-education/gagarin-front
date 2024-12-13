<script setup>
import {ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import Preloader from "@/components/Preloader.vue";

const searchString = ref('')
const missions = ref([])
const isLoading = ref(true)

const sendForm = async () => {
  isLoading.value = false

  const { code, data } = await apiFetch('get', `/search?query=${searchString.value}`)

  missions.value = data.data

  isLoading.value = true
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="sendForm()" class="space-y-6" action="#" method="POST">
        <div>
          <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Поиск</label>
          <div class="mt-2">
            <input id="search" v-model="searchString" name="search" type="search" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-sky-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Найти</button>
        </div>
      </form>

      <Preloader v-if="!isLoading" />
      <div class="px-4 mb-10 mt-10 sm:px-0 bg-white shadow-xl rounded"
           v-if="isLoading"
           v-for="mission in missions"
      >
        <div class="flex justify-between w-full items-center p-6">
          <h2 class="text-base font-semibold leading-7 text-sky-600 text-xl">{{ mission.name }}</h2>
        </div>
        <div class="px-6">
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Тип: {{ mission.type }}</p>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Дата запуска: {{ mission.launch_date }}</p>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Дата посадки: {{ mission.landing_date }}</p>
          <div class="mt-6 border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">Место посадки</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ mission.landing_site }}</dd>
              </div>
            </dl>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <ul>
              <li class="flex justify-between gap-x-6 py-5"
                  v-for="crew in mission.crew"
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
    </div>
  </div>
</template>
