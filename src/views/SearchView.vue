<script setup>
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">

        <div>
          <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Поиск</label>
          <div class="mt-2">
            <input id="search" name="search" type="search" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-sky-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Найти</button>
        </div>
      </form>

    </div>
  </div>
</template>
