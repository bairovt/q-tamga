<template>
  <!-- <q-page padding class="flex flex-center"> -->
  <q-page padding>
    <div>
      <p>Заказчики</p>
    </div>

    <q-card
      v-for="(client, i) in clients"
      :key="i + 'client'"
      bordered
      class="client-card bg-grey9"
    >
      <q-card-section>
        <div class="text-h6">{{client.name}}</div>
        <div class="text-subtitle2">{{client.place}} - {{client.tel}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">{{client.info}}</q-card-section>
    </q-card>

    <!-- <q-page-sticky position="top-right" :offset="[20, 20]">
      <q-btn @click="getClients">Load</q-btn>
    </q-page-sticky>-->

    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn fab icon="add" color="secondary" />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: "PageClients",
  data() {
    return {
      clients: []
    };
  },
  methods: {
    getClients() {
      this.$axios
        .get("/api/clients")
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
