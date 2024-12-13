<script setup>
import {useRouter} from "vue-router";
import {onMounted} from "vue";

const router = useRouter()

onMounted(async () => {
  await router.replace('/gagarin')
})
</script>

<template>
</template>
