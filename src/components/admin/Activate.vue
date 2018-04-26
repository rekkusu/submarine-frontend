<template>
  <div class="container mt-2">
    <h2>Admin Activation</h2>
    <form class="col-6" v-on:submit.prevent="onSubmit">
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
  export default {
    name: 'admin_activation',
    methods: {
      onSubmit() {
        this.$http.patch('/api/v1/users/priv', {
          password: this.password
        }).then(() => {
          this.$store.commit('setNotification', {
            type: 'success',
            message: 'Activated',
            immediately: false,
          });
          this.$router.push({'name': 'admin'});
        }).catch(() => {
          this.$store.commit('setNotification', {
            type: 'danger',
            message: 'Failed',
            immediately: true,
          })
        });
      }
    },
    data () {
      return {
        password: ''
      }
    }
  }
</script>

<style scoped>
</style>
