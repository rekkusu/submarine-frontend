<template>
  <div class="container mt-2">
    <h2>Scoreboard</h2>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Team</th>
          <th>Score</th>
          <th>Last</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in scoreboard">
          <td>{{ item.order }}</td>
          <td><router-link :to="{name: 'team', params: {id: item.id}}">{{ item.name }}</router-link></td>
          <td>{{ item.score }}</td>
          <td>{{ item.last }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
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
        for (let i = 0; i < resp.data.length; i++) {
          if (resp.data[i].score === 0) {
            resp.data[i].order = '-';
            resp.data[i].last = '-';
          } else {
            resp.data[i].last = moment(resp.data[i].last).format('YYYY/MM/DD HH:mm:ss');
          }
        }
        this.scoreboard = resp.data;
      })
  }
}
</script>

<style scoped>
</style>
