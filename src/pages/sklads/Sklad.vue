<template>
  <q-page padding class="q-gutter-md">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Склады" to="/sklads" />
      <q-breadcrumbs-el :label="$route.params.key" />
    </q-breadcrumbs>

    <div class="row" v-if="sklad">
      <div class="col-12 col-sm-8">
        <div>
          <span text-caption>Склад:</span>
          {{ sklad.name }}
        </div>
        <div text-body2>{{ sklad.info }}</div>
      </div>
    </div>

    <SkladProductsTable v-if="sklad"></SkladProductsTable>
  </q-page>
</template>

<script>
import NomenCrudFields from 'components/NomenCrudFields';
import SkladProductsTable from 'components/SkladProductsTable';
import ShiftToBundleDialog from 'components/ShiftToBundleDialog';

export default {
  name: 'PageSklad',
  components: {
    NomenCrudFields,
    SkladProductsTable,
    ShiftToBundleDialog
  },
  data() {
    return {
      shiftToBundleDialog: false
    };
  },
  computed: {
    sklad() {
      return this.$store.state.sklad;
    }
  },
  methods: {
    getSkladProducts() {
      this.$axios
        .get(`/api/sklads/${this.$route.params.key}/products`)
        .then(resp => {
          this.$store.commit('setSklad', resp.data.sklad);
          this.$store.commit('setProducts', resp.data.products);
        })
        .catch(console.error);
    }
  },
  created() {
    this.getSkladProducts();
  }
};
</script>
