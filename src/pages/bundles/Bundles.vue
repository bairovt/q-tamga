<template>
  <q-page class="flex flex-center">
    <div>
      <p>Сборки (отправления)</p>
    </div>
    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn fab icon="add" color="secondary" />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: "PageBundles"
};
</script>
