<script setup>
import { onBeforeMount } from 'vue'
import NavbarComponent from './components/NavbarComponent.vue'
import { useGlobalStore } from './stores/global'

const store = useGlobalStore()

onBeforeMount(() => {
  const token = localStorage.getItem('token')
  if (token) {
    store.getUserDetails(token)
  }
})
</script>

<template>
  <NavbarComponent />
  <router-view />
</template>