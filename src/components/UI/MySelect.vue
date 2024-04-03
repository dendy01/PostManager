<template>
  <select v-model="props.modelValue" @change="changeOptions">
    <option disabled value="">Выберите из списка</option>
    <option v-for="oprion in props.options" :key="oprion.value" :value="oprion.value">{{ oprion.name }}</option>
  </select>
</template>

<script setup>
  import { ref, defineProps, defineEmits } from 'vue';

  const name = ref('my-select');
  const emit = defineEmits(['update:modelValue']);

  const props = defineProps(['modelValue', 'options']);

  const changeOptions = (event) => {
    emit('update:modelValue', event.target.value);
  };
</script>

<style scoped>

</style>