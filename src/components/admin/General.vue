<template>
  <div>
    <div class="container">
      <h3>Contest Settings</h3>
          <b-form-group
            label="Status">
            <b-form-select v-model="status" :options="[]">
              <option value="closed">Closed</option>
              <option value="open">Open</option>
              <option value="finished">Finished</option>
            </b-form-select>
          </b-form-group>
      <button class="btn btn-primary" @click="changeStatus">Commit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'general',
  data() {
    return {
      status: 0,
      saved: false,
    }
  },
  mounted() {
    this.$http.get('/api/v1/contest').then(result => {
      this.status = result.data.status;
    });
  },
  methods: {
    changeStatus() {
      this.$http.put('/api/v1/contest', {
        status: this.status
      }).then(result => {
        if (result.status === 204) {
          // OK
        }
      });
    }
  }
}
</script>

<style scoped>
</style>
