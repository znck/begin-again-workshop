<template>
  <div class="markdown-editor">
    <header class="header">
      <slot></slot>
    </header>
    <main class="main">
      <Editor class="editor" v-model="content" />
      <div v-if="preview" class="sep" />
      <transition name="slide-in">
        <Markdown v-if="preview" class="preview" :content="content" />
      </transition>
    </main>
    <footer class="footer">
      <div class="stats">
        Characters: {{stats.chars}}
        Words: {{stats.words}}
      </div>

      <div class="meta">
        <slot name="meta"></slot>
      </div>
    </footer>
  </div>
</template>


<script>
import Editor from './Editor.vue'
import Markdown from './Markdown.vue'

export default {
  name: 'MarkdownEditor',
  props: {
    preview: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      required: true
    }
  },
  components: { Editor, Markdown },
  computed: {
    content: {
      get() { return this.value || '' },
      set(value) { return this.$emit('input', value) }
    },
    stats() {
      return {
        chars: this.content.length,
        words: this.content.split(/[\r\n\s#.]+/).length
      }
    }
  }
}
</script>

<style scoped>
.markdown-editor {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.header, .footer {
  background: #efefef;
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.main {
  display: flex;
  flex-direction: row;
}

.main, .editor, .preview, .meta {
  flex: 1;
}

.editor {
  padding: 16px;
}

.sep {
  border: 1px solid #efefef;
}

/* Slide in animation */
.slide-in-enter-active, .slide-in-leave-active {
  transition: transform .5s;
  transform: translateX(0)
}
.slide-in-enter, .slide-in-leave-to {
  transform: translateX(100%)
}
</style>
