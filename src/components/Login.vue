<template>
  <div class="container mt-2">
    <h2>Login</h2>
    <form class="col-6" v-on:submit.prevent="onSubmit">
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
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  methods: {
    onSubmit() {
      axios.post('/api/v1/users/signin', {
        username: this.username,
        password: this.password
      }).then(resp => {
        this.$store.commit('setToken', resp.data.token)
      }).catch(e => {
        console.log(JSON.stringify(e));
        this.$store.commit('setToken', '')
      });
    }
  },
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style scoped>
</style>
