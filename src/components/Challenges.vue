<template>
  <div class="container mt-2">
    <h2>Challenges</h2>

    <div class="d-flex flex-wrap">
      <div
        class="card chal"
        v-for="challenge in challenges"
        v-bind:style="{ borderColor: colors[challenge.category] }">
        <div class="card-body px-2 py-2">
          <div class="container px-2">
            <div class="row text-center">
              <div class="col-auto mr-auto chal-title text-center" style="width: 100%">
                {{ challenge.title }}
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer text-light py-0 px-2"
          v-bind:style="{ backgroundColor: colors[challenge.category] }">
          <div class="container px-1">
            <div class="row">
              <div class="col-auto mr-auto">{{ challenge.category }}</div>
              <div class="col-auto">{{ challenge.score }}pt ({{ challenge.solves }})</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'challenges',
  data () {
    return {
      colors: {
        'Web': '#007bff',
        'Crypto': '#28a745',
        'Reversing': '#17a2b8'
      },
      challenges: [
        { title: 'Inject', score: 100, category: 'Web', solves: 54, solved: true },
        { title: 'Gyotaku', score: 200, category: 'Web', solves: 24 },
        { title: 'X55', score: 300, category: 'Web', solves: 10 },
        { title: 'RSA!', score: 100, category: 'Crypto', solves: 30 },
        { title: 'Read it', score: 200, category: 'Reversing', solves: 14 },
        { title: 'Droid', score: 300, category: 'Reversing', solves: 7 }
      ]
    }
  }
}
</script>

<style scoped>
.chal {
  margin: 5px;
  min-width: 250px;
}

.chal-title {
  text-align: center;
  font-size: 18px;
}
</style>
