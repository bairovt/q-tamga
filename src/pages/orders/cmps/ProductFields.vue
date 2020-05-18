<template>
  <div class="row">
    <div class="col-6 col-sm-2" style="padding: 2px;">
      <q-input
        outlined
        v-model.trim="product.tnved"
        label="ТНВЭД"
        required
        :rules="[
          val =>
            (val.length && val.length === 10 && val.match(/^[\d+]{10,10}$/)) ||
            'нужно 10 цифр'
        ]"
        :disable="update"
      />
    </div>
    <div class="col-12 col-sm-8" style="padding: 2px;">
      <q-input
        outlined
        v-model.trim="product.name"
        autogrow
        label="Наименование товара"
        required
        :rules="[val => (val.length && val.length >= 3) || 'минимум 3 символа']"
        :disable="update"
      />
    </div>
    <div class="col-6 col-sm-2" style="padding: 2px;">
      <q-select
        outlined
        multiple
        v-model="packType"
        label="Упаковка"
        :options="packTypes"
        emit-value
      >
        <template v-if="packType.length" v-slot:append>
          <q-icon
            name="cancel"
            @click.stop="packType = []"
            class="cursor-pointer"
          />
        </template>
      </q-select>
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-select
        outlined
        v-model="product.measure"
        label="Ед.изм"
        :options="measureUnits"
        required
        :rules="[val => measureUnits.includes(val) || 'не пустое']"
        :disable="update"
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
        v-model.number="product.its"
        label="ИТС"
        :rules="[notNegativeNum]"
      />
    </div>
    <div v-if="comment" class="col-12 q-mb-md" style="padding: 2px;">
      <q-input
        outlined
        v-model.trim="product.comment"
        autogrow
        label="Комментарий"
        clearable
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductFields',
  props: {
    update: { type: Boolean, default: false },
    product: {
      type: Object,
      required: true
    },
    comment: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    packType: {
      get() {
        if (this.product.packType === '') {
          return [];
        } else {
          return this.product.packType.split(', ');
        }
      },
      set(val) {
        this.product.packType = val.join(', ');
      }
    },
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
