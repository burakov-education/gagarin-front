<script setup>
import {onMounted, ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import Preloader from "@/components/Preloader.vue";

const flights = ref([])
const modalMessage = ref('')
const isLoading = ref(false)

const book = async (flightNumber) => {
  const {code, data} = await apiFetch('post', '/book-flight', {
    flight_number: flightNumber,
  })

  await updateFlights()

  modalMessage.value = code === 201 ? 'Успешная регистрация' : 'Нет мест';
}

const updateFlights = async () => {
  isLoading.value = false

  const {code, data} = await apiFetch('get', '/space-flights')

  flights.value = data.data

  isLoading.value = true
}

onMounted(async () => {
  await updateFlights()
})
</script>

<template>
  <div class="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
    <div class="p-6 mb-10 sm:px-0 bg-white shadow-xl rounded">
      <RouterLink to="/space-flight/create" class="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mb-4">
        Добавить рейс
      </RouterLink>

      <Preloader v-if="!isLoading" />
      <div class="flex gap-2 justify-between p-4" style="flex-wrap: wrap" v-if="isLoading">
        <div class="shadow-md rounded w-full p-4" v-for="flight in flights" style="flex-basis: calc(50% - 4px)">
          <h2 class="font-bold">{{ flight.flight_number }}</h2>
          <p>{{ flight.destination }}</p>
          <p>{{ flight.launch_date }}</p>
          <p>{{ flight.seats_available }}</p>
          <button class="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mt-2" @click.prevent="book(flight.flight_number)">Записаться</button>
        </div>
      </div>
    </div>
    <RouterLink to="/gagarin" class="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600" href="">На главную страницу</RouterLink>
  </div>

  <div class="modal" v-if="modalMessage">
    <div class="modal-wrapper">
      <div class="modal-message">{{ modalMessage }}</div>
      <button class="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mt-2" @click="modalMessage = ''">Закрыть</button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background-color: rgba(0,0,0,.5);
}
.modal-wrapper {
  padding: 40px;
  background: white;
  border-radius: 20px;
  text-align: center;
  min-width: 300px;
}
.modal-message {
  margin-bottom: 20px;
}
</style>