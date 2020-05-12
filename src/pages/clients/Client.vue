<template>
  <!-- <q-page padding class="flex flex-center"> -->
  <q-page padding class="q-gutter-md">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Заказчики" to="/clients" />
      <q-breadcrumbs-el label="Заказчик" />
    </q-breadcrumbs>

    <div class="row" v-if="client._key">
      <div class="col text-h6">{{ client.name }}</div>
      <div class="col">
        <q-btn
          color="secondary"
          :to="`/orders/create?client_key=${client._key}`"
          >+ заказ</q-btn
        >
      </div>
    </div>

    <div class="row">
      <p>{{ client.info }}</p>
    </div>
    <div>
      <div>Заказы:</div>
      <br />
      <OrderList :orders="orders"></OrderList>
    </div>

    <q-page-sticky v-if="client._key" position="top-right" :offset="[18, 18]">
      <q-fab icon="keyboard_arrow_down" direction="down" color="primary">
        <q-fab-action
          :to="`/clients/${client._key}/update`"
          color="secondary"
          icon="edit"
          label="Изменить"
        />
        <q-fab-action
          @click="deleteClient()"
          color="warning"
          icon="delete_forever"
          label="Удалить"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import OrderList from 'components/orders/OrderList';

export default {
  name: 'PageClient',
  components: { OrderList },
  data() {
    return {
      key: this.$route.params.key,
      client: {},
      orders: []
    };
  },
  methods: {
    getClient() {
      this.$axios
        .get(`/api/clients/${this.key}`)
        .then(resp => {
          this.client = resp.data.client;
        })
        .catch(console.error);
    },
    getOrders() {
      this.$axios
        .get(`/api/orders?client_key=${this.key}`)
        .then(resp => {
          this.orders = resp.data.orders;
        })
        .catch(console.error);
    },
    deleteClient() {
      if (confirm(`Подтвердить удаление?`)) {
        this.$axios
          .delete(`/api/clients/${this.key}`)
          .then(() => {
            this.$router.push('/clients');
          })
          .catch(console.error);
      }
    }
  },
  created() {
    this.getClient();
    this.getOrders();
  }
};
</script>
