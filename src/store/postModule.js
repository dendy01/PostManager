import axios from "axios";

const postModule = {
  state: () => ({
    posts : [],
    page: 1,
    limit: 10,
    totalPages: 0,
    isPostLoading: false,
    selectedSort: '',
    searchQuery: '',
    sortOptions: [
      {value: 'title', name: 'По названию'},
      {value: 'body', name: 'По описанию'}
    ]
  }),
  getters: {
    sortedPost(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]);
      });
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPost.filter((post) => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.ports = posts;
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({state, commit}) {
      try {
        commit('setLoading', true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        });
        commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', response.data);
      } catch (error) {
        alert('Error!');
      } finally {
        commit('setLoading', false);
      }
    },
    
    async loadMorePosts({state, commit}) {
      try {
        commit('setPage', state.page + 1);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        });
        commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (error) {
        alert('Error!');
      }
    }
  },
  namespaced: true,
};

export default postModule;