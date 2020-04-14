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
        <q-form class="q-gutter-md" style="width: 300px" @submit="logIn()" autofocus>
          <q-input outlined v-model="email" label="Email" />
          <q-input outlined type="password" v-model="password" label="Пароль" />
          <q-btn color="primary" type="submit">Войти</q-btn>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import jwtDecode from "jwt-decode";

export default {
  name: "LoginLayout",

  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    logIn() {
      this.$axios
        .post("/api/users/login", {
          email: this.email,
          password: this.password
        })
        .then(resp => {
          const { authToken } = resp.data;
          window.localStorage.setItem("authToken", authToken);
          this.$store.commit("setUser", jwtDecode(authToken));
          this.$router.push("/");
        })
        .catch(error => {
          this.$q.notify({
            color: "warning",
            position: "top",
            message: "Вход не выполнен",
            icon: "report_problem"
          });
        });
    }
  }
};
</script>
