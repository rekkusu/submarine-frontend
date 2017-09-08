<template>
  <b-navbar type="dark" class="navbar-expand-lg" style="background-color: #ef411f">
    <b-container>
      <b-navbar-brand href="#">ADCTF</b-navbar-brand>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar class="navbar-nav mr-auto">
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/challenges">Challenges</b-nav-item>
          <b-nav-item to="/scoreboard">Scoreboard</b-nav-item>
        </b-nav>
        <b-nav is-nav-bar>
          <b-nav-item href="#">User1</b-nav-item>
        </b-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
</script>

<style scoped>
</style>
