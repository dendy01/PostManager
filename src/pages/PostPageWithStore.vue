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
  import axios from 'axios';
  import MyButton from '@/components/UI/MyButton.vue';
  import { useStore } from 'vuex'
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  const dialogVisible = ref(false);
  const store = useStore();

  const posts = computed(() => store.state.post.posts);
  const isPostsLoading = computed(() => store.state.post.isPostsLoading);
  const selectedSort = computed(() => store.state.post.selectedSort);
  const searchQuery = computed(() => store.state.post.searchQuery);
  const page = computed(() => store.state.post.page);
  const limit = computed(() => store.state.post.limit);
  const totalPages = computed(() => store.state.post.totalPages);
  const sortOptions = computed(() => store.state.post.sortOptions);

  function fetchPosts() {
    store.commit('fetchPosts');
  };

  // watch(posts, () => {
  //   mapMutations({
  //     setPage: 'post/setPage',
  //     setSearchQuery: 'post/setSearchQuery',
  //     setSelectedSort: 'post/setSelectedSort',
  //   }),

  //   mapActions({
  //     loadMorePosts: 'post/loadMorePosts',
  //     fetchPosts: 'post/fetchPosts'
  //   }),

  //   mapGetters({
  //     sortedPosts: 'post/sortedPosts',
  //     sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
  //   })
  // });

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

  onMounted(fetchPosts);
</script>

<style>
.app-btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
</style>