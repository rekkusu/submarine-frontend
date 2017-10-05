<template>
  <div class="container mt-2">
    <h2>Scoreboard</h2>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Team</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in scoreboard">
          <td>{{ item.order }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'scoreboard',
  data () {
    return {
      scoreboard: []
    }
  },
  created() {
    axios.get('/api/v1/scoreboard')
      .then(resp => {
        console.log(resp)
        this.scoreboard = resp.data
      })
  }
}
</script>

<style scoped>
</style>
