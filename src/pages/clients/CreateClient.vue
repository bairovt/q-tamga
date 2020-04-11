<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Заказчики" to="/clients" />
      <q-breadcrumbs-el label="Создать" />
    </q-breadcrumbs>

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      autofocus
      class="q-gutter-md"
      style="max-width: 800px"
    >
      <q-input
        filled
        v-model="client.name"
        label="название организации"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'обязательное поле']"
      />

      <q-input v-model="client.info" filled type="textarea" label="Информация" />

      <div>
        <q-btn label="Создать" type="submit" color="primary" />
        <q-btn label="Отмена" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: "PageClientsCreate",
  data() {
    return {
      client: {
        name: null,
        info: null
      }
    };
  },
  methods: {
    onSubmit() {
      this.$axios
        .post("/api/clients", { createClientDto: this.client })
        .then(resp => {
          this.$router.go(-1);
        })
        .catch(console.error);
    },
    onReset() {
      this.$router.go(-1);
    }
  }
};
</script>
