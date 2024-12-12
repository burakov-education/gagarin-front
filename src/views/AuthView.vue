<script setup>
import {inject, ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import ErrorDescription from "@/components/ErrorDescription.vue";
import {useRouter} from "vue-router";

const form = ref({
  data: {
    email: '',
    password: '',
  },
  errors: {},
})
const updateToken = inject('updateToken')
const router = useRouter()

const sendForm = async () => {
  form.value.errors = {}
  const {code, data} = await apiFetch('post', '/authorization', form.value.data)

  if (code !== 200) {
    if (code === 422) {
      form.value.errors = data.error.errors
    } else {
      form.value.errors.email = [data.message]
    }
  } else {
    updateToken(data.data.token)

    await router.replace('/gagarin')
  }
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=sky&shade=600" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Войдите в свою учетную запись</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="sendForm()" class="space-y-6" action="#" method="POST">

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Электронная почта</label>
          <div class="mt-2">
            <input id="email" v-model="form.data.email" :class="{'is-invalid': form.errors.email}" name="email" type="email"   class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
            <ErrorDescription :errors="form.errors.email" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
          </div>
          <div class="mt-2">
            <input id="password" v-model="form.data.password" :class="{'is-invalid': form.errors.password}" name="password" type="password" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
            <ErrorDescription :errors="form.errors.password" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-sky-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Авторизоваться</button>
        </div>
      </form>

    </div>
  </div>
</template>
