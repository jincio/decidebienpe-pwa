<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          link :to="{path:item.path}"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
  export default {
    props: {
    source: String
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