<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск..."></MyInput>
    <div class="app-btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions"></MySelect>
    </div>
    <MyDialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </MyDialog>
    <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading"/>
    <div v-else>
      Идёт загрузка...
    </div>
    <div v-intersection="loadMorePost"></div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed, watch } from 'vue';
  import PostList from '@/components/PostList.vue';
  import PostForm from '@/components/PostForm.vue';
  import { usePosts } from '@/hooks/usePosts.js';
  import useSortedPosts from'@/hooks/useSortedPosts.js';
  import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts.js";

  const dialogVisible = ref(false);
  const sortOptions = ref([
    {value: 'title', name: 'По названию'},
    {value: 'body', name: 'По описанию'}
  ]);

  const { posts, isPostsLoading, totalPages }  = usePosts(10);
  const { sortedPosts, selectedSort } = useSortedPosts(posts);
  const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts)

</script>

<style lang="scss">
  .app-btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }
</style>