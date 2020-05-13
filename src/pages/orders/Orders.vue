<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Заказы" />
    </q-breadcrumbs>

    <OrderList :orders="orders" :withClient="true"></OrderList>
  </q-page>
</template>

<script>
import { date } from 'quasar';
import OrderList from 'components/OrderList';

export default {
  name: 'PageOrders',
  components: { OrderList },
  data() {
    return {
      orders: []
    };
  },
  methods: {
    getOrders() {
      this.$axios
        .get('/api/orders?with_client=1')
        .then(resp => {
          this.orders = resp.data.orders;
        })
        .catch(console.error);
    }
  },
  created() {
    this.getOrders();
  }
};
</script>
