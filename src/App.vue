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
          <v-subheader class="mt-4 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
          <v-list-item link>
            <v-list-item-action>
              <v-icon color="grey darken-1">mdi-settings</v-icon>
            </v-list-item-action>
            <v-list-item-title class="grey--text text--darken-1">Manage Subscriptions</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar
        app
        clipped-left
        color="red"
        dense
      >
        <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer" />
        <v-toolbar-title class="mr-12 align-center">
          <span class="white--text title">DecideBien.pe</span>
        </v-toolbar-title>
      </v-app-bar>
  
      <v-content>
        <v-container class="fill-height">
          <router-view/>
        </v-container>
      </v-content>
    </v-app>
  </template>
  
  <script>
    export default {
      props: {
        source: String,
      },
      data: () => ({
        drawer: null,
        items: [
          { icon: 'mdi-home', text: 'Inicio', path: "/" },
          { icon: 'mdi-file-document-box', text: 'Visualizaciones', path: "/resumen"  },
          { icon: 'mdi-contact-mail', text: 'Créditos', path: '/creditos' },
        ]
      }),
      created () {
        
      },
    }
  </script>