<template>
  <div class="row">
    <div class="col-6 col-sm-2" style="padding: 2px;">
      <q-select
        outlined
        multiple
        v-model="packType"
        label="Упаковка"
        :options="packTypes"
        emit-value
        dense
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
      <q-input
        outlined
        type="number"
        v-model.number="product.seats"
        label="Мест"
        :rules="[notNegativeNum]"
        dense
      />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input
        outlined
        type="number"
        v-model.number="product.qty"
        label="Кол-во"
        :rules="[notNegativeNum]"
        dense
      />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input
        outlined
        v-model.number="product.wnetto"
        label="нетто"
        :rules="[notNegativeNum]"
        dense
      />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input
        outlined
        v-model.number="product.wbrutto"
        label="брутто"
        :rules="[notNegativeNum]"
        dense
      />
    </div>
    <div class="col-3 col-sm-2" style="padding: 2px;">
      <q-input
        outlined
        v-model.number="product.its"
        label="ИТС"
        :rules="[notNegativeNum]"
        dense
      />
    </div>
    <div v-if="comment" class="col-12 q-mb-md" style="padding: 2px;">
      <q-input
        outlined
        v-model.trim="product.comment"
        autogrow
        label="Комментарий"
        clearable
        dense
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductFields',
  props: {
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
    }
  },
  methods: {
    notNegativeNum(val) {
      return (!isNaN(val) && val >= 0) || 'неотриц. число';
    }
  }
};
</script>
