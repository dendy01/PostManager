<template>
  <div v-if="props.posts">
    <h2 v-if="props.posts.length === 0" style="color: red;">Список постов пуст</h2>
    <h2 v-else>Кол-во постов: {{ props.posts.length }}</h2>
    <transition-group name="post-list">
      <post-item v-for="post in props.posts" :key="post.id" :post="post" @remove="$emit('remove', post)"/>
    </transition-group>
  </div>
</template>

<script setup>
  import { defineProps, ref } from 'vue';
  import PostItem from './PostItem.vue';

  const props = defineProps({
    posts: Array,
  });

  console.log(props.posts);

</script>

<style scoped>
  .post-list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .post-list-enter-active,
  .post-list-leave-active {
    transition: all 0.4s ease;
  }
  .post-list-enter-from,
  .post-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
  }
  .post-list-move {
    transition: transform 0.8s ease;
  }
</style>