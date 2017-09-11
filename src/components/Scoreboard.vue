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
          <td>{{ item.rank }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'scoreboard',
  data () {
    return {
      scoreboard: [
        { rank: 1, name: 'Team1', score: 1000},
        { rank: 2, name: 'Team2', score: 800},
        { rank: 3, name: 'Team3', score: 500},
        { rank: 4, name: 'Team4', score: 200},
      ]
    }
  }
}
</script>

<style scoped>
</style>
