<template>
  <div>
    <div class="container mt-2">
      <div class="row justify-content-end">
        <div class="col-auto">
          <button type="button" class="btn btn-primary" @click="newAnnouncement()">New Announcement</button>
        </div>
      </div>
    </div>
    <div class="container mt-2">
      <b-table striped hover :items="announcements" :fields="announcement_fields">
        <template slot="id" slot-scope="data">
          {{ data.value }}
        </template>
        <template slot="title" slot-scope="data">
          <a href="#" @click.prevent="editAnnouncement(data.item)">{{ data.value }}</a>
        </template>
        <template slot="posted_at" slot-scope="data">
          {{ data.value | moment('YYYY/MM/DD HH:mm:ss') }}
        </template>
        <template slot="remove" slot-scope="data">
          <button class="btn btn-danger" @click="removeAnnouncement(data.item)">Remove</button>
        </template>
      </b-table>
    </div>

    <modal-dialog v-bind:showModal="showModal" v-on:close="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h4>Edit Announcement</h4>
        </div>
        <div class="modal-body" v-if="selectedAnnouncement">
          <div class="row">
            <div class="col">
              <b-form-group label="Title">
                <b-form-input v-model="dialog.title">
                </b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b-form-group label="Content">
                <b-form-textarea v-model="dialog.content" :rows="5"></b-form-textarea>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b-form-group label="Posted At">
                <b-form-input type="datetime-local" v-model="dialog.posted_at"></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col mr-auto"></div>
            <div class="col-auto">
              <button type="button" class="btn btn-primary col col-auto" @click="submit">Save</button>
            </div>
          </div>
        </div>
      </div>
    </modal-dialog>
  </div>
</template>

<script>
  import ModalDialog from '@/components/ModalDialog'
  export default {
    name: 'admin-announcement',
    components: {
      'modal-dialog': ModalDialog,
    },
    mounted() {
      this.loadAnnouncements();
    },
    data () {
      return {
        announcements: [],
        announcement_fields: [
          'id',
          'title',
          'posted_at',
          'remove',
        ],
        selectedAnnouncement: null,
        showModal: false,
        dialog: {
          title: "",
          content: "",
          posted_at: null,
        }
      }
    },
    methods: {
      loadAnnouncements() {
        this.$http.get('/api/v1/announcements').then(result => {
          this.announcements = result.data.map(item => {
            return {
              id: parseInt(item.id),
              title: item.title,
              content: item.content,
              posted_at: item.posted_at,
            }
          });
        });
      },
      newAnnouncement() {
        this.selectedAnnouncement = {id: 0, message: '', posted_at: null};
        this.dialog.title = '';
        this.dialog.message = '';
        this.showModal = true;
      },
      editAnnouncement(item) {
        this.selectedAnnouncement = item;
        this.dialog = item;
        this.showModal = true;
      },
      removeAnnouncement(item) {
        if (confirm('本当に削除しますか？')) {
          this.$http.delete('/api/v1/announcements/' + item.id).then(() => {
            this.$store.commit('setNotification', {
              type: 'success',
              message: 'Removed',
              immediately: true,
            });
          }).catch(() => {
            this.$store.commit('setNotification', {
              type: 'danger',
              message: 'Error',
              immediately: true,
            });
          });
          this.loadAnnouncements();
        }
      },
      closeModal(){
        this.showModal = false;
      },
      submit() {
        const announcement = this.dialog;
        let req;

        announcement.posted_at = (new Date(announcement.posted_at)).toISOString();

        if (this.selectedAnnouncement.id === 0) {
          req = this.$http.post('/api/v1/announcements', announcement);
        } else {
          req = this.$http.put('/api/v1/announcements/' + this.selectedAnnouncement.id, announcement);
        }

        req.then(() => {
          this.$store.commit('setNotification', {
            type: 'success',
            message: 'Saved',
            immediately: true,
          });

          this.loadAnnouncements();
          this.closeModal();
        }).catch((e) => {
          this.$store.commit('setNotification', {
            type: 'danger',
            message: 'Error',
            immediately: true,
          });

          this.closeModal();
        });
      }
    }
  }
</script>

<style>
  .modal-dialog {
    max-width: 800px;
  }

  .del-button {
    height: 100%;
    border-radius: 0;
  }

  .list-group-item:first-child .del-button {
    border-top-right-radius: .25rem;
  }

  .list-group-item:last-child .del-button {
    border-bottom-right-radius: .25rem;
  }

</style>
