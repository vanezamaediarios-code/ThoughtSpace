<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api'
import { useGlobalStore } from '../stores/global'
import { Notyf } from 'notyf'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const store = useGlobalStore()
const notyf = new Notyf()

const post = ref(null)
const comment = ref('')
const loading = ref(false)

const isAdmin = computed(() => store.user.isAdmin === true)
const isLoggedIn = () => !!store.user.token

const isOwner = (blog) => {
  return String(blog.userId) === String(store.user.id)
}

function fetchPost() {
  api.get(`/blogs/getBlogPost/${route.params.blogId}`)
    .then(res => {
      post.value = res.data
    })
    .catch(() => {
      notyf.error('Failed to load post')
    })
}

function submitComment() {
  if (!comment.value.trim()) return

  loading.value = true

  api.post('/blogs/addComment', {
    blogId: route.params.blogId,
    comment: comment.value
  })
  .then(() => {
    notyf.success('Comment added')
    comment.value = ''
    fetchPost()
  })
  .catch(() => {
    notyf.error('Login required')
  })
  .finally(() => {
    loading.value = false
  })
}

function deletePost() {
  api.delete(`/blogs/${route.params.blogId}`, {
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
  .then(() => {
    notyf.success('Post deleted')
    router.push('/')
  })
  .catch(() => {
    notyf.error('Delete failed')
  })
}

onBeforeMount(fetchPost)

console.log('ADMIN VALUE:', store.user.isAdmin)
</script>

<template>
  <div class="container mt-4" v-if="post">

    <h2>{{ post.title }}</h2>
    <small class="text-muted">By {{ post.author }}</small>

    <p class="mt-3">{{ post.content }}</p>

    <hr />

    <h5>Comments</h5>

    <div v-if="post.comments.length === 0" class="text-muted">
      No comments yet
    </div>

    <div v-for="comment in post.comments" class="border p-2 mb-2">
      {{ comment.comment }}
    </div>

    <hr />

    <div v-if="isLoggedIn()">

      <textarea
        v-model="comment"
        class="form-control"
        placeholder="Write a comment..."
      ></textarea>

      <button
        class="btn btn-primary mt-2"
        @click="submitComment"
        :disabled="loading"
      >
        {{ loading ? 'Posting...' : 'Add Comment' }}
      </button>

    </div>

    <button
      v-if="isAdmin"
      class="btn btn-danger mt-3"
      @click="deletePost"
    >
      Delete Post
    </button>

  </div>
</template>