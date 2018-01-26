import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  { name: 'home', path: '/notes', component: () => import('./pages/Home.vue') },
  { name: 'create', path: '/notes/create', component: () => import('./pages/Create.vue') },
  { path: '/', redirect: '/notes' }
]

export default new Router({ mode: 'history', routes })
