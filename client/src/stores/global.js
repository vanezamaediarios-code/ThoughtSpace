import { defineStore } from 'pinia'
import { reactive } from 'vue'
import api from '../api'

export const useGlobalStore = defineStore('global', () => {

  const user = reactive({
    token: localStorage.getItem('token'),
    id: null,
    email: null,
    username: null,
    isAdmin: false
  })

  async function getUserDetails(token) {

    if (!token) {
      user.token = null
      user.id = null
      user.email = null
      user.username = null
      user.isAdmin = false
      return
    }

    try {

      const res = await api.get('/users/details', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const userData = res.data.user

      user.token = token
      user.id = userData?._id || null
      user.email = userData?.email || null
      user.username = userData?.username || null
      user.isAdmin = userData?.isAdmin === true


    } catch (error) {
      console.error('FAILED TO GET USER DETAILS:', error)
      getUserDetails(null)
    }
  }

  return {
    user,
    getUserDetails
  }
})