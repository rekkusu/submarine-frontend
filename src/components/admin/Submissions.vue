<template>
  <div>
    <div class="container">
      <h3>Submissions</h3>
      <div class="row form-inline">
        <div class="col-md-4">
          <div class="form-group">
            <label for="team">Team:&nbsp;</label>

            <input type="text" class="form-control" id="team" placeholder="Team Name" v-model="filter.team">
          </div>
        </div>
        <div class="col-md-5">
          <div class="form-group">
            <label for="challenge">Challenge:&nbsp;</label>

            <input type="text" class="form-control" id="challenge" placeholder="Challenge Name" v-model="filter.challenge">
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="challenge">Correct:&nbsp;</label>

            <b-form-select v-model="filter.is_correct">
              <option :value="null"></option>
              <option :value="true">Correct</option>
              <option :value="false">Incorrect</option>
            </b-form-select>
          </div>
        </div>
      </div>
      <div class="row">
        <b-table :items="submissions"
                 :fields="submissions_fields"
                 :per-page="per_page"
                 :current-page="current_page"
                 sort-by="submitted_at"
                 :sort-desc="true"
                 :filter-function="apply_filter"
                 :filter="filter"
                 @filtered="onfiltered"
        >
          <template slot="team" slot-scope="scope">
            {{ scope.value.username }}
          </template>
          <template slot="challenge" slot-scope="scope">
            {{ scope.value.title }}
          </template>
          <template slot="submitted_at" slot-scope="scope">
            {{ scope.value | moment('YYYY/MM/DD HH:mm:ss') }}
          </template>
        </b-table>
      </div>
      <div class="row">
        <b-pagination
          :per-page="per_page"
          :total-rows="total_rows"
          v-model="current_page">
        </b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'submissions',
  data() {
    return {
      submissions: [],
      submissions_fields: [
        {key: 'id', label: 'ID', sortable: true},
        {key: 'team', label: 'Team', sortable: true},
        {key: 'challenge', label: 'Challenge', sortable:true},
        {key: 'answer', label: 'Answer'},
        {key: 'is_correct', label: 'Correct', sortable: true},
        {key: 'submitted_at', label: 'Submitted', sortable: true},
      ],
      filter: {
        team: '',
        challenge: '',
        is_correct: null,
      },
      sort_by: 'submitted_at',
      sort_desc: true,
      per_page: 10,
      current_page: 1,
      total_rows: 0,
    }
  },
  mounted() {
    this.$http.get('/api/v1/submissions').then(result => {
      this.submissions = result.data;
      this.total_rows = this.submissions.length;
    });
  },
  methods: {
    apply_filter: function(item, filter) {
      let match = true;

      match &= filter.team == '' || item.team.username.indexOf(filter.team) >= 0;
      match &= filter.challenge == '' || item.challenge.title.indexOf(filter.challenge) >= 0;
      match &= filter.is_correct == null || filter.is_correct == item.is_correct;

      return match;
    },
    onfiltered: function(items) {
      this.total_rows = items.length;
      this.current_page = 1;
    }
  }
}
</script>

<style scoped>
</style>
