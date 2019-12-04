<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-2">
          <v-select
            :items="regiones"
            item-text="region"
            item-value="codigo"
            label="Región:"
            v-model="defaultSelected"
            prepend-icon="mdi-map"
          ></v-select>
          <v-container>
            <v-btn @click="onNoFiltrosClicked">No Filtros</v-btn>
          </v-container>

          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Que no incluya listas con ex-congresistas electos (2016-2019)
                por:
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-checkbox v-model="checkbox1" :label="`Fujimorismo:`"></v-checkbox>
                <v-checkbox v-model="checkbox2" :label="`Apra/PPC:`"></v-checkbox>
                <v-checkbox v-model="checkbox3" :label="`PPK:`"></v-checkbox>
                <v-checkbox v-model="checkbox4" :label="`Frente Amplio:`"></v-checkbox>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>

      <v-col>
        <v-card class="pa-2">
          <v-tabs background-color="indigo" dark v-model="tabs">
            <v-tab>Filtered</v-tab>
            <v-tab>Full list</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-card flat>
                <v-card-title>
                  
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    label="Buscar"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="filteredItems" :search="search"></v-data-table>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
let myMixin = {
  created: function() {
    // this.hello()
  },
  methods: {
    customFilter: function(lista) {
      if (lista.ex_fuji >= 1 && this.checkbox1) {
        return false;
      }
      if (lista.apra >= 1 && this.checkbox2) {
        return false;
      }
      if (lista.ex_ppk >= 1 && this.checkbox3) {
        return false;
      }
      if (lista.ex_fa >= 1 && this.checkbox4) {
        return false;
      }
      // on first load the value will be an Observable,
      // afterwards it will be just an Array.
      // TODO: This could be just one condition if we store
      // the final Array and bind to that instead.
      return (
        lista.Cod === this.defaultSelected ||
        lista.Cod === this.defaultSelected.codigo
      );
    }
  }
};

export default {
  name: "home",
  components: {},
  mixins: [myMixin],
  data() {
    return {
      tabs: null,
      search: '',
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
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
    primeraRegion() {
      return this.$store.state.regiones[0];
    },
    filteredItems() {
      return this.$store.state.listas.filter(this.customFilter);
    }
  },
  methods: {
    onNoFiltrosClicked() {
      this.checkbox1 = false;
      this.checkbox2 = false;
      this.checkbox3 = false;
      this.checkbox4 = false;
    }
  },
  created() {
    // to pre-select Amazonas on load
    this.defaultSelected = this.primeraRegion;
  }
};
</script>
