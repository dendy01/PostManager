<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <div class="post-btns">
      <MyButton @click="$router.push(`/posts/${ post.id }`)" style="margin-right: 15px;">Открыть</MyButton>
      <MyButton @click="$emit('remove', post)">Удалить</MyButton>
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';

  defineProps(['post']);
</script>

<style>
  .post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .post-btns {
    display: flex;
  }
</style>