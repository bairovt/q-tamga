<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Заказы" to="/orders" />
      <q-breadcrumbs-el label="Создать" />
    </q-breadcrumbs>

    <q-form
      class="q-gutter-md"
      v-if="client"
      @submit="createOrder"
      @reset="onReset"
      autofocus
      style="max-width: 800px"
    >
      <q-input disabled filled :value="client.name" label="Заказчик" />
      <q-input type="textarea" filled v-model="info" label="Дополнительная информация" />
      <div>
        <q-btn color="primary" type="submit" label="Создать" />
        <q-btn flat color="primary" type="reset" label="Отмена" class="q-ml-lg" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: "PageCreateOrder",
  data() {
    return {
      client: null,
      info: null
    };
  },
  computed: {
    order() {
      return {
        client_id: this.client._id,
        info: this.info
      };
    }
  },
  methods: {
    createOrder() {
      this.$axios
        .post("/api/orders", { createOrderDto: this.order })
        .then(resp => {
          this.$router.push(`/orders/${resp.data.order_key}`);
        })
        .catch(console.error);
    },
    onReset() {
      this.$router.back();
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