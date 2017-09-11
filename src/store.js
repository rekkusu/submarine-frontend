import axios from 'axios'

export default {
  modules: {
    account: {
      state: {
        username: "",
        token: ""
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
          });
        }
      }
    }
  }
}
