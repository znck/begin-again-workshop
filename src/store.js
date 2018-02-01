import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'

import { db } from './firebase'
import { uuid, desc } from './utils'

Vue.use(Vuex)

const notesRef = db.ref('notes')

const getters = {
  noteById: ({ notes }) => id => notes.find(it => it.id === id),
  notesSortedByLastUpdated: ({ notes }) => notes.slice().sort((a, b) => desc(a.updatedAt, b.updatedAt))
}

const state = () => ({
  notes: []
})

const actions = {
  init: firebaseAction(({ bindFirebaseRef }) => bindFirebaseRef('notes', notesRef)),
    
  async save({ dispatch }, payload) {
    return await dispatch(payload.id ? 'update' : 'create', payload)
  },

  async create(_, { title, body }) {
    const newNoteRef = notesRef.push()
    const timestamp = Date.now()
    const payload = {
      id: uuid(),
      title,
      body,
      createdAt: timestamp,
      updatedAt: timestamp
    }

    await newNoteRef.set(payload)

    return payload
  },
  
  async update(_, item) {
    const note = getters.noteById(item.id)

    await notesRef.child(note['.key']).update({
      updatedAt: Date.now(),
      ...item
    })

    return note
  },

  async remove(_, item) {
    await notesRef.child(item['.key']).remove()
  }
}

const mutations = {
  ...firebaseMutations
}

export default new Store({
  getters,
  state,
  mutations,
  actions
})

