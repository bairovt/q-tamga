<template>
  <q-list>
    <div v-for="order in orders" :key="order._key">
      <q-item :to="`/orders/${order._key}`" class="q-pa-xs">
        <q-item-section>
          <q-item-label caption lines="1"
            >{{ order.createdAt | ruDate }} №{{ order._key }}</q-item-label
          >
          <q-item-label v-if="withClient">{{ order.client.name }}</q-item-label>
          <q-item-label caption lines="2">{{ order.info }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator spaced />
    </div>
  </q-list>
</template>

<script>
import { date } from 'quasar';

export default {
  name: 'OrderList',
  props: {
    orders: {
      type: Array,
      required: true
    },
    withClient: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    ruDate(val) {
      return date.formatDate(val, 'DD.MM.YY');
    }
  }
};
</script>
