<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Заказы" />
    </q-breadcrumbs>

    <q-list>
      <div v-for="order in orders" :key="order._key">
        <q-item :to="`/orders/${order._key}`" class="q-pa-xs">
          <q-item-section>
            <q-item-label>№{{order.number}}</q-item-label>
            <q-item-label>{{order.client.name}}</q-item-label>
            <q-item-label>{{order.createdAt}}</q-item-label>
            <q-item-label caption lines="2">{{order.info}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </div>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: "PageOrders",
  data() {
    return {
      orders: []
    };
  },
  methods: {
    getOrders() {
      this.$axios
        .get("/api/orders")
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
