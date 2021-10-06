import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: function () {
      return import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
    }
  },
  {
    path: '/favoris',
    name: 'Favoris',
    component: function () {
      return import(/* webpackChunkName: "favoris" */ '../views/Favoris.vue')
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/Login.vue')
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: function () {
      return import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
    }
  },
  {
    path: '/about',
    name: 'About',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/dev',
    name: 'Dev',
    component: function () {
      return import(/* webpackChunkName: "dev" */ '../views/Dev.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
