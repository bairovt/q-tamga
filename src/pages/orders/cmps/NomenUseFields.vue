<template>
  <div class="row">
    <div class="col-6 col-sm-2" style="padding: 2px;">
      <q-input label="ТНВЭД" :value="nomen.tnved" outlined readonly dense />
    </div>

    <div class="col-6 col-sm-2" style="padding: 2px;">
      <q-select
        label="Ед.изм"
        :value="nomen.measure"
        :options="measureUnits"
        outlined
        readonly
        dense
      />
    </div>

    <div class="col-12" style="padding: 2px;">
      <q-select
        label="Наименование товара"
        :value="nomen.name"
        :options="nomens"
        option-label="name"
        option-value="_id"
        @filter="filterNomens"
        @input="onSelectNomen"
        use-input
        @input-value="setNomenSearch"
        input-debounce="500"
        outlined
        :rules="[val => !!val || 'Обязательное поле']"
        dense
      >
        <template v-slot:append v-if="nomen.name">
          <q-icon name="cancel" @click.stop="onClear" class="cursor-pointer" />
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NomenUseFields',
  // props: {
  //   disableFields: { type: Array, default: () => [] }
  // },
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
      return this.$store.state.sharedNomen;
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
        this.$store.commit('setSharedNomen', selectedVal);
        this.$emit('set-its', selectedVal.its ? selectedVal.its : 0);
      }
    },
    onClear(val) {
      this.$store.commit('initSharedNomen');
      this.$emit('set-its', 0);
    },
    setNomenSearch(search) {
      if (search) this.$store.commit('setNomenSearch', search);
    }
  }
};
</script>
