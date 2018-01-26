import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { desc, uuid } from './utils'

Vue.use(Vuex)

const getters = {
  notesSortedByLastUpdated: ({ notes }) => notes.slice().sort((a, b) => desc(a.updatedAt, b.updatedAt))
}

const state = () => ({
  notes: []
})

const mutations = {}

const actions = {}

const store = new Store({
  getters,
  state,
  mutations,
  actions
})

export default store
