<template>
  <div class="row">
    <div class="col-12 col-sm-8" style="padding: 2px;">
      <q-select
        outlined
        label="Наименование товара"
        use-input
        v-model="nomen.name"
        input-debounce="500"
        :options="nomens"
        option-label="name"
        option-value="_id"
        @filter="filterNomens"
        required
        :readonly="disableFields.includes('name')"
        clearable
        @input="onSelect"
        @input-value="setProductName"
        @clear="onClear"
      >
      </q-select>
      <!-- :rules="[val => (val.length && val.length >= 3) || 'минимум 3 символа']" -->
    </div>

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
  </div>
</template>

<script>
export default {
  name: 'NomenFields',
  props: {
    action: {
      validator: function(value) {
        return ['create', 'update', 'select'].indexOf(value) !== -1;
      }
    },
    disableFields: { type: Array, default: [] },
    nomen: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      nomens: [],
      newNomenclature: '' // new nomen
    };
  },
  computed: {
    measureUnits() {
      return this.$store.state.measureUnits;
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
    onSelect(val) {
      if (val) {
        this.nomen.tnved = val.tnved;
        this.nomen.measure = val.measure;
        this.newNomenclature = '';
      }
    },
    onClear(val) {
      this.nomen.tnved = '';
      this.nomen.measure = '';
      this.newNomenclature = '';
    },
    setProductName(val) {
      this.newNomenclature = val;
    }
  }
};
</script>
