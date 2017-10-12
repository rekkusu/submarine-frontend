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
          <p>{{ selectedChallenge.description }}</p>
        </div>
        <div class="modal-footer">
          <div class="container">
            <div class="row">
              <input class="col mr-auto form-control" placeholder="FLAG" required v-model="dialog.flag" v-on:keydown.enter="submit">
              <button type="button" class="btn btn-primary col col-auto" v-on:click="submit">Submit</button>
            </div>
            <div class="row">
              <div class="submit-result" v-show="dialog.message"
                v-bind:class="{'text-success': dialog.message_type=='correct', 'text-danger': dialog.message_type=='invalid'}">
                {{ dialog.message }}
              </div>
            </div>
          </div>
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
      dialog: {
        flag: "",
        message: "",
        status: "",
      },
      showModal: false,
      challenges: []
    }
  },
  methods: {
    showChallenge(challenge) {
      this.selectedChallenge = challenge;
      this.showModal = true;
    },
    closeModal(){
      this.showModal = false;
      this.dialog.flag = '';
      this.dialog.message = '';
    },
    submit() {
      this.$http.post('/api/v1/challenges/' + this.selectedChallenge.id + '/submit', {
        'answer': this.dialog.flag,
      }).then(resp => {
        if (resp.status == 202) {
          if (resp.data.is_correct) {
            this.dialog.message_type = 'correct';
            this.dialog.message = 'Solved';
            this.selectedChallenge.solved = true;
          } else {
            this.dialog.message_type = 'invalid';
            this.dialog.message = 'Wrong';
          }
        }
      }).catch(e => {
        if (e.response.status == 409) {
          // already solved
          this.dialog.message_type = 'invalid';
          this.dialog.message = 'Your team has already solved this challenge.';
        }
      });
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
