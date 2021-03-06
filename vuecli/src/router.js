import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Home
      // function () { 
      //   return import( /* webpackChunkName: "login" */ './views/Login.vue')
      // }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    
  ]
})