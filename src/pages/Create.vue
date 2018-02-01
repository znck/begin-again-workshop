<template>
  <MarkdownEditor class="create-page" v-model="body" :preview="showPreviewPane">
    <router-link :to="{ name: 'home' }">
        <BackIcon />
    </router-link>
    <input class="title" v-model="title" placeholder="Untitled" />
    <div role="button" @click="showPreviewPane = !showPreviewPane">
      <EditIcon v-if="showPreviewPane" />
      <PreviewIcon v-else />
    </div>
    <div role="button" @clic="save">
      <SaveIcon  />
    </div>

    <div>
      <span v-if="isSaving">Saving...</span>
      <span v-if="error" style="color: red">{{ error }}</span>
    </div>
  </MarkdownEditor>
</template>

<script>
import MarkdownEditor from '../components/MarkdownEditor.vue'
import * as Icons from '../components/Icon'

export default {
  name: 'CreatePage',
  data: () => ({
    title: '',
    body: '',
    error: null,
    showPreviewPane: true,
    isSaving: false
  }),
  components: {
    MarkdownEditor, 
    BackIcon: Icons.Back,
    SaveIcon: Icons.Save,
    EditIcon: Icons.Edit,
    PreviewIcon: Icons.Preview
  },
  methods: {
    async save() {
      this.isSaving = true
      try {
        // save it.
        this.error = null
      } catch (error) {
        this.error = error
      } finally {
        this.isSaving = false
      }
    }
  }
}
</script>

<style scoped>
.create-page >>> .title {
  background: transparent;
  border: none;
  color: #333;
  flex: 1;
  font-size: 24px;
  font-weight: bold;
}

.create-page >>> .title:focus {
  outline: none;
}
</style>
