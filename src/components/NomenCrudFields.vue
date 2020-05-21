<template>
  <div class="row">
    <div class="col-6 col-sm-3" style="padding: 2px;">
      <q-input
        outlined
        v-model.trim="nomen.tnved"
        label="ТНВЭД"
        required
        :rules="
          disableFields.includes('tnved')
            ? []
            : [
                val =>
                  (val.length &&
                    val.length === 10 &&
                    val.match(/^[\d+]{10,10}$/)) ||
                  'нужно 10 цифр'
              ]
        "
        :readonly="disableFields.includes('tnved')"
      />
    </div>

    <div class="col-6 col-sm-3" style="padding: 2px;">
      <q-select
        outlined
        v-model="nomen.measure"
        label="Ед.изм"
        :options="measureUnits"
        required
        :rules="
          disableFields.includes('measure')
            ? []
            : [val => measureUnits.includes(val) || 'не пустое']
        "
        :readonly="disableFields.includes('measure')"
      />
    </div>

    <div class="col-12" style="padding: 2px;">
      <q-input
        outlined
        label="Наименование товара"
        v-model="nomen.name"
        :readonly="disableFields.includes('name')"
        :rules="[val => (val.length && val.length >= 3) || 'минимум 3 символа']"
      >
        <template
          v-slot:append
          v-if="nomen.name && !disableFields.includes('name')"
        >
          <q-icon
            name="cancel"
            @click.stop="onNameClear"
            class="cursor-pointer"
          />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NomenCrudFields',
  props: {
    nomen: { type: Object, required: true },
    disableFields: { type: Array, default: () => [] }
  },
  computed: {
    measureUnits() {
      return this.$store.state.measureUnits;
    }
  },
  methods: {
    onClear(val) {
      // this.$store.commit('initNomen');
    }
  }
};
</script>
