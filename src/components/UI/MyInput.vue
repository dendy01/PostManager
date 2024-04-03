<template>
  <input :value="props.modelValue" @input="updateInput" class="input" type="text">
</template>

<script setup>
  import { ref, defineProps, defineEmits } from 'vue';

  const name = ref('my-input');

  const props = defineProps({
    modelValue: [String, Number]
  });
  const emit = defineEmits(['update:modelValue']);

  const updateInput = (event) => {
    emit('update:modelValue', event.target.value);
  }
</script>

<style scoped>
  .input {
    width: 100%;
    padding: 10px 15px;
    border: 2px solid teal;
    margin-top: 15px;
  }
</style>