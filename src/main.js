// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import BootstrapVue from 'bootstrap-vue'

import router from './router'
import store from './store'
import http from './http'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(http);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: new Vuex.Store(store),
  router,
  template: '<App/>',
  components: { App }
})
