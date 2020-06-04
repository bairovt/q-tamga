<template>
  <div id="q-app">
    <router-view />

    <CreateNomenDialog :dialog="createNomenDialog"></CreateNomenDialog>
  </div>
</template>

<script>
import CreateNomenDialog from 'components/CreateNomenDialog';

export default {
  name: 'App',
  components: { CreateNomenDialog },
  data() {
    return {
      createNomenDialog: false
    };
  },
  methods: {
    openCreateNomenDialog() {
      this.createNomenDialog = true;
    },
    closeCreateNomenDialog() {
      this.createNomenDialog = false;
    },
    getRepos() {
      this.$axios
        .get('/api/repos')
        .then(resp => {
          this.$store.commit('setRepos', resp.data.repos);
        })
        .catch(console.error);
    },
    getBundles() {
      this.$axios
        .get('/api/bundles')
        .then(resp => {
          this.$store.commit('setBundles', resp.data.bundles);
        })
        .catch(console.error);
    }
  },
  created() {
    this.$store.dispatch('autoLogin');
    this.getRepos();
    this.getBundles();

    this.$root.$on('open-create-nomen-dialog', this.openCreateNomenDialog);
    this.$root.$on('close-create-nomen-dialog', this.closeCreateNomenDialog);
  }
};
</script>
