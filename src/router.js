import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  { name: 'home', path: '/notes', component: () => import('./pages/Home.vue'), meta: { needsAuth: true }  },
  { name: 'create', path: '/notes/create', component: () => import('./pages/Create.vue'), meta: { needsAuth: true }  },
  { name: 'view', path: '/notes/:id', component: () => import('./pages/View.vue'), props: true, meta: { needsAuth: true }  },
  { name: 'edit', path: '/notes/:id/edit', component: () => import('./pages/Edit.vue'), props: true, meta: { needsAuth: true }  },
  { path: '/', redirect: '/notes', meta: { needsAuth: true }  },
  { name: 'login', path: '/login', component: () => import('./pages/Login.vue') }
]

export default new Router({ mode: 'history', routes })
