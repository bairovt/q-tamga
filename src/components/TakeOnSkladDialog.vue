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
            v-model="sklad"
            :options="sklads"
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
  name: 'TakeOnSkladDialog',
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    order: { type: Object, required: true }
  },
  data() {
    return { sklad: null };
  },
  computed: {
    sklads() {
      return this.$store.state.sklads;
    }
  },
  methods: {
    onSubmit() {
      this.$axios
        .post(`/api/shifts/take-on-sklad`, {
          client_id: this.order.client_id,
          order_id: this.order._id,
          sklad_id: this.sklad._id
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
