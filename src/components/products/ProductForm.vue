<template>
  <!-- <q-form ref="productForm" class="row"> -->
  <div class="row">
    <div class="col-6 col-sm-2" style="padding: 2px;">
      <q-input
        ref="tnvedInput"
        outlined
        v-model="product.tnved"
        label="ТНВЭД"
        required
        :rules="[
          val =>
            (val.length && val.length === 10 && val.match(/^[\d+]{10,10}$/)) ||
            'нужно 10 цифр'
        ]"
      />
    </div>
    <div class="col-12 col-sm-8" style="padding: 2px;">
      <q-input
        ref="nameInput"
        outlined
        v-model="product.name"
        label="Наименование товара"
        required
        :rules="[
          val => (val.length && val.length > 2) || 'нужно более 2 символов'
        ]"
      />
    </div>
    <div class="col-6 col-sm-2" style="padding: 2px;">
      <q-select
        outlined
        v-model="product.packType"
        label="Упаковка"
        :options="packTypes"
        emit-value
      />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-select
        ref="nameMeasure"
        outlined
        v-model="product.measure"
        label="Ед.изм"
        :options="units"
        required
        :rules="[val => units.includes(val) || 'не должно быть пустым']"
      />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input outlined type="number" v-model="product.seats" label="Мест" />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input outlined type="number" v-model="product.qty" label="Кол-во" />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input outlined type="number" v-model="product.wnetto" label="нетто" />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input
        outlined
        type="number"
        v-model="product.wbrutto"
        label="брутто"
      />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input outlined type="number" v-model="product.cvi" label="ИТС" />
    </div>
  </div>
  <!-- </q-form> -->
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
