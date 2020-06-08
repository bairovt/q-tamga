<template>
  <q-page padding class="q-gutter-md">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Склады" />
    </q-breadcrumbs>

    <q-list>
      <div v-for="sklad in sklads" :key="sklad._key">
        <q-item class="q-pa-xs" clickable :to="`/sklads/${sklad._key}`">
          <q-item-section>
            <q-item-label caption lines="1">{{ sklad.place }}</q-item-label>
            <q-item-label lines="3">{{ sklad.name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </div>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'PageSklads',
  computed: {
    sklads() {
      return this.$store.state.sklads;
    }
  }
};
</script>
