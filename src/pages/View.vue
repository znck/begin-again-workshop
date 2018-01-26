<template>
  <section class="note" v-if="note">
    <header class="header">
      <router-link :to="{ name: 'home' }">
        <BackIcon />
      </router-link>
      <h1 class="title">{{ note.title }}</h1>
      <router-link :to="{ name: 'edit', params: { id } }">
        <EditIcon />
      </router-link>
    </header>
    <article class="main">
      <Markdown class="preview" :content="note.body" />
    </article>
    <footer class="footer">
      <small>Created: {{ note.createdAt.toDateString() }} {{ note.createdAt.toTimeString() }}</small>
      <small style="text-align: right">Last Updated: {{ note.createdAt.toDateString() }} {{ note.createdAt.toTimeString() }}</small>
    </footer>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Markdown from '../components/Markdown.vue'
import * as Icons from '../components/Icon'

export default {
  name: 'CreatePage',

  props: {
    id: {
      type: String,
      required: true
    }
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (!vm.note) vm.$router.replace({ name: 'home' })
    })
  },

  computed: {
    ...mapGetters(['noteById']),
    note() {
      return this.noteById(this.id)
    }
  },
  
  components: {
    Markdown, 
    BackIcon: Icons.Back,
    EditIcon: Icons.Edit
  },
}
</script>

<style scoped>
.note {
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

.footer {
  display: flex;
}
.footer > * {
  flex: 1;
}

.main, .editor, .preview, .meta {
  flex: 1;
}

.title {
  margin: 0;
  padding: 0;
  color: #333;
  flex: 1;
  font-size: 24px;
  font-weight: bold;
}

</style>
