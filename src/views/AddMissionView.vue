<script setup>
import {onMounted, ref} from "vue";
import ErrorDescription from "@/components/ErrorDescription.vue";
import apiFetch from "@/helpers/apiFetch.js";
import {useRoute, useRouter} from "vue-router";
import Preloader from "@/components/Preloader.vue";

const form = ref({
  data: {
    "name": "",
    "launch_details": {
      "launch_date": "",
      "launch_site": {
        "name": "",
        "location": {
          "latitude": '',
          "longitude": ''
        }
      }
    },
    "landing_details": {
      "landing_date": "",
      "landing_site": {
        "name": "",
        "coordinates": {
          "latitude": '',
          "longitude": ''
        }
      }
    },
    "spacecraft": {
      "command_module": "",
      "lunar_module": "",
      "crew": [
        {
          "name": "",
          "role": ""
        }
      ]
    }
  },
  errors: {},
})
const router = useRouter()
const route = useRoute()
const id = ~~route.params.id
const isEdit = ref(false)
const isLoading = ref(false)

onMounted(async () => {
  if (id) {
    const {code, data} = await apiFetch('get', '/lunar-missions')
    const editMission = data.find(item => item.mission.id === id)

    if (editMission) {
      form.value.data = editMission.mission
      isEdit.value = true
    }
  }

  isLoading.value = true
})

const sendForm = async () => {
  form.value.errors = {}

  const { code, data } = await apiFetch(
      isEdit.value ? 'PATCH' : 'post',
      isEdit.value ? `/lunar-missions/${id}` : '/lunar-missions',
      {
        mission: form.value.data,
      }
  )

  if (code === 422) {
    form.value.errors = data.error.errors
  } else {
    await router.replace('/mission')
  }
}

const getError = (path) => {
  return form.value.errors[`mission.${path}`]
}

const addCrew = () => {
  form.value.data.spacecraft.crew.push({
    name: '',
    crew: '',
  })
}
const removeCrew = crew => {
  const index = form.value.data.spacecraft.crew.indexOf(crew)

  form.value.data.spacecraft.crew.splice(index, 1)
}
</script>

<template>
  <Preloader v-if="!isLoading" />
  <div class="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl" v-if="isLoading">
    <form @submit.prevent="sendForm()" class="px-4 mb-10 sm:px-0 bg-white shadow-xl rounded">
      <div class="flex justify-between w-full items-center p-6">
        <label class="text-base font-semibold leading-7 text-sky-600 text-xl">Название миссии</label>
        <input v-model="form.data.name" :class="{'is-invalid': getError('name')}" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
      </div>
      <ErrorDescription :errors="getError('name')" />
      <div class="px-6">
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Дата запуска</p>
        <input v-model="form.data.launch_details.launch_date" :class="{'is-invalid': getError('launch_details.launch_date')}" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
        <ErrorDescription :errors="getError('launch_details.launch_date')" />
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Дата посадки</p>
        <input v-model="form.data.landing_details.landing_date" :class="{'is-invalid': getError('landing_details.landing_date')}" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
        <ErrorDescription :errors="getError('landing_details.landing_date')" />
        <div class="mt-6 border-t border-gray-100">
          <dl class="divide-y divide-gray-100">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <label class="text-sm font-medium leading-6 text-gray-900">Место запуска</label>
              <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input v-model="form.data.launch_details.launch_site.name" :class="{'is-invalid': getError('launch_details.launch_site.name')}" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
                <ErrorDescription :errors="getError('launch_details.launch_site.name')" />
              </div>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <label class="text-sm font-medium leading-6 text-gray-900">Широта</label>
              <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    v-model="form.data.launch_details.launch_site.location.latitude"
                    :class="{'is-invalid': getError('launch_details.launch_site.location.latitude')}"
                >
                <ErrorDescription :errors="getError('launch_details.launch_site.location.latitude')" />
              </div>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <label class="text-sm font-medium leading-6 text-gray-900">Долгота</label>
              <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input v-model="form.data.launch_details.launch_site.location.longitude" :class="{'is-invalid': getError('launch_details.launch_site.location.longitude')}" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
                <ErrorDescription :errors="getError('launch_details.launch_site.location.longitude')" />
              </div>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <label class="text-sm font-medium leading-6 text-gray-900">Место посадки</label>
              <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                       v-model="form.data.landing_details.landing_site.name"
                       :class="{'is-invalid': getError('landing_details.landing_site.name')}"
                >
                <ErrorDescription :errors="getError('landing_details.landing_site.name')" />
              </div>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <label class="text-sm font-medium leading-6 text-gray-900">Широта</label>
              <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                       v-model="form.data.landing_details.landing_site.coordinates.latitude"
                       :class="{'is-invalid': getError('landing_details.landing_site.coordinates.latitude')}"
                >
                <ErrorDescription :errors="getError('landing_details.landing_site.coordinates.latitude')" />
              </div>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <label class="text-sm font-medium leading-6 text-gray-900">Долгота</label>
              <div class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                       v-model="form.data.landing_details.landing_site.coordinates.longitude"
                       :class="{'is-invalid': getError('landing_details.landing_site.coordinates.longitude')}"
                >
                <ErrorDescription :errors="getError('landing_details.landing_site.coordinates.longitude')" />
              </div>
            </div>
          </dl>
        </div>
        <h2 class="my-6 text-xl text-sky-600">Информация о космическом корабле</h2>
        <div class="px-4 sm:px-0">
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Лунный модуль: </p>
          <input class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                 v-model="form.data.spacecraft.lunar_module"
                 :class="{'is-invalid': getError('spacecraft.lunar_module')}"
          >
          <ErrorDescription :errors="getError('spacecraft.lunar_module')" />
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Управляющий модуль:</p>
          <input class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                 v-model="form.data.spacecraft.command_module"
                 :class="{'is-invalid': getError('spacecraft.command_module')}"
          >
          <ErrorDescription :errors="getError('spacecraft.command_module')" />
        </div>
        <div class="px-4 py-6 flex justify-between items-center">
          <ul>
            <li class="flex justify-between gap-x-6 py-5"
                v-for="(crew, index) in form.data.spacecraft.crew"
            >
              <div class="flex gap-x-4 items-center">
                <div>
                  <p class="text-sm font-semibold text-gray-900">ФИО</p>
                  <input class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                         v-model="crew.name"
                         :class="{'is-invalid': getError('spacecraft.crew.' + index + '.name')}"
                  >
                  <ErrorDescription :errors="getError('spacecraft.crew.' + index + '.name')" />
                </div>
                <div>
                  <p class="mt-1 text-xs text-gray-500">Должность</p>
                  <input class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                         v-model="crew.role"
                         :class="{'is-invalid': getError('spacecraft.crew.' + index + '.role')}"
                  >
                  <ErrorDescription :errors="getError('spacecraft.crew.' + index + '.role')" />
                </div>
                <div>
                  <i class="text-sky-600 text-2xl fa fa-minus" aria-hidden="true" @click="removeCrew(crew)"></i>
                </div>
              </div>
            </li>
          </ul>
          <div>
            <i class="text-sky-600 text-2xl fa fa-plus" aria-hidden="true" @click="addCrew()"></i>
          </div>
        </div>
      </div>
      <div class="my-10">
        <button type="submit" class="flex w-full justify-center rounded-md bg-sky-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Сохранить</button>
      </div>
    </form>
    <RouterLink to="/mission" class="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600" href="">К списку миссий</RouterLink>
  </div>
</template>
