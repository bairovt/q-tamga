<template>
  <q-dialog :value="dialog" @input="$emit('close-dialog')" maximized>
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Перемещение в сборку
        </div>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-select
            label="Сборка"
            v-model="bundle"
            :options="bundles"
            option-label="label"
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
import { verifyQtySeats } from '../utils/verify';

export default {
  name: 'ShiftToBundleDialog',
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
      bundle: null,
      products: this.selected.map(item => {
        return { ...item };
      })
    };
  },
  computed: {
    sklad() {
      return this.$store.state.sklad;
    },
    bundles() {
      return this.$store.state.bundles;
    }
  },
  methods: {
    onSubmit() {
      const errorMessage = verifyQtySeats(this.selected, this.products);
      if (errorMessage) {
        this.$q.notify({
          type: 'warning',
          message: errorMessage
        });
      } else {
        this.$axios
          .post(`/api/shifts/shift-to`, {
            from_id: this.sklad._id,
            to_id: this.bundle._id,
            products: this.products
          })
          .then(resp => {
            this.$emit('close-dialog');
            this.$router.go(0);
          })
          .catch(console.error);
      }
    }
  }
};
</script>
