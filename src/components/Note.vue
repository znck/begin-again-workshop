<template>
  <section class="note">
    <Markdown class="preview" :content="body" />
    <h2 class="title">{{ title }}</h2>
  </section>
</template>

<script>
import Markdown from './Markdown.vue'

export default {
  name: 'NotePreview',
  props: {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  components: { Markdown },
}
</script>

<style scoped>
.note {
  height: 320px;
  overflow: hidden;
  position: relative;
  margin: 16px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
}

.title {
  position: absolute;
  background: white;
  padding: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  text-align: center;
}

.preview {
  font-size: 8px;
  height: 100%;
  background: #f3f3f4;
}
</style>

