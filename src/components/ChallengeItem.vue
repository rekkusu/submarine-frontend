<template>
  <div
    class="card chal"
    v-bind:style="{ borderColor: challengeColor, backgroundColor: backgroundColor }"
    v-on:click="onSelected">
    <div class="card-body px-2 py-2">
      <div class="container px-2">
        <div class="row text-center">
          <div class="col-auto mr-auto chal-title text-center" style="width: 100%">
            <s v-if="challenge.solved">
              {{ challenge.title }}
            </s>
            <template v-else>
              {{ challenge.title }}
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer text-light py-0 px-2"
         style="border: 0"
         v-bind:style="{ backgroundColor: challengeColor }">
      <div class="container px-1">
        <div class="row">
          <div class="col-auto mr-auto">{{ challenge.category }}</div>
          <div class="col-auto">{{ challenge.score }}pt ({{ challenge.solves }})</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'challenge-item',
    props: ['challenge'],
    data () {
      return {}
    },
    computed: {
      backgroundColor: function() {
        if (this.challenge.solved) {
          return '#e6ffe0';
        } else {
          return '#ffffff';
        }
      },
      challengeColor: function() {
        if (this.challenge.solved) {
          return '#00a03b';
        } else {
          return '#007bff';
        }
      }
    },
    methods: {
      onSelected() {
        this.$emit('selected', this.challenge);
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
