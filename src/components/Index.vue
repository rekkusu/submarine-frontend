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
      <li v-for="announce in announcement">
        {{ announce.message }} ({{ announce.date }})
      </li>
    </ul>
  </b-container>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      announcement: [
        { message: '問題[Sample Problem]を公開しました', date: '2017/09/01 00:00:00' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
