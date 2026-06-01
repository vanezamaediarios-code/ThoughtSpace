import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'notyf/notyf.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import AddBlogPage from './pages/AddBlogPage.vue'
import BlogDetails from './pages/BlogDetails.vue'
import EditBlogPage from './pages/EditBlogPage.vue'
import ErrorPage from './pages/ErrorPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [

    {
      path: '/',
      name: 'Home',
      component: HomePage
    },

    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },

    {
      path: '/register',
      name: 'Register',
      component: RegisterPage
    },

    {
      path: '/add-blog',
      name: 'AddBlog',
      component: AddBlogPage
    },

    {
      path: '/blog/:blogId',
      name: 'BlogDetails',
      component: BlogDetails
    },

    {
      path: '/edit-blog/:blogId',
      name: 'EditBlog',
      component: EditBlogPage
    },

    {
      path: '/:catchAll(.*)*',
      component: ErrorPage
    }

  ]
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')