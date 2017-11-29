// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'

import router from './router'
import store from './store'
import http from './http'
import moment from 'vue-moment'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(http);
Vue.use(moment);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  template: '<App/>',
  components: { App }
});
