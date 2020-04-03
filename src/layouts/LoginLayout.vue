<template>
  <q-layout view="hHh Lpr fFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat to="/">Тамга</q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="q-pa-md">
          <div class="q-gutter-md" style="width: 300px">
            <q-input outlined v-model="email" label="Email" clearable />
            <q-input outlined type="password" v-model="password" label="Пароль" clearable />
            <q-btn color="primary">Войти</q-btn>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "LoginLayout",

  data() {
    return {
      email: null,
      password: null
    };
  }
};
</script>
