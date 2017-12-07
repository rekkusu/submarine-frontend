import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Announcement from '@/components/Announcement'
import Challenges from '@/components/Challenges'
import Scoreboard from '@/components/Scoreboard'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Admin from '@/components/Admin'
import AdminChallenges from '@/components/admin/Challenges'
import AdminCategories from '@/components/admin/Categories'
import AdminGeneral from '@/components/admin/General'
import AdminAnnouncements from '@/components/admin/Announcements'
import ChallengeEdit from '@/components/admin/ChallengeEdit'
import Status from '@/components/admin/Status'
import store from '@/store.js'

Vue.use(Router);

const router = new Router({
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
      path: '/announcements/:id',
      name: 'announcement',
      component: Announcement
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
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
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        admin: true,
      },
      children: [
        {
          path: 'challenges',
          name: 'admin_challenges',
          component: AdminChallenges
        },
        {
          path: 'challenges/:id',
          name: 'edit_challenge',
          component: ChallengeEdit
        },
        {
          path: 'general',
          name: 'general',
          component: AdminGeneral
        },
        {
          path: 'categories',
          name: 'categories',
          component: AdminCategories
        },
        {
          path: 'announcements',
          name: 'announcements',
          component: AdminAnnouncements
        },
        {
          path: 'status',
          name: 'status',
          component: Status
        },
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.admin || to.matched.some(record => record.meta.admin)) {
    if (store.state.role !== 'admin') {
      next({path: '/'});
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach(function() {
  store.commit('stepNotification');
});


export default router;
