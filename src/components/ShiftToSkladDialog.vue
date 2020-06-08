<template>
  <q-dialog :value="dialog" @input="$emit('close-dialog')" maximized>
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Перемещение на склад
        </div>

        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-select
            label="Склад"
            v-model="sklad"
            :options="sklads"
            option-label="name"
            :rules="[val => !!val || 'не должно быть пустым']"
          />

          <div class="row">
            <q-btn label="Переместить" color="primary" type="submit" />
            <q-space />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section>
        <ShiftProductsTable :products="products" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-space />
        <q-btn flat label="Отмена" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import ShiftProductsTable from 'components/ShiftProductsTable';

export default {
  name: 'ShiftToSkladDialog',
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    selected: {
      type: Array,
      required: true
    }
  },
  components: { ShiftProductsTable },
  data() {
    return {
      sklad: null,
      products: this.selected.map(item => {
        return { ...item };
      })
    };
  },
  computed: {
    bundle() {
      return this.$store.state.bundle;
    },
    sklads() {
      return this.$store.state.sklads;
    }
  },
  methods: {
    onSubmit() {
      this.$axios
        .post(`/api/shifts/shift-to`, {
          from_id: this.bundle._id,
          to_id: this.sklad._id,
          products: this.products
        })
        .then(resp => {
          this.$emit('close-dialog');
          this.$router.go(0);
        })
        .catch(console.error);
    }
  }
};
</script>
