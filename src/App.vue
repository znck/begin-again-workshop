<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'MarkdownNotebook'
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  height: 100%;
  font-size: 16px;
}

 .app {
   height: 100%;
 }

 img {
   max-width: 100%;
 }
</style>
