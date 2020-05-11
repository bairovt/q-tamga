<template>
  <div class="row">
    <div class="col-6 col-sm-2" style="padding: 2px;">
      <q-input
        ref="tnvedInput"
        outlined
        v-model.trim="product.tnved"
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
        v-model.trim="product.name"
        label="Наименование товара"
        required
        :rules="[val => (val.length && val.length >= 3) || 'минимум 3 символа']"
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
        :options="measureUnits"
        required
        :rules="[val => measureUnits.includes(val) || 'не пустое']"
      />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input
        outlined
        type="number"
        v-model.number="product.seats"
        label="Мест"
        :rules="[notNegativeNum]"
      />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input
        outlined
        type="number"
        v-model.number="product.qty"
        label="Кол-во"
        :rules="[notNegativeNum]"
      />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input
        outlined
        v-model.number="product.wnetto"
        label="нетто"
        :rules="[notNegativeNum]"
      />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input
        outlined
        v-model.number="product.wbrutto"
        label="брутто"
        :rules="[notNegativeNum]"
      />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input
        outlined
        v-model.number="product.cvi"
        label="ИТС"
        :rules="[notNegativeNum]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductFormFields',
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
    measureUnits() {
      return this.$store.state.measureUnits;
    }
  },
  methods: {
    notNegativeNum(val) {
      return (!isNaN(val) && val >= 0) || 'неотриц. число';
    }
  }
};
</script>
