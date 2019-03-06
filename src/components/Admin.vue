<template>
  <div class="container mt-2">
    <div class="container">
      <div class="row">
        <div class="col-2">
          <b-nav pills vertical>
            <b-nav-item to="/admin/general" replace>General</b-nav-item>
            <b-nav-item to="/admin/announcements" replace>Announcements</b-nav-item>
            <b-nav-item to="/admin/categories" replace>Categories</b-nav-item>
            <b-nav-item to="/admin/challenges" replace>Challenges</b-nav-item>
            <b-nav-item to="/admin/submissions" replace>Submissions</b-nav-item>
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
