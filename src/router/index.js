import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Challenges from '@/components/Challenges'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/challenges',
      name: 'challenges',
      component: Challenges
    }
  ]
})
