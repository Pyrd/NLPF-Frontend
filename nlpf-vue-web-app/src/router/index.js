import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import notFoundPage from '../views/NotFound.vue'
import { setPageTitleMiddleware, checkAccessMiddleware, initCurrentUserStateMiddleware } from './middlewares'
import GSignInButton from 'vue-google-signin-button'

Vue.use(VueRouter)
Vue.use(GSignInButton)

const base_title = "DVF App - "

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: base_title + "Map" },
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { isAuth: true, title: base_title + "Profile" },
    component: function () {
      return import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
    }
  },
  {
    path: '/favoris',
    name: 'Favoris',
    meta: { isAuth: true, title: base_title + "Favoris" },
    component: function () {
      return import(/* webpackChunkName: "favoris" */ '../views/Favoris.vue')
    }
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: base_title + "Connexion" },
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/Login.vue')
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    meta: { title: base_title + "Inscription" },
    component: function () {
      return import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
    }
  },
  {
    path: '/about',
    name: 'About',
    meta: { title: base_title + "A propos" },
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/dev',
    name: 'Dev',
    meta: { title: base_title + "Dev" },
    component: function () {
      return import(/* webpackChunkName: "dev" */ '../views/Dev.vue')
    }
  },
  {
    path: '*',
    meta: { title: base_title + "404" },
    component: notFoundPage,
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach(initCurrentUserStateMiddleware)
// router.beforeEach(checkAccessMiddleware)
router.beforeEach(setPageTitleMiddleware)

export default router




















