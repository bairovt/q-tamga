<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Заказы" to="/orders" />
      <q-breadcrumbs-el label="Создать" />
    </q-breadcrumbs>

    <div class="row q-gutter-md" v-if="client">
      <div class="col-6">
        <q-input filled v-model="client.name" label="Заказчик" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageCreateOrder",
  data() {
    return {
      client: null,
      order: null
    };
  },
  methods: {
    createOrder() {
      this.$axios
        .post("/api/orders", { createOrdertDto: this.order })
        .then(resp => {
          this.$router.back();
        })
        .catch(console.error);
    },
    onReset() {
      this.$router.go(-1);
    },
    getClient() {
      this.$axios
        .get(`/api/clients/${this.$route.query.client_key}`)
        .then(resp => {
          this.client = resp.data.client;
        })
        .catch(console.error);
    }
  },
  created() {
    this.getClient();
  }
};
</script>
