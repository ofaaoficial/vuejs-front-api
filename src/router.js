import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Regiones from './views/Regiones.vue'
import Platos from './views/Platos.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/regiones',
      name: 'regiones',
      component: Regiones
    },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/platos',
      name: 'platos',
      component: Platos
    },
    /*
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" /* './views/About.vue')
  },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Home
    }*/
  ]
})
