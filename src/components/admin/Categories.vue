<template>
  <div>
    <div class="container mt-2">
      <div class="row justify-content-end">
        <div class="col-auto">
          <button type="button" class="btn btn-primary" @click="newCategory()">New Category</button>
        </div>
      </div>
    </div>
    <div class="container mt-2">
      <div class="row">
        <b-list-group class="col">
          <b-list-group-item v-for="category in categories"
                             style="padding: 0 0 0 1.25rem"
                             @mouseenter="category.active = true"
                             @mouseleave="category.active = false"
                             @click.prevent="editCategory(category)" href="#">
              <div class="row">
                <div class="col-auto mr-auto" style="padding: .75rem;">
                  {{ category.name }}
                </div>
                <div class="col-auto" v-if="category.active">
                  <button type="button"
                          class="btn btn-danger del-button"
                          @click.stop.prevent="removeCategory(category)">Remove</button>
                </div>
              </div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>

    <modal-dialog v-bind:showModal="showModal" v-on:close="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h4>Edit Category</h4>
        </div>
        <div class="modal-body" v-if="selectedCategory">
            <div class="row">
              <div class="col">
                <b-form-input v-model="dialog.name">
                </b-form-input>
              </div>
              <div class="col-auto">
                <button type="button" class="btn btn-primary col col-auto" @click="submit">Submit</button>
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
    name: 'edit_categories',
    components: {
      'modal-dialog': ModalDialog,
    },
    mounted() {
      this.loadCategories();
    },
    data () {
      return {
        categories: [],
        selectedCategory: null,
        showModal: false,
        dialog: {
          name: ""
        }
      }
    },
    methods: {
      loadCategories() {
        this.$http.get('/api/v1/categories').then(result => {
          this.categories = [];
          for (let key in result.data) {
            this.categories.push({
              id: new Number(key),
              name: result.data[key],
              active: false
            })
          }
        });
      },
      newCategory() {
        this.selectedCategory = {id: 0, name: ''};
        this.dialog.name = '';
        this.showModal = true;
      },
      editCategory(category) {
        this.selectedCategory = category;
        this.dialog.name = category.name;
        this.showModal = true;
      },
      removeCategory(category) {
        if (confirm('本当に削除しますか？')) {
          this.$http.delete('/api/v1/categories/' + category.id).then(() => {
            this.loadCategories();
            this.$store.commit('setNotification', {
              type: 'success',
              message: 'Deleted',
              immediately: true,
            });
          });
        }
      },
      closeModal(){
        this.showModal = false;
      },
      submit() {
        const category = {name: this.dialog.name};
        let req;

        if (this.selectedCategory.id === 0) {
          req = this.$http.post('/api/v1/categories', category);
        } else {
          req = this.$http.put('/api/v1/categories/' + this.selectedCategory.id, category);
        }

        req.then(() => {
          this.$store.commit('setNotification', {
            type: 'success',
            message: 'Saved',
            immediately: true,
          });

          this.loadCategories();
          this.closeModal();
        });
      }
    }
  }
</script>

<style scoped>
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
