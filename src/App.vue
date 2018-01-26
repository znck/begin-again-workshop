<template>
  <div class="app">
    <Editor v-model="content" />
  </div>
</template>


<script>
import Editor from './components/Editor.vue'
export default {
  name: 'MarkdownNotebook',
  components: { Editor },
  data: () => ({
    content: ''
  })
}
</script>