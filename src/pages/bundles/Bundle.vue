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

    <BundleProductsTable v-if="bundle" :bundle="bundle" />
  </q-page>
</template>

<script>
import NomenCrudFields from 'components/NomenCrudFields';
import BundleProductsTable from 'components/BundleProductsTable';
import ShiftToSkladDialog from 'components/ShiftToSkladDialog';

export default {
  name: 'PageBundle',
  components: {
    NomenCrudFields,
    BundleProductsTable,
    ShiftToSkladDialog
  },
  data() {
    return {
      shiftToBundleDialog: false
    };
  },
  computed: {
    bundle() {
      return this.$store.state.bundle;
    }
  },
  methods: {
    getSkladProducts() {
      this.$axios
        .get(`/api/bundles/${this.$route.params.key}/products`)
        .then(resp => {
          this.$store.commit('setBundle', resp.data.bundle);
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
