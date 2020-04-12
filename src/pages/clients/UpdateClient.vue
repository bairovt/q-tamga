<template>
  <q-page padding v-if="client">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Заказчики" to="/clients" />
      <q-breadcrumbs-el :label="key" :to="`/clients/${client._key}`" />
      <q-breadcrumbs-el label="Изменить" />
    </q-breadcrumbs>

    <div>
      <q-form
        @submit="updateClient"
        @reset="resetUpdate"
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
          <q-btn label="Сохранить" type="submit" color="primary" />
          <q-btn label="Отмена" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageUpdateClient",
  data() {
    return {
      client: null
    };
  },
  computed: {
    key() {
      return this.$route.params.key;
    }
  },
  methods: {
    getClient() {
      this.$axios
        .get(`/api/clients/${this.key}`)
        .then(resp => {
          this.client = resp.data.client;
        })
        .catch(console.error);
    },
    updateClient() {
      this.$axios
        .patch(`/api/clients/${this.key}`, { updateClientDto: this.client })
        .then(resp => {
          this.$router.go(-1);
        })
        .catch(console.error);
    },
    resetUpdate() {
      this.$router.back();
    }
  },
  created() {
    this.getClient();
  }
};
</script>
