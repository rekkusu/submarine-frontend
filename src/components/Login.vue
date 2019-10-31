<template>
  <div class="container mt-2">
    <b-modal
      v-model="modal"
      centered
      title="Login"
      no-close-on-esc
      hide-header-close
      no-close-on-backdrop
      hideFooter
      okOnly
      okTitle="Login"
    >
    <form class="col" v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <label for="username" class="form-control-label ">Username</label>
        <input type="text" class="form-control" id="username" v-model="username">
      </div>
      <div class="form-group">
        <label for="password" class="form-control-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    onSubmit() {
      this.$http.post('/api/v1/users/signin', {
        username: this.username,
        password: this.password
      }).then(resp => {
        this.$store.commit('setToken', resp.data.token);
        this.$store.commit('setNotification', {
          type: 'success',
          message: 'Login Successful',
          immediately: false,
        });
        this.$router.push({'name': 'index'});
      }).catch(() => {
        this.$store.commit('setToken', '');
        this.$store.commit('setNotification', {
          type: 'danger',
          message: 'Login failed',
          immediately: true,
        })
      });
    }
  },
  data () {
    return {
      modal: true,
      username: '',
      password: ''
    }
  }
}
</script>

<style scoped>
</style>
