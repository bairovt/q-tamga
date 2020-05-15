<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Номенклатура" />
    </q-breadcrumbs>

    <q-list>
      <div v-for="nomen in nomens" :key="nomen._key">
        <q-item :to="`/nomens/${nomen._key}`" class="q-pa-xs">
          <q-item-section>
            <q-item-label caption lines="1"
              >ТНВЭД {{ nomen.tnved }}</q-item-label
            >
            <q-item-label caption lines="3">{{ nomen.name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </div>
    </q-list>
  </q-page>
</template>

<script>
import { date } from 'quasar';
import OrderList from 'components/OrderList';

export default {
  name: 'PageNomens',
  data() {
    return {
      nomens: []
    };
  },
  methods: {
    getNomens() {
      this.$axios
        .get('/api/nomenclature')
        .then(resp => {
          this.nomens = resp.data.nomens;
        })
        .catch(console.error);
    }
  },
  created() {
    this.getNomens();
  }
};
</script>
