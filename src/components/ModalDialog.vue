<template>
  <div>
    <transition name="modal">
      <div class="modal" v-if="showModal" v-on:click="dismiss">
        <div class="modal-dialog" v-on:click="stop">
          <slot></slot>
        </div>
      </div>
    </transition>
    <transition name="backdrop">
      <div class="modal-backdrop show" v-if="showModal"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'modal-dialog',
    props: ['showModal'],
    data () {
      return {}
    },
    methods: {
      dismiss() {
        this.$emit('close');
      },
      stop(e) {
        e.stopPropagation();
      }
    }
  }
</script>

<style scoped>
  .modal {
    display: block;
  }

  .modal-enter, .modal-leave-to,
  .backdrop-enter, .backdrop-leave-to {
    opacity: 0;
  }

  .modal-enter, .modal-leave-to {
    transform: translateY(-30px);
  }

  .modal-enter-active, .modal-leave-active,
  .backdrop-enter-active, .backdrop-leave-active {
    transition: all 0.15s;
  }

</style>
