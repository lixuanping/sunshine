import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/index',
    //   name: 'index',
    //   component: Index,
    //   meta:{
    //     auth:true,
    //   }
    // },
    {
      path: '/',
      name: 'word',
      component: () => import('../word/index.vue'),
      // meta:{
      //   auth:true,
      // }
    },
  ]
})
