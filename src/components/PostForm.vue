<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <MyInput v-focus v-model="post.title" placeholder="Название"/>
    <MyInput v-model="post.body" placeholder="Описание"/>
    <MyButton @click="createPost" style="align-self: flex-end; margin-top: 15px;">Создать</MyButton>
  </form>
</template>

<script setup>
  import { ref, defineEmits } from 'vue';

  const emit = defineEmits(['create']);

  const post = ref({
    title: '',
    body: '',
  });

  const createPost = () => {
    post.value.id = Date.now();
    emit('create', post.value);
    post.value = {
      title: '',
      body: '',
    };
  };
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
  }
</style>