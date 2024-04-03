<template>
  <div class="app">
    <div class="container">
      <Navbar></Navbar>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
  import Navbar from '@/components/Navbar.vue';
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .app {
    padding: 20px;

    .container {
      margin: 0 auto;
      width: 900px;
    }
  }
</style>
