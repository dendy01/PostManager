<template>
  <div class="dialog" v-if="props.show" @click="hideDialog">
    <div class="div dialog-content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineProps, defineEmits } from 'vue';

  const name = ref('my-dialog');
  const emit = defineEmits(['update:show']);
  const props = defineProps({
    show: Boolean
  });

  const hideDialog = () => {
    emit('update:show', false);
  }
</script>

<style scoped>
  .dialog {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;

    .dialog-content {
      margin: auto;
      background: white;
      border-radius: 12px;
      padding: 20px;
      min-height: 50px;
      min-width: 300px;
    }
  }
</style>