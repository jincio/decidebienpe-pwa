<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mb-2 mx-auto"  shaped raised>
          <v-list-item three-line>
            <v-list-item-content>
              En estas elecciones, ¿te cuesta decidir por qué lista votar? Esta
              aplicación te puede ayudar. Te mostramos la/s listas que cumplen
              con criterios que son importantes para ti. ¡Únete a los miles de
              peruanos que se informarán antes de dar su voto este enero!
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      
      <v-col> 
      <v-card class="mx-auto" shaped raised>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              Instrucciones:
            </v-list-item-title>
            <ul>
              <li>Cuando abres la página todos los filtros están inactivos</li>
              <li>Elige tu departamento</li>
              <li>Activa los filtros que son importantes para ti</li>
              <li>Revisa las listas que pasaron tus filtros</li>
              <li>
                Revisa los candidatos de las listas que pasaron tus filtros
              </li>
            </ul>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="pa-2" min-height="100%" raised>
          
          <v-select
            :items="regiones"
            item-text="region"
            item-value="codigo"
            label="Elije tu departamento:"
            v-model="defaultSelected"
            prepend-icon="mdi-map"
            color="secondary"
          ></v-select>
          <v-layout
            text-xs-center
            align-center
            justify-center
            v-if="noFiltrosUsed()"
          >
            <v-btn
              @click="onNoFiltrosClicked"
              class="ma-2"
              tile
              outlined
              color="blue-grey"
            >
              <v-icon left>mdi-map-marker-off</v-icon>Quitar Filtros
            </v-btn>
          </v-layout>

          <v-divider />

          <v-chip
            v-if="checkbox1"
            class="ma-2"
            close
            @click:close="checkbox1 = false"
          >
            <v-icon left>mdi-alert</v-icon>Fujimorismo
          </v-chip>
          <v-chip
            v-if="checkbox2"
            class="ma-2"
            close
            @click:close="checkbox2 = false"
          >
            <v-icon left>mdi-alert</v-icon>Apra/PPC
          </v-chip>
          <v-chip
            v-if="checkbox3"
            class="ma-2"
            close
            @click:close="checkbox3 = false"
          >
            <v-icon left>mdi-alert</v-icon>PPK
          </v-chip>
          <v-chip
            v-if="checkbox4"
            class="ma-2"
            close
            @click:close="checkbox4 = false"
          >
            <v-icon left>mdi-alert</v-icon>Frente Amplio
          </v-chip>
          <v-chip
            v-if="checkbox5"
            class="ma-2"
            close
            @click:close="checkbox5 = false"
          >
            <v-icon left>mdi-alert</v-icon>S. Penales
          </v-chip>
          <v-chip
            v-if="checkbox6"
            class="ma-2"
            close
            @click:close="checkbox6 = false"
          >
            <v-icon left>mdi-alert</v-icon>S. Alimentarias
          </v-chip>
          <v-chip
            v-if="checkbox7"
            class="ma-2"
            close
            @click:close="checkbox7 = false"
          >
            E.de G. > 30%
          </v-chip>
          <v-chip
            v-if="checkbox8"
            class="ma-2"
            close
            @click:close="checkbox8 = false"
          >
            Paridad
          </v-chip>
          <v-chip
            v-if="checkbox9"
            class="ma-2"
            close
            @click:close="checkbox9 = false"
          >
            Mujer Cabeza de Lista
          </v-chip>
          <v-divider />
          <h3 class="subheading font-weight-regular mb-2 mt2">
            ¿Qué buscas en una lista?
          </h3>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                ¿Que los candidatos no tengan sentencias?
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>
                    <v-checkbox
                      v-model="checkbox5"
                      color="info"
                      :label="
                        `Deseo descartar listas que tengan candidat@s con sentencias penales (Declaradas en Hoja de Vida)`
                      "
                    ></v-checkbox>
                    <v-checkbox
                      v-model="checkbox6"
                      color="info"
                      :label="
                        `Deseo descartar listas que tengan candidat@s con sentencias alimentarias (Declaradas en Hoja de Vida)`
                      "
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                Que no incluya listas con ex-congresistas electos (2016-2019)
                por:
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>
                    <v-checkbox
                      v-model="checkbox1"
                      color="info"
                      :label="`Fujimorismo`"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="checkbox2"
                      color="info"
                      :label="`Apra/PPC`"
                    ></v-checkbox>
                  </v-col>

                  <v-col>
                    <v-checkbox
                      v-model="checkbox3"
                      color="info"
                      :label="`PPK`"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="checkbox4"
                      color="info"
                      :label="`Frente Amplio`"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                ¿Que promuevan la equidad de género?
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>
                    <v-checkbox
                      v-model="checkbox7"
                      color="info"
                      :label="
                        `Deseo listas con más de lo requerido en la cuota (> 30%)`
                      "
                    ></v-checkbox>
                    <v-checkbox
                      v-model="checkbox8"
                      color="info"
                      :label="`Deseo listas con paridad (50%)`"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="checkbox9"
                      color="info"
                      :label="`Deseo listas con una mujer como cabeza de lista`"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>

      <v-col>
        <v-card class="pa-2" raised>
          <p>{{ showRegion }}, número de escaños ({{ showCurules }}).</p>
          <p>
            Listas que pasan tus filtros:
            <span @click.stop="dialog = true"
              ><v-icon left>mdi-information</v-icon></span
            >
          </p>

          <v-row justify="center">
            <v-dialog v-model="dialog" max-width="290">
              <v-card>
                <v-card-text class="pt-4">
                  La primera tabla muestra las listas que pasan tus filtros, la
                  segunda los candidatos de esas listas que pasan tus filtros.
                  De los candidatos mostramos la edad, experiencia política
                  previa (Experiencia_Pol), si tienen sentencia declarada en la
                  hoja de vida o no, y el último grado de estudios alcanzado
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="secondary" text @click="dialog = false">
                    Cerrar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-tabs
            background-color="indigo"
            dark
            v-model="tabs"
            grow
            show-arrows
          >
            <v-tab class="caption">Listas que cumplen tus filtros:</v-tab>
            <v-tab class="caption">Candidatos (listas filtradas):</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-card flat>
                <v-card-title>
                  <v-text-field
                    v-model="search"
                    label="Buscar"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-spacer />
                </v-card-title>
                <v-data-table
                  :headers="headers1"
                  :items="filtroTabla1"
                  :search="search"
                ></v-data-table>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-title>
                  <v-text-field
                    v-model="search"
                    label="Buscar"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-spacer />
                </v-card-title>
                <v-data-table
                  :headers="headers2"
                  :items="filtroTabla2"
                  :search="search"
                ></v-data-table>
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
  // Mixin Methods and Created
  created: function() {},
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
          return true;
      }
    },
    sentencia1Filter: function(lista) {
      if (this.checkbox5) {
        return lista.Sentencia < 1;
      } else {
        return true;
      }
    },
    sentencia2Filter: function(lista) {
      if (this.checkbox6) {
        return lista.Sentencia2 < 1;
      } else {
        return true;
      }
    },
    genero1Filter: function(lista) {
      if (this.checkbox7) {
        return lista.dif > 0;
      } else {
        return true;
      }
    },
    genero2Filter: function(lista) {
      if (this.checkbox8) {
        return lista.eq1 >= 49;
      } else {
        return true;
      }
    },
    genero3Filter: function(lista) {
      if (this.checkbox9) {
        return lista.pos_f == 1;
      } else {
        return true;
      }
    },
    regionFilter: function(lista) {
      // on first load the value will be an Observable,
      // afterwards it will be just an Array.
      // TODO: This could be just one condition if we store
      // the final Array and bind to that instead.
      // console.log(lista.Region)
      if (this.defaultSelected.region) {
        this.showRegion = this.defaultSelected.region;
        this.showCurules = this.defaultSelected.curul;
      } else {
        this.showRegion = this.regiones[this.defaultSelected - 1].region;
        this.showCurules = this.regiones[this.defaultSelected - 1].curul;
      }

      return lista.Region === this.showRegion;
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
      dialog: false,
      showRegion: "",
      showCurules: "",
      tabs: null,
      search: "",
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      checkbox5: false,
      checkbox6: false,
      checkbox7: false,
      checkbox8: false,
      checkbox9: false,
      headers1: [{ text: "Partido", value: "Partido" }],
      headers2: [
        { text: "Partido", value: "Partido" },
        { text: "Candidato", value: "Candidato" },
        { text: "Número", value: "Número" },
        { text: "Sexo", value: "Sexo" },
        { text: "Edad", value: "Edad" },
        { text: "Con Sentencia", value: "ConSentencia" },
        { text: "Experiencia Politica", value: "Experiencia_Pol" },
        { text: "Estudios", value: "Estudios" }
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
    filtroTabla1() {
      return this.uniqueFilter(
        this.$store.state.listas
          .filter(this.regionFilter)
          .filter(this.partidoFilter)
          .filter(this.sentencia1Filter)
          .filter(this.sentencia2Filter)
          .filter(this.genero1Filter)
          .filter(this.genero2Filter)
          .filter(this.genero3Filter),
        "Partido"
      );
    },
    filtroTabla2() {
      return this.$store.state.listas
        .filter(this.regionFilter)
        .filter(this.partidoFilter)
        .filter(this.sentencia1Filter)
        .filter(this.sentencia2Filter)
        .filter(this.genero1Filter)
        .filter(this.genero2Filter)
        .filter(this.genero3Filter);
    }
    // filtroTabla3() {
    //   return this.uniqueFilter(
    //     this.$store.state.listas.filter(this.regionFilter),
    //     "Partido"
    //   );
    // }
  },
  methods: {
    onNoFiltrosClicked() {
      this.checkbox1 = false;
      this.checkbox2 = false;
      this.checkbox3 = false;
      this.checkbox4 = false;
      this.checkbox5 = false;
      this.checkbox6 = false;
      this.checkbox7 = false;
      this.checkbox8 = false;
      this.checkbox9 = false;
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
