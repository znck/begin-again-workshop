<template>
  <div class="editor">
    <textarea class="input" placeholder="Start writing..." v-model="content" />
  </div>
</template>


<script>
export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    content: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>
.editor, .input {
  width: 100%;
}

.input {
  height: 100%;
  min-height: 300px;
  border: 0;
  font-family: monospace;
  font-size: 1rem;
  line-height: 1.5;
  resize: none;
}

.input:focus {
  outline: none;
}
</style>

