<template>
  <div class="preloader-wrapper">
    <div class="preloader"></div>
  </div>
</template>

<style scoped>
.preloader-wrapper {
  display: flex;
  justify-content: center;
  padding: 50px 0;
}
.preloader {
  width: 50px;
  height: 50px;
  animation: preloader 1s infinite;
  border: 3px solid #0284c7;
  border-bottom: transparent;
  border-left: transparent;
  border-radius: 50%;
}
@keyframes preloader {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>