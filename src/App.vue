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
    getStores() {
      this.$axios
        .get('/api/stores')
        .then(resp => {
          this.$store.commit('setStores', resp.data.stores);
        })
        .catch(console.error);
    }
  },
  created() {
    this.$store.dispatch('autoLogin');
    this.getStores();

    this.$root.$on('open-create-nomen-dialog', this.openCreateNomenDialog);
    this.$root.$on('close-create-nomen-dialog', this.closeCreateNomenDialog);
  }
};
</script>
