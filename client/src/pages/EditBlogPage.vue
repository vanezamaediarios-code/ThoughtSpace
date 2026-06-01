<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api'
import { Notyf } from 'notyf'

const route = useRoute()
const router = useRouter()
const notyf = new Notyf()

const title = ref('')
const content = ref('')
const loading = ref(false)

function fetchBlog() {
  api.get(`/blogs/getBlogPost/${route.params.blogId}`)
    .then(res => {
      title.value = res.data.title
      content.value = res.data.content
    })
    .catch(() => {
      notyf.error('Failed to load post')
    })
}

function updateBlog() {
  loading.value = true

  api.patch(`/blogs/${route.params.blogId}/updateBlogPost`, {
    title: title.value,
    content: content.value
  })
  .then(() => {
    notyf.success('Post updated')
    router.push('/')
  })
  .catch(() => {
    notyf.error('Update failed')
  })
  .finally(() => {
    loading.value = false
  })
}

onBeforeMount(fetchBlog)
</script>

<template>
  <div class="container mt-5" style="max-width:600px">

    <h2>Edit Post</h2>

    <input
      v-model="title"
      class="form-control mb-3"
      placeholder="Title"
    />

    <textarea
      v-model="content"
      class="form-control mb-3"
      rows="6"
    ></textarea>

    <button
      class="btn btn-dark w-100"
      @click="updateBlog"
      :disabled="loading"
    >
      {{ loading ? 'Updating...' : 'Update Post' }}
    </button>

  </div>
</template>