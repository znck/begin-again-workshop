import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.needsAuth) && !auth.currentUser) {
    return next({ name: 'login' })
  } else {
    return next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
