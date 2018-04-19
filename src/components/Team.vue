<template>
  <b-container class="mt-2">
    <template v-if="team">
      <h2>{{ team.username }}</h2>
      <h3>Solved Challenges</h3>
      <b-table hover :items="solved">
      </b-table>
    </template>
  </b-container>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'index',
    props: ['id'],
    data () {
      return {
        team: null,
        solved: [],
        solved_fields: ['title', 'point', 'submitted_at']
      }
    },
    mounted() {
      this.$http.get('/api/v1/teams/' + this.$route.params.id).then(r => {
        this.team = r.data;
        this.solved = this.team.solved.map(sub => {
          return {
            title: sub.challenge.title,
            point: sub.challenge.point,
            submitted_at: moment(new Date(sub.submitted_at)).format('YYYY/MM/DD HH:mm:ss'),
          }
        });
      }).catch(e => {
        // pass
      })
    }
  }
</script>

<style scoped>
</style>
