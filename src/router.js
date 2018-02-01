import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  { name: 'create', path: '/notes/create', component: () => import('./pages/Create.vue') },
]

export default new Router({ mode: 'history', routes })
