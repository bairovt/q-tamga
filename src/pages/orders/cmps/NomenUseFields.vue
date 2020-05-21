<template>
  <div class="row">
    <div class="col-6 col-sm-2" style="padding: 2px;">
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

    <div class="col-6 col-sm-2" style="padding: 2px;">
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
      <q-select
        outlined
        label="Наименование товара"
        use-input
        :value="nomen.name"
        input-debounce="500"
        :options="nomens"
        option-label="name"
        option-value="_id"
        @filter="filterNomens"
        :readonly="disableFields.includes('name')"
        @input-value="setSearchNomenStr"
        @input="onSelectNomen"
      >
        <template
          v-if="nomen.name && !disableFields.includes('name')"
          v-slot:append
        >
          <q-icon name="cancel" @click.stop="onClear" class="cursor-pointer" />
        </template>
      </q-select>
      <!-- :rules="[val => (val.length && val.length >= 3) || 'минимум 3 символа']" -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'NomenUseFields',
  props: {
    action: {
      validator: function(value) {
        return ['create', 'update', 'select'].indexOf(value) !== -1;
      }
    },
    disableFields: { type: Array, default: () => [] },
    product: {
      type: Object
    }
  },
  data() {
    return {
      nomens: []
    };
  },
  computed: {
    measureUnits() {
      return this.$store.state.measureUnits;
    },
    nomen() {
      if (this.action === 'update') return this.product;
      return this.$store.state.nomen;
    }
  },
  methods: {
    filterNomens(search, update, abort) {
      if (search.length >= 3) {
        this.$axios
          .get(`/api/nomenclature?search=${search}`)
          .then(resp => {
            update(() => {
              this.nomens = resp.data.nomens;
            });
          })
          .catch(console.error);
      } else {
        update(() => {
          this.nomens = [];
        });
      }
    },
    onSelectNomen(selectedVal) {
      if (selectedVal) {
        this.$store.commit('setNomen', selectedVal);
      }
    },
    onClear(val) {
      this.$store.commit('initNomen');
    },
    setSearchNomenStr(inputStr) {
      this.$store.commit('setSearchNomenStr', inputStr);
    }
  }
};
</script>
