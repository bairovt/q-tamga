<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Клиенты" to="/clients" />
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
        outlined
        v-model="client.name"
        label="название организации"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'обязательное поле']"
      />
      <q-input
        v-model="client.info"
        outlined
        type="textarea"
        label="Информация"
      />

      <div>
        <q-btn label="Создать" type="submit" color="primary" />
        <q-btn
          flat
          label="Отмена"
          type="reset"
          color="primary"
          class="q-ml-lg"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'PageCreateClient',
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
        .post('/api/clients', { createClientDto: this.client })
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
