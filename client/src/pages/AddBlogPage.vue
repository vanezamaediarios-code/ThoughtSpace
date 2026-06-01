<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'
import { Notyf } from 'notyf'
import { useGlobalStore } from '../stores/global'

const router = useRouter()
const notyf = new Notyf()
const store = useGlobalStore()

const title = ref('')
const content = ref('')

const isEnabled = ref(false)

watch([title, content], () => {
  isEnabled.value =
    title.value.trim() &&
    content.value.trim()
})

async function addBlog() {

  const token = store.user.token || localStorage.getItem('token')

  if (!token) {
    notyf.error('No token found')
    return
  }

  const payload = {
    title: title.value.trim(),
    content: content.value.trim()
  }

  try {
    await api.post('/blogs/addBlogPost', payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    notyf.success('Post created successfully')

    router.push('/')
  } 
  catch (err) {
    console.log('ERROR:', err.response?.data || err)
    notyf.error(err.response?.data?.error || 'Failed to create post')
  }
}
</script>

<template>
  <div class="container mt-5" style="max-width:600px">

    <h2>Create Post</h2>

    <input v-model="title" class="form-control mb-2" placeholder="Title" />

    <textarea
      v-model="content"
      class="form-control mb-3"
      placeholder="Write your thoughts..."
      rows="6"
    ></textarea>

    <button
      class="btn btn-dark w-100"
      :disabled="!isEnabled"
      @click="addBlog"
    >
      Publish
    </button>

  </div>
</template>