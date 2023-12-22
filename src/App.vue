<template>
  <the-loader v-if="showLoading"></the-loader>
  <v-app>
    <v-main>
      
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheLoader from './components/TheLoader.vue';
import { mapState } from 'vuex';
import { AUTO_LOGIN_ACTION } from '@/store/storeconstants';

export default {
  name: 'App',
  computed: {
    ...mapState({
      showLoading: (state) => state.showLoading,
      autoLogout: (state) => state.auth.autoLogout,
    }),
  },
  watch: {
        autoLogout(curValue, oldValue) {
            if (curValue && curValue != oldValue) {
                this.$router.replace('/login-form');
            }
        },
    },
  components: {
    TheLoader
  },
  created() {
        this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
    },
};
</script>

<style>
/* Add any global styles you want here */
</style>
