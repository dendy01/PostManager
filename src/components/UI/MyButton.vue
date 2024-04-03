<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script setup>
  import { ref } from 'vue';

  const name = ref('my-button');
</script>

<style>
  .btn {
    padding: 10px 15px;
    background: none;
    border: 2px solid teal;
    color: teal;
  }
</style>