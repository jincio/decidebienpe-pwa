<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link :to="{ path: '/' }">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            Bienvenidos
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="routeFiltros">
          <v-list-item-action>
            <v-icon>mdi-filter</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            Filtros
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ path: '/resumen' }">
          <v-list-item-action>
            <v-icon>mdi-file-document-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            Resumen General
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ path: '/creditos' }">
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            Créditos
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        >¡Decide bien! Elecciones congresales Perú 2020</v-toolbar-title
      >
    </v-app-bar>

    <v-content>
      <v-container class="" fluid>
        <router-view />
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    routeFiltros() {
      if (this.$route.name !== "filtros") {
        this.$router.push({
          path: "/filtros"
        });
      }
    }
  }
};
</script>