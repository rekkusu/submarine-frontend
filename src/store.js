import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    token: "",
    role: "",
    notification: {
      type: "",
      message: "",
      show: false,
      immediately: true,
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token === '') {
        return
      }

      axios.get('/api/v1/me', {
        headers: {
          'Authorization': 'Bearer ' + state.token
        }
      }).then(resp => {
        state.username = resp.data.username;
        state.role = resp.data.role;
      }).catch(() => {
        state.token = "";
        state.username = "";
      });
    },
    setNotification(state, obj) {
      state.notification.type = obj.type;
      state.notification.message = obj.message;
      if (obj.immediately) {
        state.notification.show = true;
        state.notification.immediately = true;
      } else {
        state.notification.show = false;
        state.notification.immediately = false;
      }
    },
    showNotification(state) {
      state.notification.show = true;
      state.notification.immediately = true;
    },
    stepNotification(state) {
      if (state.notification.immediately == false) {
        state.notification.immediately = true;
        state.notification.show = true;
        return;
      }
      state.notification.type = "";
      state.notification.message = "";
      state.notification.show = false;
      state.notification.immediately = true;
    },
    logout(state) {
      state.token = '';
    }
  },
  plugins: [
    store => {
      // initialize
      const token = window.localStorage.getItem('token');
      if (token) {
        store.commit('setToken', token);
      }

      store.subscribe((mutation) => {
        // save
        if (mutation.type === 'setToken') {
          window.localStorage.setItem('token', mutation.payload);
        }

        // logout
        if (mutation.type === 'logout') {
          window.localStorage.removeItem('token');
        }
      });
    }
  ]
});
