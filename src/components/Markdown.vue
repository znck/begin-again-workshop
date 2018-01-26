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
      const content = this.content.replace(/:([a-z+-][^:\s]+):/gi, (_, it) => 
      ` ![${it} emoji](https://raw.githubusercontent.com/WebpageFX/emoji-cheat-sheet.com/master/public/graphics/emojis/${it}.png)`)

      return marked(content, { sanitize: true, gfm: true, emoji: true })
    }
  }
}
</script>

<style scoped>
.output {
  padding: 15px;
}
</style>

<style>
img[alt$="emoji"] {
  height: 1em;
  width: auto;
  display: inline-block;
}
</style>

