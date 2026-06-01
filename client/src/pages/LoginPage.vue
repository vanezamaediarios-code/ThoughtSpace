<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'
import { useGlobalStore } from '../stores/global'

const router = useRouter()
const notyf = new Notyf()
const store = useGlobalStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

const login = () => {
  if (!email.value || !password.value) {
    notyf.error('All fields are required')
    return
  }

  loading.value = true

  api.post('/users/login', {
    email: email.value,
    password: password.value
  })
  .then(async (res) => {

    const token = res.data.access

    localStorage.setItem('token', token)

    notyf.success('Login successful')

    await store.getUserDetails(token)

    router.push('/')
  })
  .catch(err => {
    console.log(err)
    notyf.error('Invalid credentials')
  })
  .finally(() => {
    loading.value = false
  })
}
</script>

<template>
  <div class="login-wrapper">

    <div class="login-card">

      <h1 class="title">Login</h1>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="input"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="input"
      />

      <button
        class="btn"
        @click="login"
        :disabled="loading"
      >
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <p class="text">
        No account?
        <router-link to="/register">Register</router-link>
      </p>

    </div>

  </div>
</template>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  /* light brown / warm beige background */
  background: #e7d7c9;

  padding: 20px;
}

.login-card {
  width: 360px;

  background: #242424;
  padding: 32px;

  border-radius: 14px;
  border: 1px solid #3a3a3a;

  text-align: center;

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

.title {
  color: #f2f2f2;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 600;
}

.input {
  width: 100%;
  padding: 12px;

  margin-bottom: 12px;

  border-radius: 10px;
  border: 1px solid #444;

  background: #2e2e2e;
  color: #f5f5f5;

  outline: none;

  transition: 0.2s ease;
}

.input::placeholder {
  color: #9a9a9a;
}

.input:focus {
  border-color: #8b6f47;
  box-shadow: 0 0 0 2px rgba(139, 111, 71, 0.25);
}

.btn {
  width: 100%;
  padding: 12px;

  border: none;
  border-radius: 10px;

  background: #7a5c3a;
  color: white;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s ease;
}

.btn:hover {
  background: #6a4e31;
}

.btn:disabled {
  background: #555;
  cursor: not-allowed;
}

.text {
  margin-top: 15px;
  font-size: 14px;
  color: #b5b5b5;
}

.text a {
  color: #a88355;
  text-decoration: none;
}

.text a:hover {
  text-decoration: underline;
}
</style>