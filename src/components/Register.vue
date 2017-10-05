<template>
  <div class="container mt-2">
    <h2>Register</h2>
    <form class="col-6" v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <label for="username" class="form-control-label ">Username</label>
        <input type="text" class="form-control" id="username" placeholder="username" v-model="username">
      </div>
      <div class="form-group">
        <label for="password" class="form-control-label">Password</label>
        <input type="password" class="form-control" id="password" placeholder="password" v-model="password">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" id="password2" placeholder="(retype)" v-model="password2">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'register',
    methods: {
      onSubmit() {
        this.$http.post('/api/v1/users/signup', {
          username: this.username,
          password: this.password,
          password2: this.password2,
        }).then(resp => {
          if (resp.status == 201) {
            this.$notify({
              type: 'success',
              text: 'Registration succeeded'
            });
            this.$router.push({'name': 'login'});
          }
        }).catch((err) => {
          if (err.response.status == 409) {
            this.$notify({
              type: 'error',
              text: 'That username is already registered.',
            });
          } else {
            this.$notify({
              type: 'error',
              text: 'Registration failed'
            });
          }
          return null;
        });
      }
    },
    data () {
      return {
        username: '',
        password: '',
        password2: '',
      }
    }
  }
</script>

<style scoped>
</style>
