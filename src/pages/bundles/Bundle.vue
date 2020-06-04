<template>
  <q-page padding class="q-gutter-md">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Сборки" to="/bundles" />
      <q-breadcrumbs-el :label="$route.params.key" />
    </q-breadcrumbs>

    <div class="row" v-if="bundle">
      <div class="col-12 col-sm-8">
        <div>
          <span text-caption>Сборка:</span>
          {{ bundle.num }}
        </div>
        <div text-body2>{{ bundle.info }}</div>
      </div>
    </div>

    <BundleProductsTable></BundleProductsTable>
  </q-page>
</template>

<script>
import NomenCrudFields from 'components/NomenCrudFields';
import BundleProductsTable from 'components/BundleProductsTable';
import ShiftToRepoDialog from 'components/ShiftToRepoDialog';

export default {
  name: 'PageBundle',
  components: {
    NomenCrudFields,
    BundleProductsTable,
    ShiftToRepoDialog
  },
  data() {
    return {
      bundle: null,
      shiftToBundleDialog: false
    };
  },
  computed: {},
  methods: {
    getRepoProducts() {
      this.$axios
        .get(`/api/bundles/${this.$route.params.key}/products`)
        .then(resp => {
          this.bundle = resp.data.bundle;
          this.$store.commit('setProducts', resp.data.products);
        })
        .catch(console.error);
    }
  },
  created() {
    this.getRepoProducts();
  }
};
</script>
