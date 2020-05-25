<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Номенклатура" />
      <q-btn
        icon="add"
        color="secondary"
        @click.stop="$root.$emit('open-create-nomen-dialog')"
      />
    </q-breadcrumbs>
    <div class="row q-mb-lg">
      <div class="col">
        <q-input
          v-model="search"
          placeholder="поиск"
          outlined
          @input="doSearch()"
          clearable
          debounce="500"
        ></q-input>
      </div>
    </div>

    <q-list>
      <div v-for="nomen in nomens" :key="nomen._key">
        <q-item @click.stop class="q-pa-xs" clickable>
          <!-- <q-item :to="`/nomens/${nomen._key}`" class="q-pa-xs"> -->
          <q-item-section>
            <q-item-label caption lines="1"
              >тнвэд {{ nomen.tnved }} ({{ nomen.measure }})</q-item-label
            >
            <q-item-label lines="3">{{ nomen.name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </div>
    </q-list>
  </q-page>
</template>

<script>
import { date } from 'quasar';

export default {
  name: 'PageNomens',
  data() {
    return {
      search: '',
      nomens: []
    };
  },
  methods: {
    getNomens() {
      const search = this.search ? this.search : '';
      this.$axios
        .get(`/api/nomenclature?search=${search}`)
        .then(resp => {
          this.nomens = resp.data.nomens;
        })
        .catch(console.error);
    },
    doSearch() {
      this.$store.commit('setNomenSearch', this.search);
      this.getNomens();
    }
  },
  created() {
    this.getNomens();
  }
};
</script>
