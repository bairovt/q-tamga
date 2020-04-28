<template>
  <div class="row">
    <div class="col-6 col-sm-2" style="padding: 2px;">
      <q-input filled v-model="product.tnved" label="ТНВЭД" />
    </div>
    <div class="col-12 col-sm-8" style="padding: 2px;">
      <q-input filled v-model="product.name" label="Наименование товара" />
    </div>
    <div class="col-6 col-sm-2" style="padding: 2px;">
      <q-select filled v-model="product.packType" label="Упаковка" :options="packTypes" emit-value />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-select filled v-model="product.measure" label="Ед.изм" :options="units" />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input filled type="number" v-model="product.seats" label="Мест" />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input filled type="number" v-model="product.qty" label="Кол-во" />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input filled type="number" v-model="product.wnetto" label="нетто" />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input filled type="number" v-model="product.wbrutto" label="брутто" />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input filled type="number" v-model="product.cvi" label="ИТС" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductForm",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    packTypes() {
      return this.$store.state.packTypes;
    },
    units() {
      return this.$store.state.units;
    }
  }
};
</script>
