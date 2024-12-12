<script setup>
defineProps(['errors'])
</script>

<template>
  <div class="invalid-feedback" v-if="errors">
    {{ errors.join(', ') }}
  </div>
</template>

<style>
.invalid-feedback {
  color: brown;
  margin-top: 5px;
}
.is-invalid {
  border: 1px solid brown;
}
</style>
