<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <h2 class="secondary--text display-1 font-weight-medium my-3">(Progressive Web App)</h2>
      </v-flex>
    </v-layout>

    <v-container fluid>
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="6" md="4">
            <v-select
              :items="regiones"
              item-text="region"
              item-value="codigo"
              label="Regiones"
              v-model="defaultSelected"
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
      <v-data-table :headers="headers" :items="filteredItems"></v-data-table>
    </v-container>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      headers: [
        { text: "Region", value: "Region" },
        { text: "OrgPol", value: "Orgpol" }
      ],
      defaultSelected: null
    };
  },
  computed: {
    regiones() {
      return this.$store.state.regiones;
    },
    filteredItems() {
      return this.$store.state.listas.filter(lista => (lista.Cod === this.defaultSelected))
    }
  }
};
</script>
