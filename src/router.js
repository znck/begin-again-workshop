import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  { name: 'home', path: '/notes', component: () => import('./pages/Home.vue') },
  { name: 'create', path: '/notes/create', component: () => import('./pages/Create.vue') },
  { name: 'view', path: '/notes/:id', component: () => import('./pages/View.vue'), props: true },
  { name: 'edit', path: '/notes/:id/edit', component: () => import('./pages/Edit.vue'), props: true },
  { path: '/', redirect: '/notes' }
]

export default new Router({ mode: 'history', routes })
