import axios from 'axios'

function getAxios(vue) {
  const headers = {};
  if (vue.$store.state.token) {
    headers['Authorization'] = 'Bearer ' + vue.$store.state.token;
  }

  const http = axios.create({
    headers: headers,
  });

  // handler for users not logged in
  http.interceptors.response.use(response => {
    return response;
  }, e => {
    if (e.response.status == 401) {
      vue.$router.push({'name': 'login'});
    }
    return Promise.reject(e);
  });

  return http;
}

export default (Vue) => {
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return getAxios(this);
      }
    }
  })
}
