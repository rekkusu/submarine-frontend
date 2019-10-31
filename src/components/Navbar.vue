<template>
  <b-navbar type="dark" class="navbar-expand-lg" variant="adctf" style="z-index: 3000">
    <b-container>
      <b-navbar-brand to="/">ADCTF</b-navbar-brand>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar class="navbar-nav mr-auto">
          <b-nav-item to="/challenges">Challenges</b-nav-item>
          <b-nav-item to="/scoreboard">Scoreboard</b-nav-item>
        </b-nav>
        <b-nav is-nav-bar>
          <template v-if="logged_in">
            <b-nav-item-dropdown v-bind:text="username" right>
              <b-dropdown-item v-if="is_admin" to="/admin" exact>Admin</b-dropdown-item>
              <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
          <template v-else>
            <b-nav-item to="/register">Register</b-nav-item>
            <b-nav-item to="/login">Login</b-nav-item>
          </template>
        </b-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {}
  },
  computed: {
    is_admin() {
      return this.$store.state.role === 'admin';
    },
    logged_in() {
      return this.$store.state.token !== "";
    },
    username() {
      return this.$store.state.username;
    }
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push({name: 'index'});
    }
  }
}
</script>

<style scoped>
  nav {
    margin-bottom: 15px;
  }
  .bg-adctf {
    background-color: #ef411f;
  }
</style>
