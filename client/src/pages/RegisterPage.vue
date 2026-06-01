<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'

const router = useRouter()
const notyf = new Notyf()

const username = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

const register = async () => {
  if (!username.value || !email.value || !password.value) {
    notyf.error('All fields are required')
    return
  }

  loading.value = true

  try {
    const res = await api.post('/users/register', {
      username: username.value,
      email: email.value,
      password: password.value
    })

    notyf.success(res.data.message)

    router.push('/login')
  } catch (err) {
    notyf.error('Registration failed')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">

      <h2 class="title">Register</h2>

      <input v-model="username" type="text" placeholder="Username" class="input" />
      <input v-model="email" type="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Password" class="input" />

      <button class="btn" @click="register" :disabled="loading">
        {{ loading ? 'Creating...' : 'Register' }}
      </button>

      <p class="link">
        Already have account?
        <router-link to="/login">Login</router-link>
      </p>

    </div>
  </div>
</template>

<style>
.auth-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  /* same warm light brown background as login */
  background: #e7d7c9;

  padding: 20px;
}

.auth-card {
  width: 360px;

  background: #242424;
  padding: 32px;

  border-radius: 14px;
  border: 1px solid #3a3a3a;

  text-align: center;

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
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

.link {
  margin-top: 15px;
  color: #b5b5b5;
  font-size: 14px;
}

.link a {
  color: #a88355;
  text-decoration: none;
}

.link a:hover {
  text-decoration: underline;
}
</style>