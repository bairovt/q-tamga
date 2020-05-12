<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el to="/orders" label="Заказы" />
      <q-breadcrumbs-el :to="`/orders/${order_key}`" :label="order_key" />
      <q-breadcrumbs-el label="Изменить" />
    </q-breadcrumbs>

    <q-form
      class="q-gutter-md"
      v-if="order._key"
      @submit="updateOrder"
      @reset="onReset"
      autofocus
      style="max-width: 800px"
    >
      <q-input disabled outlined :value="order.client.name" label="Заказчик" />
      <OrderFields :order="order"></OrderFields>
      <div class="row">
        <q-btn color="primary" type="submit" label="Сохранить" />
        <q-space></q-space>
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
import OrderFields from 'components/orders/OrderFields';
export default {
  name: 'PageUpdateOrder',
  components: { OrderFields },
  data() {
    return {
      order: {}
    };
  },
  computed: {
    order_key() {
      return this.$route.params.key;
    }
  },
  methods: {
    updateOrder() {
      this.$axios
        .put(`/api/orders/${this.order_key}`, { updateOrderDto: this.order })
        .then(resp => {
          this.$router.push(`/orders/${this.order_key}`);
        })
        .catch(console.error);
    },
    onReset() {
      this.$router.back();
    },
    getOrder() {
      this.$axios
        .get(`/api/orders/${this.order_key}`)
        .then(resp => {
          this.order = resp.data.order;
        })
        .catch(console.error);
    }
  },
  created() {
    this.getOrder();
  }
};
</script>
