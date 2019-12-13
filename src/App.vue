<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <enlace :item="items[0]"></enlace>
        <enlace :item="items[1]"></enlace>
        <enlace :item="items[2]"></enlace>
        <enlace :item="items[3]"></enlace>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="red" dense>
      <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="mr-12 align-center">
        <span class="white--text title">DecideBien.pe</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Enlace from "./components/Enlace";

export default {
  props: {
    source: String
  },
  components: {
    Enlace
  },
  data: () => ({
    drawer: null,
    // TODO: Mover esta logica en un componente al que podamos decidir si es 'link' o si bloqueamos el click/re-direct
    // cuando se hace click in filtros estando en filtros...
    items: [
      { icon: "mdi-home", text: "Inicio", path: "/" },
      { icon: "mdi-filter", text: "Filtrar", path: "/filtros" },
      {
        icon: "mdi-file-document-box",
        text: "Resúmen General",
        path: "/resumen"
      },
      { icon: "mdi-contact-mail", text: "Créditos", path: "/creditos" }
    ]
  })
};
</script>