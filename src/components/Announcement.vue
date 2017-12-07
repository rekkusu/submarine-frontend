<template>
  <b-container class="mt-2">
    <h2>{{ announcement.title }}</h2>
    <p>{{ announcement.posted_at | formatTime }}</p>
    {{ announcement.content }}
  </b-container>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'announcement',
    data () {
      return {
        announcement: {},
      }
    },
    mounted() {
      this.$http.get('/api/v1/announcements/' + this.$route.params.id).then(r => {
        this.announcement = r.data;
        this.announcement.posted_at = new Date(this.announcement.posted_at);
      })
    },
    filters: {
      formatTime(t) {
        return moment(t).format('MMMM Do YYYY, HH:mm:ss');
      }
    }
  }
</script>

<style scoped>
</style>
