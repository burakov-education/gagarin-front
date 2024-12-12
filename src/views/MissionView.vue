<script setup>
</script>

<template>
  <div class="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
    <button class="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mb-4">
      Добавить миссию
    </button>
    <div class="px-4 mb-10 sm:px-0 bg-white shadow-xl rounded">
      <div class="flex justify-between w-full items-center p-6">
        <h2 class="text-base font-semibold leading-7 text-sky-600 text-xl">Название миссии</h2>
        <div class="flex gap-4">
          <button>
            <i class="fa fa-angle-left text-xl" aria-hidden="true"></i>
          </button>
          <button>
            <i class="fa fa-edit text-xl" aria-hidden="true"></i>
          </button>
          <button>
            <i class="fa fa-trash text-xl text-red-500" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="px-4 mb-10 sm:px-0 bg-white shadow-xl rounded">
      <div class="flex justify-between w-full items-center p-6">
        <h2 class="text-base font-semibold leading-7 text-sky-600 text-xl">Название миссии</h2>
        <div class="flex gap-4">
          <button>
            <i class="fa fa-angle-down text-xl" aria-hidden="true"></i>
          </button>
          <button>
            <i class="fa fa-edit text-xl" aria-hidden="true"></i>
          </button>
          <button>
            <i class="fa fa-trash text-xl text-red-500" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="px-6">
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Дата запуска</p>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Дата посадки</p>
        <div class="mt-6 border-t border-gray-100">
          <dl class="divide-y divide-gray-100">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Место запуска</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Космический центр имени Кеннеди</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Широта</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">28.5721000</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Долгота</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">-80.6480000</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Место посадки</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Море спокойствия</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Широта</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">0.6740000</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">Долгота</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">23.4720000</dd>
            </div>
          </dl>
        </div>
        <h2 class="my-6 text-xl text-sky-600">Информация о космическом корабле</h2>
        <div class="px-4 sm:px-0">
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Лунный модуль: </p>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Управляющий модуль:</p>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <ul>
            <li class="flex justify-between gap-x-6 py-5">
              <div class="flex gap-x-4">
                <p class="text-sm font-semibold text-gray-900">Нил Армстронг</p>
                <p class="mt-1 text-xs text-gray-500">Командир</p>
              </div>

            </li>
            <li class="flex justify-between gap-x-6 py-5">
              <div class="flex gap-x-4">
                <p class="text-sm font-semibold text-gray-900">Базз Олдрин</p>
                <p class="mt-1 text-xs text-gray-500">Пилот лунного модуля</p>
              </div>

            </li>
            <li class="flex justify-between gap-x-6 py-5">
              <div class="flex gap-x-4">
                <p class="text-sm font-semibold text-gray-900">Майкл Коллинз</p>
                <p class="mt-1 text-xs text-gray-500">Пилот командного модуля</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <a class="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600" href="">К списку миссий</a>
  </div>
</template>
