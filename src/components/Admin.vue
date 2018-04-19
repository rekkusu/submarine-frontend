<template>
  <div class="container mt-2">
    <div class="container">
      <div class="row">
        <div class="col-2">
          <b-nav pills vertical class="">
            <b-nav-item to="/admin/general">General</b-nav-item>
            <b-nav-item to="/admin/announcements">Announcements</b-nav-item>
            <b-nav-item to="/admin/categories">Categories</b-nav-item>
            <b-nav-item to="/admin/challenges">Challenges</b-nav-item>
            <b-nav-item>Scoring</b-nav-item>
          </b-nav>
        </div>
        <div class="col">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'admin',
    data () {
      return {}
    },
  }
</script>

<style scoped>
</style>
