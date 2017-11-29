<template>
  <div id="app">
    <navbar></navbar>
    <b-container>
      <b-alert v-if="notification_computed.immediately" :show="notification_computed.show" :variant="notification_computed.type">
        {{ notification_computed.message }}
      </b-alert>
    </b-container>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'app',
  components: {
    'navbar': Navbar,
  },
  data() {
    return {
      notification: this.$store.state.notification,
    };
  },
  computed: {
    notification_computed() {
      return this.$store.state.notification;
    },
  },
  beforeRouteEnter() {
    if (this.$store.state.notification.show === true) {
      this.$store.commit('removeNotification');
    } else if (this.$store.state.notification.immediately === false) {
      this.$store.commit('showNotification');
    }
  }
};
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
