<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar-btns">
      <MyButton @click="$router.push('/posts')">Посты</MyButton>
      <MyButton style="margin-left: 20px;" @click="$router.push('/about')">О сайте</MyButton>
      <MyButton style="margin-left: 20px;" @click="$router.push('/composition')">Composition</MyButton>
      <!-- <MyButton style="margin-left: 20px;" @click="$router.push('/store')">Store</MyButton> -->
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
  .navbar {
    height: 50px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
  }

  .navbar-btns {
    margin-left: auto;
  }
</style>