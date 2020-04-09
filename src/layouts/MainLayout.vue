<template>
  <!-- <q-layout view="hHh Lpr fFf" style="background-color: #cccccc"> -->
  <q-layout view="hHh Lpr fFf" class="bg-grey-4">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <q-btn flat to="/">Тамга</q-btn>
        </q-toolbar-title>

        <div v-if="user">{{ user.firstName }}</div>
        <div v-else>None</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered elevated content-class="bg-grey-3">
      <q-list>
        <q-item-label header class="text-grey-8">Меню</q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />

        <q-item clickable @click.stop="logOut()">
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Выход</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";

export default {
  name: "MainLayout",

  components: {
    EssentialLink
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Заказчики",
          icon: "people_outline",
          link: "/clients"
        },
        {
          title: "Заказы",
          icon: "style",
          link: "/orders"
        },
        {
          title: "Сборки",
          caption: "отправления",
          icon: "send",
          link: "/bundles"
        },
        {
          title: "Товары",
          caption: "номенклатура",
          icon: "category",
          link: "/products"
        }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    }
  }
};
</script>
