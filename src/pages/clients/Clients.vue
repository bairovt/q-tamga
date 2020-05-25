<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Клиенты" />
      <q-btn icon="add" color="secondary" to="/clients/create" />
    </q-breadcrumbs>

    <q-list>
      <div v-for="client in clients" :key="client._key">
        <q-item :to="`/clients/${client._key}`" class="q-pa-xs">
          <q-item-section>
            <q-item-label>{{ client.name }}</q-item-label>
            <q-item-label caption lines="2">{{ client.info }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </div>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'PageClients',
  data() {
    return {
      clients: []
    };
  },
  methods: {
    getClients() {
      this.$axios
        .get('/api/clients')
        .then(resp => {
          this.clients = resp.data.clients;
        })
        .catch(console.error);
    }
  },
  created() {
    this.getClients();
  }
};
</script>
