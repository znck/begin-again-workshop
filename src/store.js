import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { desc, uuid } from './utils'

Vue.use(Vuex)

const CREATE = 'CREATE'
const UPDATE = 'UPDATE'

const getters = {
  noteById: ({ notes }) => id => notes.find(it => it.id === id),
  notesSortedByLastUpdated: ({ notes }) => notes.slice().sort((a, b) => desc(a.updatedAt, b.updatedAt))
}

const state = () => ({
  notes: []
})

const mutations = {
  [CREATE]: (state, note) => { state.notes.push(note) },
  [UPDATE]: (state, [old, note]) => { state.notes.splice(state.notes.indexOf(old), 1, note) }
}

const actions = {
  async save({ dispatch }, payload) {
    if (payload.id) return dispatch('update', payload)
    
    return dispatch('create', payload)
  },

  async create({ commit }, { title, body }) {
    const timestamp = new Date()
    const note = {
      id: uuid(),
      title,
      body,
      createdAt: timestamp,
      updatedAt: timestamp
    }

    commit(CREATE, note)

    return note
  },
  
  async update({ commit, getters }, { id, title, body }) {
    const note = getters.noteById(id)

    if (!note) throw Error('Cannot update non-existing note.')

    const payload = {
      ...note,
      id,
      title,
      body,
      updatedAt: new Date()
    }

    commit(UPDATE, [note, payload])

    return payload
  }
}

const store = new Store({
  getters,
  state,
  mutations,
  actions
})

export default store
