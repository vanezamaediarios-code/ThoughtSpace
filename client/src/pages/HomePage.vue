<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import api from '../api'
import { Notyf } from 'notyf'
import { useGlobalStore } from '../stores/global'

const notyf = new Notyf()
const store = useGlobalStore()

const blogs = ref([])
const loadingId = ref(null)

const isAdmin = computed(() => store.user.isAdmin === true)

const canEdit = (blog) => {
  return blog.author === store.user.username
}

function authHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  }
}

function fetchBlogs() {
  api.get('/blogs/getBlogs')
    .then(res => {
      blogs.value = res.data
    })
    .catch(() => {
      notyf.error('Failed to load posts')
    })
}

function deleteBlog(id) {
  loadingId.value = id

  api.delete(`/blogs/${id}/deleteBlogPost`, authHeaders())
    .then(() => {
      blogs.value = blogs.value.filter(blog => blog._id !== id)
      notyf.success('Post deleted')
    })
    .catch(() => {
      notyf.error('Delete failed')
    })
    .finally(() => {
      loadingId.value = null
    })
}

onBeforeMount(() => {
  fetchBlogs()
})
</script>

<template>
  <div class="container mt-4">

    <div class="hero">
      <h1>"Your thoughts deserve a space."</h1>
      <p>A simple place for your thoughts and stories.</p>
    </div>

    <div class="row g-3">

      <div
        v-for="blog in blogs"
        :key="blog._id"
        class="col-md-4"
      >

        <div class="card h-100">

          <div class="card-body">

            <h5>{{ blog.title }}</h5>

            <p class="text-muted">
              {{ blog.content.substring(0, 80) }}...
            </p>

            <small>by {{ blog.author }}</small>

            <div class="d-flex gap-2 mt-3">

              <router-link
                :to="`/blog/${blog._id}`"
                class="btn btn-primary btn-sm w-100"
              >
                Read More
              </router-link>

              <!-- <button
                v-if="canEdit(blog)"
                class="btn btn-warning btn-sm w-100"
              >
                Edit
              </button> -->
              <router-link
                v-if="canEdit(blog)"
                :to="`/edit-blog/${blog._id}`"
                class="btn btn-warning btn-sm w-100"
              >
                Edit
              </router-link>

              <button
                v-if="isAdmin"
                class="btn btn-danger btn-sm w-100"
                @click="deleteBlog(blog._id)"
                :disabled="loadingId === blog._id"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<style>
.hero {
  text-align: center;
  padding: 80px 20px;
}

.hero h1 {
  color: #4f3b2c;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.hero p {
  color: #6b5646;
  font-size: 1.1rem;
}
</style>