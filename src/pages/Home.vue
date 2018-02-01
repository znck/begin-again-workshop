<template>
  <div class="homepage">
    <header class="header">
      <h1>Markdown Notebook</h1>
      <router-link tag="button" class="button" :to="{ name: 'create' }">Add New Note</router-link>
      <button class="button logout" @click.prevent="logout">Logout</button>
    </header>
    <main class="notes">
      <Note v-for="note in notes" 
        class="note"
        :key="note.id" 
        :title="note.title" 
        :body="note.body" 
        @click.native="$router.push({ name: 'view', params: { id: note.id }})"
      />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Note from '../components/Note.vue'
import { auth } from '../firebase'


export default {
  name: 'HomePage',

  computed: {
    ...mapGetters({ notes: 'notesSortedByLastUpdated' })
  },

  components: { Note },

  methods: {
    async logout () {
      await auth.signOut()
      
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
}

.header {
  dislay: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
}

.button {
  font-size: 1rem;
  padding: .5rem 1.5rem;
  background: #768;
  color: #fff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.logout {
  background: #aaa;
}

.notes {
  flex: 1;
  padding: 45px;
  flex-wrap: wrap;
}

.note {
  cursor: pointer;
  width: 320px;
  display: inline-block;
}
</style>

