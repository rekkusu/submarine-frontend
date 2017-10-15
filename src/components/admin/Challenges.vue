<template>
  <div>
    <div class="container mt-2">
      <div class="d-flex flex-wrap">
        <challenge-item
          v-for="challenge in challenges"
          v-bind:challenge="challenge"
          v-on:selected="editChallenge" >

        </challenge-item>
      </div>
    </div>
  </div>
</template>

<script>
  import ChallengeItem from '@/components/ChallengeItem'
  export default {
    name: 'edit_challenge',
    components: {
      'challenge-item': ChallengeItem
    },
    async mounted() {
      const categories = await this.$http.get('/api/v1/categories');
      const challenges = await this.$http.get('/api/v1/challenges');
      this.challenges = challenges.data;
      for (const challenge of this.challenges) {
        challenge.category = categories.data[challenge.category_id];
      }
    },
    data () {
      return {
        selectedChallenge: {},
        challenges: []
      }
    },
    methods: {
      editChallenge(challenge) {
        this.$router.push({name: 'edit_challenge', params:{id: challenge.id}})
      },
    }
  }
</script>

<style scoped>
  .chal {
    margin: 5px;
    min-width: 250px;
    cursor: pointer;
  }

  .chal-title {
    text-align: center;
    font-size: 18px;
  }

</style>
