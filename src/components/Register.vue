<template>
  <div class="container mt-2">
    <h2>Register</h2>
    <form class="col-6" v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <label for="username" class="form-control-label">Username (4-32chars)</label>
        <input type="text" class="form-control" id="username" placeholder="username" required v-model="username">
      </div>
      <div class="form-group">
        <label for="password" class="form-control-label">Password</label>
        <input type="password" class="form-control" id="password" placeholder="password" required v-model="password">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" id="password2" placeholder="(retype)" required v-model="password2">
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
        console.log(this.$store);
        this.$http.post('/api/v1/users/signup', {
          username: this.username,
          password: this.password,
          password2: this.password2,
        }).then(resp => {
          if (resp.status == 201) {
            this.$store.commit('setNotification', {
              type: 'success',
              message: 'Registration is succeeded',
              immediately: false,
            });
            this.$router.push({'name': 'login'});
          }
        }).catch((err) => {
          if (err.response.status == 409) {
            this.$store.commit('setNotification', {
              type: 'danger',
              message: 'Username is already registered.',
              immediately: true,
            });
          } else {
            this.$store.commit('setNotification', {
              type: 'danger',
              message: 'Registration failed',
              immediately: true,
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
