<script>
import { mapGetters } from 'vuex'
import Create from './Create.vue'

export default {
  name: 'EditPage',
  extends: Create,

  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters(['noteById']),
    note() {
      return this.noteById(this.id)
    }
  },

  methods: {
    checkIfDirty() {
      return (this.note.title !== this.title || this.note.body !== this.body)
    },
    load() {
      const value = this.noteById(this.id)
      if (!value) {
        this.$router.push({ name: 'home' })
        return
      }
      
      this.title = value.title
      this.body = value.body
      this.isDirty = false
    }
  },

  created() {
    this.load()
  },

  watch: {
    note: 'load'
  }
}
</script>
