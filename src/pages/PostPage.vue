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
      <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading"/>
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
  import axios from 'axios';

  const observerVal = ref(null);
  const page = ref(1);
  const limit = ref(10);
  const totalPages = ref(0);
  const dialogVisible = ref(false);
  const isPostLoading = ref(false);
  const selectedSort = ref('');
  const searchQuery = ref('');
  const sortOptions = ref([
    {value: 'title', name: 'По названию'},
    {value: 'body', name: 'По описанию'}
  ]);

  const posts = ref([]);

  const showDialog = () => {
    dialogVisible.value = true;
  };

  const createPost = (post) => {
    posts.value.push(post);
    dialogVisible.value = false;
  };

  const removePost = (post) => {
    posts.value = posts.value.filter((p) => p.id !== post.id);
  };

  async function fetchPosts() {
    try {
      isPostLoading.value = true;
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: page.value,
          _limit: limit.value
        }
      });
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value);
      posts.value = response.data;
    } catch (error) {
      alert('Error!');
    } finally {
      isPostLoading.value = false;
    }
  }

  async function loadMorePost() {
    try {
      page.value += 1;
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: page.value,
          _limit: limit.value
        }
      });
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value);
      posts.value = [...posts.value, ...response.data];
    } catch (error) {
      alert('Error!');
    }
  }

  const sortedPost = computed(() => {
    return [...posts.value].sort((post1, post2) => {
      return post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]);
    });
  });

  const sortedAndSearchedPosts = computed(() => {
    return sortedPost.value.filter((post) => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
  });

  onMounted(() => {
    fetchPosts();
  });
</script>

<style lang="scss">
  $message: red;

  .app-btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }
</style>