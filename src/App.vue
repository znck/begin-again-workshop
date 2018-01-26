<template>
  <div class="app">
    <Editor v-model="content" />
    <div class="sep" />
    <Markdown :content="content" />
  </div>
</template>


<script>
import Editor from './components/Editor.vue'
import Markdown from './components/Markdown.vue'
export default {
  name: 'MarkdownNotebook',
  components: { Editor, Markdown },
  data: () => ({
    content: ''
  })
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  height: 100%;
  font-size: 16px;
}
</style>


<style scoped>
.app {
  display: flex;
  flex-direction: row;
  min-height: 100%;
}

.app > * {
  flex: 1;
}

.sep {
  flex: 0;
  border: 1px solid #ccc;
  margin: 0 15px;
}
</style>
