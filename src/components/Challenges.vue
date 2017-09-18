<template>
  <div>
    <div class="container mt-2">
      <h2>Challenges</h2>

      <div class="d-flex flex-wrap">
        <challenge-item
          v-for="challenge in challenges"
          v-bind:challenge="challenge"
          v-on:selected="showChallenge" >

        </challenge-item>
      </div>
    </div>

    <modal-dialog v-bind:showModal="showModal" v-on:close="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ selectedChallenge.title }} - {{ selectedChallenge.category }}</h5>
          <button type="button" class="close" v-on:click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Challenge Description{{ selectedChallenge.description }}</p>
        </div>
        <div class="modal-footer">
          <input class="form-control" placeholder="FLAG" v-model="flag" v-on:keydown.enter="submit">
          <button type="button" class="btn btn-primary" v-on:click="submit">Submit</button>
        </div>
      </div>
    </modal-dialog>
  </div>
</template>

<script>
import ChallengeItem from '@/components/ChallengeItem'
import ModalDialog from '@/components/ModalDialog'
export default {
  name: 'challenges',
  components: {
    'challenge-item': ChallengeItem,
    'modal-dialog': ModalDialog,
  },
  data () {
    return {
      selectedChallenge: {},
      flag: "",
      showModal: false,
      challenges: [
        {title: 'Inject', score: 100, category: 'Web', solves: 54, solved: true},
        {title: 'Gyotaku', score: 200, category: 'Web', solves: 24},
        {title: 'X55', score: 300, category: 'Web', solves: 10},
        {title: 'RSA!', score: 100, category: 'Crypto', solves: 30},
        {title: 'Read it', score: 200, category: 'Reversing', solves: 14},
        {title: 'Droid', score: 300, category: 'Reversing', solves: 7, solved: true},
      ]
    }
  },
  methods: {
    showChallenge(challenge) {
      this.selectedChallenge = challenge;
      this.showModal = true;
    },
    closeModal(){
      this.showModal = false;
      this.flag = '';
    },
    submit() {
      this.closeModal();
    }
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
