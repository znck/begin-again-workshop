import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { desc, uuid } from './utils'

Vue.use(Vuex)

const CREATE = 'CREATE'
const UPDATE = 'UPDATE'

function readFromLocalStorage(key, defaultValue) {
  const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/

  function reviver(key, value) {
    if (typeof value === 'string' && dateFormat.test(value)) {
      return new Date(value)
    }

    return value
  }
  
  const value = localStorage.getItem(key)

  if (!value) return defaultValue

  try {
    return JSON.parse(value, reviver)
  } catch (e) {
    localStorage.removeItem(key)
  }

  return defaultValue
}

const getters = {
  noteById: ({ notes }) => id => notes.find(it => it.id === id),
  notesSortedByLastUpdated: ({ notes }) => notes.slice().sort((a, b) => desc(a.updatedAt, b.updatedAt))
}

const state = () => ({
  notes: readFromLocalStorage('notebook', [])
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

store.subscribe((mutation, state) => {
  if (mutation.type === CREATE || mutation.type === UPDATE) {
    localStorage.setItem('notebook', JSON.stringify(state.notes))
  }
})

export default store
