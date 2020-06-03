<template>
  <q-page padding class="q-gutter-md">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Склады" to="/repos" />
      <q-breadcrumbs-el :label="$route.params.key" />
    </q-breadcrumbs>

    <div class="row" v-if="repo">
      <div class="col-12 col-sm-8">
        <div>
          <span text-caption>Склад:</span>
          {{ repo.name }}
        </div>
        <div text-body2>{{ repo.info }}</div>
      </div>
    </div>

    <RepoProductsTable></RepoProductsTable>

    <!-- <ShiftToBundleDialog
      v-if="order"
      :dialog="takeOnRepoDialog"
      :order="order"
      @close-dialog="takeOnRepoDialog = false"
    /> -->
  </q-page>
</template>

<script>
import NomenCrudFields from 'components/NomenCrudFields';
import RepoProductsTable from 'components/RepoProductsTable';
import ShiftToBundleDialog from 'components/ShiftToBundleDialog';

export default {
  name: 'PageRepo',
  components: {
    NomenCrudFields,
    RepoProductsTable,
    ShiftToBundleDialog
  },
  data() {
    return {
      repo: null,
      shiftToBundleDialog: false
    };
  },
  computed: {},
  methods: {
    getRepoProducts() {
      this.$axios
        .get(`/api/repos/${this.$route.params.key}/products`)
        .then(resp => {
          this.repo = resp.data.repo;
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
