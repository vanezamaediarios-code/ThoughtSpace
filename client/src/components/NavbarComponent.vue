<script setup>
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../stores/global.js'

const router = useRouter()
const store = useGlobalStore()

function logout() {
  localStorage.removeItem('token')

  store.user.token = null
  store.user.id = null
  store.user.email = null
  store.user.isAdmin = null

  router.push('/login')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">



      <router-link to="/" class="navbar-brand">
        ThoughtSpace
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#nav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="nav">

        <div class="navbar-nav ms-auto">

          <template v-if="store.user.token">

            <router-link
              to="/add-blog"
              class="nav-link"
            >
              Create Post
            </router-link>

            <a
              href="#"
              class="nav-link"
              @click.prevent="logout"
            >
              Logout
            </a>

          </template>

          <template v-else>

            <router-link
              to="/register"
              class="nav-link"
            >
              Register
            </router-link>

            <router-link
              to="/login"
              class="nav-link"
            >
              Login
            </router-link>

          </template>

        </div>

      </div>

    </div>
  </nav>
</template>