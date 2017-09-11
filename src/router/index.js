import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Challenges from '@/components/Challenges'
import Scoreboard from '@/components/Scoreboard'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/challenges',
      name: 'challenges',
      component: Challenges
    },
    {
      path: '/scoreboard',
      name: 'scoreboard',
      component: Scoreboard
    }
  ]
})
