<template>
  <q-dialog :value="dialog" @input="$emit('close-dialog')" maximized>
    <q-card style="max-width: 900px;">
      <q-card-section>
        <div class="text-h6">
          Принять на склад
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-select
            label="Склад"
            v-model="store"
            :options="stores"
            option-label="name"
            :rules="[val => !!val || 'не должно быть пустым']"
          />

          <div class="row">
            <q-btn label="Принять" color="primary" type="submit" />
            <q-space />
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-space />
        <q-btn flat label="Отмена" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'TakeOnStoreDialog',
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    order: { type: Object, required: true }
  },
  data() {
    return { store: null };
  },
  computed: {
    stores() {
      return this.$store.state.stores;
    }
  },
  methods: {
    onSubmit() {
      this.$axios
        .post(`/api/shifts/take-on-store`, {
          client_id: this.order.client_id,
          order_id: this.order._id,
          store_id: this.store._id
        })
        .then(resp => {
          this.order.status = resp.data.status;
          this.$emit('close-dialog');
        })
        .catch(console.error);
    }
  }
};
</script>
