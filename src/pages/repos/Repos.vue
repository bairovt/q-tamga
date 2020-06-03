<template>
  <q-page padding class="q-gutter-md">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Склады" />
    </q-breadcrumbs>

    <q-list>
      <div v-for="repo in repos" :key="repo._key">
        <q-item class="q-pa-xs" clickable :to="`/repos/${repo._key}`">
          <q-item-section>
            <q-item-label caption lines="1">{{ repo.place }}</q-item-label>
            <q-item-label lines="3">{{ repo.name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </div>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'PageRepos',
  computed: {
    repos() {
      return this.$store.state.repos;
    }
  }
};
</script>
