<template>
  <div class="output" v-html="html" />
</template>


<script>
import marked from 'marked'
export default {
  name: 'Markdown',
  props: {
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    html() {
      return marked(this.content, { sanitize: true })
    }
  }
}
</script>

<style scoped>
.output {
  padding: 15px;
}
</style>

