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
      <q-input disabled outlined :value="client.name" label="Клиент" />
      <OrderFields :order="order"></OrderFields>
      <div>
        <q-btn color="primary" type="submit" label="Создать" />
        <q-btn
          flat
          color="primary"
          type="reset"
          label="Отмена"
          class="q-ml-lg"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import OrderFields from './cmp/OrderFields';
export default {
  name: 'PageCreateOrder',
  components: { OrderFields },
  data() {
    return {
      client: null,
      order: {
        info: null
      }
    };
  },
  methods: {
    createOrder() {
      this.$axios
        .post('/api/orders', { createOrderDto: this.order })
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
          this.order.client_id = this.client._id;
        })
        .catch(console.error);
    }
  },
  created() {
    this.getClient();
  }
};
</script>
