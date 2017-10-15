import axios from 'axios'
import createLogger from 'vuex/dist/logger'

export default {
  state: {
    username: "",
    token: "",
    role: "",
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
}

