<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-2" min-height="100%">
          <v-select
            :items="regiones"
            item-text="region"
            item-value="codigo"
            label="Elije tu departamento:"
            v-model="defaultSelected"
            prepend-icon="mdi-map"
          ></v-select>
          <v-layout text-xs-center align-center justify-center v-if="noFiltrosUsed()">
            <v-btn @click="onNoFiltrosClicked" class="ma-2" tile outlined color="blue-grey">
              <v-icon left>mdi-map-marker-off</v-icon>Quitar Filtros
            </v-btn>
          </v-layout>

          <v-divider />

          <v-chip v-if="checkbox1" class="ma-2" close @click:close="checkbox1 = false">
            <v-icon left>mdi-alert</v-icon>Fujimorismo
          </v-chip>
          <v-chip v-if="checkbox2" class="ma-2" close @click:close="checkbox2 = false">
            <v-icon left>mdi-alert</v-icon>Apra/PPC
          </v-chip>
          <v-chip v-if="checkbox3" class="ma-2" close @click:close="checkbox3 = false">
            <v-icon left>mdi-alert</v-icon>PPK
          </v-chip>
          <v-chip v-if="checkbox4" class="ma-2" close @click:close="checkbox4 = false">
            <v-icon left>mdi-alert</v-icon>Frente Amplio
          </v-chip>
          <v-divider />
          <h3 class="subheading font-weight-regular mb-2 mt2">¿Qué buscas en una lista?</h3>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Que no incluya listas con ex-congresistas electos (2016-2019)
                por:
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-checkbox v-model="checkbox1" :label="`Fujimorismo`"></v-checkbox>
                <v-checkbox v-model="checkbox2" :label="`Apra/PPC`"></v-checkbox>
                <v-checkbox v-model="checkbox3" :label="`PPK`"></v-checkbox>
                <v-checkbox v-model="checkbox4" :label="`Frente Amplio`"></v-checkbox>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>

      <v-col>
        <v-card class="pa-2">
          <v-tabs background-color="indigo" dark v-model="tabs" grow show-arrows>
            <v-tab class="caption">Listas que cumplen tus filtros:</v-tab>
            <v-tab class="caption">Candidatos (listas filtradas):</v-tab>
            <v-tab class="caption">Todas las listas:</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-card flat>
                <v-card-title>
                  <v-text-field v-model="search" label="Buscar" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers1" :items="uniqueFilteredItems" :search="search"></v-data-table>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-title>
                  <v-text-field v-model="search" label="Buscar" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers2" :items="notUniqueFilteredItems" :search="search"></v-data-table>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-title>
                  <v-text-field v-model="search" label="Buscar" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers3" :items="uniqueUnFilteredItems" :search="search"></v-data-table>
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
    partidoFilter: function(lista) {
      switch (lista.flag_ex1) {
        case 0:
          return true;
        case 1:
          if (!this.checkbox1) {
            return true;
          }
          break;
        case 2:
          if (!this.checkbox2) {
            return true;
          }
          break;
        case 3:
          if (!this.checkbox3) {
            return true;
          }
          break;
        case 4:
          if (!this.checkbox4) {
            return true;
          }
          break;
        default:
          return true
      }
    },
    regionFilter: function(lista) {
      // on first load the value will be an Observable,
      // afterwards it will be just an Array.
      // TODO: This could be just one condition if we store
      // the final Array and bind to that instead.
      // console.log(lista.Region)
      const compare = this.defaultSelected.region
        ? this.defaultSelected.region
        : this.regiones[this.defaultSelected - 1].region;

      return lista.Region === compare;
    },
    uniqueFilter: function(myArr, prop) {
      return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
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
      search: "",
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      headers1: [{ text: "Partido", value: "Partido" }],
      headers2: [
        { text: "Partido", value: "Partido" },
        { text: "Candidato", value: "Candidato" }
      ],
      headers3: [{ text: "Partido", value: "Partido" }],
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
    uniqueFilteredItems() {
      return this.uniqueFilter(
        this.$store.state.listas
          .filter(this.regionFilter)
          .filter(this.partidoFilter),
        "Partido"
      );
    },
    notUniqueFilteredItems() {
      return this.$store.state.listas
        .filter(this.regionFilter)
        .filter(this.partidoFilter);
    },
    uniqueUnFilteredItems() {
      return this.uniqueFilter(
        this.$store.state.listas.filter(this.regionFilter),
        "Partido"
      );
    }
  },
  methods: {
    onNoFiltrosClicked() {
      this.checkbox1 = false;
      this.checkbox2 = false;
      this.checkbox3 = false;
      this.checkbox4 = false;
    },
    noFiltrosUsed() {
      return (
        this.checkbox1 || this.checkbox2 || this.checkbox3 || this.checkbox4
      );
    }
  },
  created() {
    // to pre-select Amazonas on load
    this.defaultSelected = this.primeraRegion;
  }
};
</script>
