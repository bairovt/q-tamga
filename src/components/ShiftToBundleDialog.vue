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
      // todo: refactor this
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].qty <= 0) return alert('Error: qty <= 0');
        if (this.products[i].qty > this.selected[i].qty)
          return alert('Error: qty превышено');
        if (this.products[i].seats <= 0) return alert('Error: seats <= 0');
        if (this.products[i].seats > this.selected[i].seats)
          return alert('Error: seats превышено');
        if (
          this.products[i].qty === this.selected[i].qty &&
          this.products[i].seats !== this.selected[i].seats
        )
          return alert('Error: qty изменено, seats нет');
        if (
          this.products[i].seats === this.selected[i].seats &&
          this.products[i].qty !== this.selected[i].qty
        )
          return alert('Error: seats изменено, qty нет');
      }
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
};
</script>
