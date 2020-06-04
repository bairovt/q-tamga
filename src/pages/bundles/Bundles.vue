<template>
  <q-page padding class="q-gutter-md">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Сборки" />
    </q-breadcrumbs>

    <q-list>
      <div v-for="bundle in bundles" :key="bundle._key">
        <q-item class="q-pa-xs" clickable :to="`/bundles/${bundle._key}`">
          <q-item-section>
            <q-item-label caption lines="1">{{ bundle.route }}</q-item-label>
            <q-item-label lines="3">{{ bundle.num }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </div>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'PageBundles',
  computed: {
    bundles() {
      return this.$store.state.bundles;
    }
  }
};
</script>
