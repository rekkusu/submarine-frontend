<template>
  <b-container class="mt-2">
    <h2>About</h2>
    <p>
      概要１
    </p>
    <p>
      概要２
    </p>

    <h2>Announcement</h2>
    <ul>
      <li v-for="announcement in announcements">
        <router-link :to="{name: 'announcement', params: { id: announcement.id }}">
          {{ announcement.title }}
        </router-link> ({{ announcement.posted_at | moment('from') }})
      </li>
    </ul>
  </b-container>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      announcements: []
    }
  },
  mounted() {
    this.$http.get('/api/v1/announcements').then(r => {
      this.announcements = r.data.map(item => {
        item.posted_at = new Date(item.posted_at);
        return item;
      }).sort((a, b) => a.posted_at < b.posted_at);
    }).catch(e => {
      // pass
    })
  }
}
</script>

<style scoped>
</style>
