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
        <label for="password2" class="form-control-label">Password (confirm)</label>
        <input type="password" class="form-control" id="password2" placeholder="(retype)" required v-model="password2">
      </div>
      <div class="form-group">
        <b-form-group label="Team">
          <b-form-radio-group v-model="team.mode">
            <b-form-radio value="create">Create</b-form-radio>
            <b-form-radio value="join">Join</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </div>
      <div class="form-group">
        <label for="teamname" class="form-control-label">Team Name (4-32chars)</label>
        <b-form-input v-model="team.name" id="teamname" required placeholder="Team name"></b-form-input>
      </div>
      <div class="form-group">
        <label for="teampassword" class="form-control-label">Team Password</label>
        <b-form-input v-model="team.password" id="teampassword" type="password" required></b-form-input>
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
          team: this.team,
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
        team: {
          mode: 'create',
          name: '',
          password: '',
        },
      }
    }
  }
</script>

<style scoped>
</style>
