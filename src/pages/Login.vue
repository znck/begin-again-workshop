<template>
  <div class="login-page">
    <div>
      <h1>Markdown Notebook</h1>
      <button class="login" @click.prevent="login">Login</button>

      <div class="error" v-if="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import { auth, authProvider } from '../firebase'

export default {
  data: () => ({ error: null }),

  beforeRouteEnter: (to, from, next) => {
    if (auth.currentUser) next({ path: '/' })
    else next()
  },

  methods: {
    async login () {
      try {
        await auth.signInWithPopup(authProvider)
        
        this.$router.push({ path: '/' })
      } catch (error) {
        this.error = error.message
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
}

.login {
  background: #768;
  border: transparent;
  border-radius: 4px;
  color: white;
  font-size: 1.5rem;
  padding: 8px 32px;
  cursor: pointer;
}

.error {
  margin: 8px 16px;
  color: red;
}
</style>

