<script setup>
import {ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import Preloader from "@/components/Preloader.vue";
import ErrorDescription from "@/components/ErrorDescription.vue";

const form = ref({
  data: {
    fileimage: null,
    message: '',
  },
  errors: {},
})
const imageUrl = ref(null)
const isLoading = ref(false)
const isDragOver = ref(false)
const fileName = ref(null)
const sendForm = async () => {
  isLoading.value = true
  form.value.errors = {}

  const formData = new FormData()
  for (const key in form.value.data) {
    formData.append(key, form.value.data[key])
  }

  const {code, data} = await apiFetch('post', '/lunar-watermark', formData, true)

  if (code === 422) {
    form.value.errors = data.error.errors
  } else {
    imageUrl.value = URL.createObjectURL(data)
  }

  isLoading.value = false
}
const changeFile = () => {
  setFile(event.target.files[0])
}
const setFile = file => {
  form.value.data.fileimage = file

  fileName.value = file.name
}

const dragOver = (event) => {
  event.preventDefault()
  isDragOver.value = true
}
const dragLeave = (event) => {
  event.preventDefault()
  isDragOver.value = false
}
const drop = (event) => {
  setFile(event.dataTransfer.files[0])

  isDragOver.value = false
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="sendForm()" class="space-y-6" action="#" method="POST">
        <div>
          <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Заказ на луне</label>
          <div class="mt-2">
            <input type="text" v-model="form.data.message" :class="{'is-invalid': form.errors.message}" placeholder="Сообщение" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
            <ErrorDescription :errors="form.errors.message" />
          </div>
        </div>
        <div>
          <div class="mt-2">
            <label class="drop-zone"
                   :class="{'is-invalid': form.errors.fileimage, 'over': isDragOver}"
                   @dragover="dragOver($event)"
                   @dragleave="dragLeave($event)"
                   @drop.prevent="drop($event)"
            >
              <template v-if="fileName">
                {{ fileName }}
              </template>
              <template v-else>
                Переместите файл в данную область
              </template>
              <input type="file" @change="changeFile()" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
            </label>
            <ErrorDescription :errors="form.errors.fileimage" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-sky-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Заказ</button>
        </div>
      </form>

      <Preloader v-if="isLoading" />
      <img class="mt-5" v-if="imageUrl" :src="imageUrl" alt="">

      <RouterLink to="/gagarin" class="items-center flex justify-center bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600" href="">На главную</RouterLink>

    </div>
  </div>
</template>

<style scoped>
.drop-zone {
  padding: 20px;
  border: 5px dashed #eee;
  text-align: center;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  display: block;
}
.drop-zone.over {
  border-color: aquamarine;
  color: aquamarine;
}
.drop-zone.is-invalid {
  border-color: brown;
  color: brown;
}
.drop-zone input {
  display: none;
}
</style>