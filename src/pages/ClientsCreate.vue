<template>
  <!-- <q-page padding class="flex flex-center"> -->
  <q-page padding>
    <div>
      <h5>Создание Заказчика</h5>
    </div>

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

      <!-- <q-input type="tel" filled v-model="client.tel" label="телефон" lazy-rules :rules="[]" /> -->
      <!-- mask="8 (###) ### - ####" -->

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
        tel: null,
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
