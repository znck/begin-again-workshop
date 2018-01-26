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
    <div role="button" @click="save">
      <SaveIcon  />
    </div>

    <div slot="meta" class="status">
      <span v-if="isSaving">Saving...</span>
      <span v-if="error" style="color: red">{{ error }}</span>
    </div>
  </MarkdownEditor>
</template>

<script>
import { mapActions } from 'vuex'
import MarkdownEditor from '../components/MarkdownEditor.vue'
import * as Icons from '../components/Icon'

export default {
  name: 'CreatePage',
  async beforeRouteLeave(from, to, next) {
    if (!this.isDirty) return next()
    const answer = window.confirm('Do you really want to leave? You have unsaved changes!')
    if (answer) {
      await this.save()
      next()
    } else {
      next(false)
    }
  },
  created() {
    this.$on('saved', (note) => {
      this.isDirty = false
      this.$router.push({ name: 'view', params: { id: note.id } })
    })
  },
  data: () => ({
    title: '',
    body: '',
    error: null,
    showPreviewPane: true,
    isSaving: false,
    isDirty: false
  }),
  components: {
    MarkdownEditor, 
    BackIcon: Icons.Back,
    SaveIcon: Icons.Save,
    EditIcon: Icons.Edit,
    PreviewIcon: Icons.Preview
  },
  methods: {
    ...mapActions({ send: 'save' }),
    markDirty() {
      if (typeof this.checkIfDirty === 'function' && this.checkIfDirty() === false)  return;
      
      this.isDirty = true
    },
    async save() {
      this.isSaving = true
      try {
        if (!this.title || !this.title.trim()) throw new Error('Cannot save without title.')
        const payload = { id: this.$route.params.id, title: this.title, body: this.body }
        const note = await this.send(payload)
        this.$emit('saved', note)
        this.error = null
      } catch (error) {
        this.error = (error && 'message' in error) ? error.message : `${error}`
      } finally {
        this.isSaving = false
      }
    }
  },
  watch: {
    body: 'markDirty',
    title: 'markDirty'
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

.create-page >>> .status {
  flex: 1;
  text-align: right;
}
</style>
