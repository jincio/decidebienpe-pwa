<template>
  <v-container>
    <v-container fluid>
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="6" md="4">
            <v-select
              :items="regiones"
              item-text="region"
              item-value="codigo"
              label="Región:"
              v-model="defaultSelected"
              prepend-icon="mdi-map"
            ></v-select>
          </v-col>
          <v-col cols="6" md="4"
            ><v-btn @click="onNoFiltrosClicked">*No Filtros</v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row justify="center">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header
                >Que no incluya listas con ex-congresistas electos (2016-2019)
                por:
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-checkbox
                  v-model="checkbox1"
                  :label="`Fujimorismo:`"
                ></v-checkbox>
                <v-checkbox
                  v-model="checkbox2"
                  :label="`Apra/PPC:`"
                ></v-checkbox>
                <v-checkbox v-model="checkbox3" :label="`PPK:`"></v-checkbox>
                <v-checkbox
                  v-model="checkbox4"
                  :label="`Frente Amplio:`"
                ></v-checkbox>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row justify="center">
          <v-divider />
        </v-row>
      </v-col>

      <v-data-table :headers="headers" :items="filteredItems"></v-data-table>
    </v-container>
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
      return lista.Cod === this.defaultSelected;
    }
  }
};

export default {
  name: "home",
  components: {},
  mixins: [myMixin],
  data() {
    return {
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
      this.defaultSelected = null;
    }
  }
};
</script>
