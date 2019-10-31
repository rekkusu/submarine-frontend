<template>
  <div class="container mt-2">
    <b-row class="justify-content-md-center">
      <b-col cols="8">
        <h2>Register</h2>
        <b-form ref="form" class="" :validated="validated" v-on:submit.prevent="onSubmit" novalidate>
          <b-form-group
            label="Username"
            labelFor="usernaame"
          >
            <input type="text" class="form-control" id="username" placeholder="username" required minlength="4" maxlength="32" v-model="username">
          </b-form-group>
          <div class="form-group">
            <label for="password" class="form-control-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="password" required v-model="password">
          </div>
          <b-form-group
            label="Password (confirm)"
            labelFor="password2"
            :state="password == password2"
          >
            <input type="password" class="form-control" id="password2" placeholder="(confirm)" required v-model="password2">
          </b-form-group>
          <div class="form-group">
            <b-form-group label="Team">
              <b-form-radio-group v-model="team.mode">
                <b-form-radio value="create">Create</b-form-radio>
                <b-form-radio value="join">Join</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </div>
          <div class="form-group">
            <label for="teamname" class="form-control-label">Team Name</label>
            <b-form-input v-model="team.name" id="teamname" required placeholder="Team name"></b-form-input>
          </div>
          <div class="form-group">
            <label for="teampassword" class="form-control-label">Team Password</label>
            <b-form-input v-model="team.password" id="teampassword" type="password" required></b-form-input>
          </div>
          <div v-if="team.mode == 'create'" class="form-group">
            <label for="teampassword2" class="form-control-label">Team Password (confirm)</label>
            <b-form-input v-model="team.password2" id="teampassword2" type="password" required></b-form-input>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>

  export default {
    name: 'register',
    methods: {
      onSubmit() {
        this.validated = true;
        if (this.$refs.form.checkValidity() == false) {
          return;
        }

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
        validated: false,
        username: '',
        password: '',
        password2: '',
        team: {
          mode: 'create',
          name: '',
          password: '',
          password2: '',
        },
      }
    }
  }
</script>

<style scoped>
</style>
