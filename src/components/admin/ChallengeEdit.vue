<template>
  <div class="container">
    <router-link :to="{name: 'admin_challenges'}">&lt;&lt;Back</router-link>
    <div class="row justify-content-md-center">
      <challenge-item v-bind:challenge="challenge_preview"></challenge-item>
    </div>
    <div class="container">
      <b-form @submit.prevent="submit">
        <div class="row">
          <b-form-group label="Title" class="col-6">
            <b-form-input v-model="challenge.title">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Category" class="col-3">
            <b-form-select v-model.number="challenge.category_id" :options="categories">
            </b-form-select>
          </b-form-group>
          <b-form-group label="Point" class="col">
            <b-form-input v-model.number="challenge.point">
            </b-form-input>
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group label="Description" class="col">
            <b-form-textarea v-model="challenge.description" :rows='8'>
            </b-form-textarea>
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group label="Flag" class="col" horizontal :label-cols=1>
            <b-form-input v-model.trim="challenge.flag">
            </b-form-input>
          </b-form-group>
        </div>
        <div class="row">
          <div class="col">
            <b-button type="submit" variant="primary">Save</b-button>
            <b-button :to="{name: 'admin_challenges'}">Cancel</b-button>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
  import ChallengeItem from '@/components/ChallengeItem'
  export default {
    components: {
      'challenge-item': ChallengeItem
    },
    data() {
      return {
        categories: [],
        challenge: {
          category_id: 0,
          title: "",
          point: 0,
          description: "",
          flag: ""
        }
      };
    },
    computed: {
      challenge_preview() {
        const preview = Object.assign({}, this.challenge);
        preview.category = this.categories[this.challenge.category_id];
        preview.solves = 0;
        return preview;
      }
    },
    async mounted() {
      const categories = await this.$http.get('/api/v1/categories');
      this.categories = categories.data;

      const id = this.$route.params.id;
      if (id !== 'new') {
        const challenge = await this.$http.get('/api/v1/challenges/' + id);
        this.challenge = challenge.data;
      }
    },
    methods: {
      submit() {
        const id = this.$route.params.id;
        if (id === 'new') {
          const req = this.$http.post('/api/v1/challenges', this.challenge);
        } else {
          const req = this.$http.put('/api/v1/challenges/' + id, this.challenge);
        }

        req.then(result => {

        });
      }
    }
  }
</script>

<style scoped>

</style>
