<template>
  <div>
    <div class="container">
      <h3>Submissions</h3>
      <div class="form-group row">
        <label for="team" class="col-sm-2 col-form-label">Team:</label>
        <div class="col-sm-4">
          <input type="text" class="form-control" id="team" placeholder="Team Name" v-model="filter.team">
        </div>
      </div>
      <div class="form-group row">
        <label for="challenge" class="col-sm-2 col-form-label">Challenge:</label>
        <div class="col-sm-4">
          <input type="text" class="form-control" id="challenge" placeholder="Challenge Name" v-model="filter.challenge">
        </div>
      </div>
      <div class="form-group row">
        <label for="challenge" class="col-sm-2 col-form-label">Correct:</label>
        <div class="col-sm-4">
          <b-form-radio-group
            buttons
            v-model="filter.is_correct"
            button-variant="outline-primary"
          >
            <b-form-radio :value="null">All</b-form-radio>
            <b-form-radio :value="true" button-variant="outline-success">Correct</b-form-radio>
            <b-form-radio :value="false" button-variant="outline-danger">Incorrect</b-form-radio>
          </b-form-radio-group>
        </div>
      </div>
    </div>
    <div class="container">
      <b-table hover
               :items="submissions"
               :fields="submissions_fields"
               :per-page="per_page"
               :current-page="current_page"
               :tbody-tr-class="row_class"
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
        <div class="mx-auto">
          <b-pagination
            :per-page="per_page"
            :total-rows="total_rows"
            v-model="current_page">
          </b-pagination>
        </div>
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
    },
    row_class: function(item) {
      if (item.is_correct) {
        return 'table-success';
      } else {
        return 'table-danger';
      }
    }
  }
}
</script>

<style scoped>
</style>
