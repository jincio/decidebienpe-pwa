<template>
  <div>
    <v-layout row>
      <v-flex md4 class="mb-2">
        <v-card class="pa-2 mx-2" shaped>
          <v-select
            :items="regiones"
            item-text="region"
            item-value="codigo"
            label="Elije tu departamento:"
            v-model="currentRegion"
            prepend-icon="mdi-map"
            color="secondary"
            :return-object="true"
            v-on:change="updateURLParams"
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
            @click:close="
              checkbox1 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>Fujimorismo
          </v-chip>
          <v-chip
            v-if="checkbox2"
            class="ma-2"
            close
            @click:close="
              checkbox2 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>Apra/PPC
          </v-chip>
          <v-chip
            v-if="checkbox3"
            class="ma-2"
            close
            @click:close="
              checkbox3 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>PPK
          </v-chip>
          <v-chip
            v-if="checkbox4"
            class="ma-2"
            close
            @click:close="
              checkbox4 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>Frente Amplio
          </v-chip>
          <v-chip
            v-if="checkbox5"
            class="ma-2"
            close
            @click:close="
              checkbox5 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>S. Penales
          </v-chip>
          <v-chip
            v-if="checkbox6"
            class="ma-2"
            close
            @click:close="
              checkbox6 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>S. Alimentarias
          </v-chip>
          <v-chip
            v-if="checkbox7"
            class="ma-2"
            close
            @click:close="
              checkbox7 = false;
              updateURLQuery();
            "
          >
            E.de G. > 30%
          </v-chip>
          <v-chip
            v-if="checkbox8"
            class="ma-2"
            close
            @click:close="
              checkbox8 = false;
              updateURLQuery();
            "
          >
            Paridad
          </v-chip>
          <v-chip
            v-if="checkbox9"
            class="ma-2"
            close
            @click:close="
              checkbox9 = false;
              updateURLQuery();
            "
          >
            Mujer Cabeza de Lista
          </v-chip>
          <v-divider />
          <h3 class="subheading font-weight-regular mb-2 mt2">
            ¿Qué buscas en una lista?
          </h3>
          <!-- TODO -->
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
                      @change="updateURLQuery()"
                      color="info"
                      :label="
                        `Deseo descartar listas que tengan candidat@s con sentencias penales (Declaradas en Hoja de Vida)`
                      "
                    ></v-checkbox>
                    <v-checkbox
                      v-model="checkbox6"
                      @change="updateURLQuery()"
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
                      @change="updateURLQuery()"
                      color="info"
                      :label="`Fujimorismo`"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="checkbox2"
                      @change="updateURLQuery()"
                      color="info"
                      :label="`Apra/PPC`"
                    ></v-checkbox>
                  </v-col>

                  <v-col>
                    <v-checkbox
                      v-model="checkbox3"
                      @change="updateURLQuery()"
                      color="info"
                      :label="`PPK`"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="checkbox4"
                      @change="updateURLQuery()"
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
                      @change="updateURLQuery()"
                      color="info"
                      :label="
                        `Deseo listas con más de lo requerido en la cuota (> 30%)`
                      "
                    ></v-checkbox>
                    <v-checkbox
                      v-model="checkbox8"
                      @change="updateURLQuery()"
                      color="info"
                      :label="`Deseo listas con paridad (50%)`"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="checkbox9"
                      @change="updateURLQuery()"
                      color="info"
                      :label="`Deseo listas con una mujer como cabeza de lista`"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-flex>
      <!-- TODO -->
      <v-flex md8>
        <resultados
          :current-region="currentRegion"
          :data-table1="filtroTabla1"
          :data-table2="filtroTabla2"
        ></resultados>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Resultados from "../components/Resultados.vue";

let myMixin = {
  // Mixin Methods and Created
  // TODO: Ahora que estamos reusando componentes este Mixin podria moverse a un lugar mas 'global'
  // o quizas moverlo a un componente 'checkboxComponent'
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
      return lista.Region === this.currentRegion.region;
    },
    uniqueFilter: function(myArr, prop) {
      return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
    }
  }
};

export default {
  name: "filtros",
  components: {
    Resultados
  },
  mixins: [myMixin],
  // TODO: cambiar el nombre de checkbox a algo mas chico para que el url sea mas corto
  // envolverlos en un objecto, por ex: checkboxes: {}
  data() {
    return {
      dialog: false,
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      checkbox5: false,
      checkbox6: false,
      checkbox7: false,
      checkbox8: false,
      checkbox9: false,
      currentRegion: {
        default: {}
      }
    };
  },
  computed: {
    regiones() {
      return this.$store.state.regiones;
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
      this.updateURLQuery();
    },
    noFiltrosUsed() {
      return (
        this.checkbox1 ||
        this.checkbox2 ||
        this.checkbox3 ||
        this.checkbox4 ||
        this.checkbox5 ||
        this.checkbox6 ||
        this.checkbox7 ||
        this.checkbox8 ||
        this.checkbox9
      );
    },
    // Este metodo actualiza el url cuando los checkboxes cambian
    updateURLQuery() {
      if (
        this.checkbox1 === true ||
        this.checkbox1 === false ||
        this.checkbox2 === true ||
        this.checkbox2 === false ||
        this.checkbox3 === true ||
        this.checkbox3 === false ||
        this.checkbox4 === true ||
        this.checkbox4 === false ||
        this.checkbox5 === true ||
        this.checkbox5 === false ||
        this.checkbox6 === true ||
        this.checkbox6 === false ||
        this.checkbox7 === true ||
        this.checkbox7 === false ||
        this.checkbox8 === true ||
        this.checkbox8 === false ||
        this.checkbox9 === true ||
        this.checkbox9 === false
      ) {
        this.$router.push({
          name: "filtros",
          params: {
            departamento: this.currentRegion.region
          },
          query: {
            checkbox1: this.checkbox1,
            checkbox2: this.checkbox2,
            checkbox3: this.checkbox3,
            checkbox4: this.checkbox4,
            checkbox5: this.checkbox5,
            checkbox6: this.checkbox6,
            checkbox7: this.checkbox7,
            checkbox8: this.checkbox8,
            checkbox9: this.checkbox9
          }
        });
      }
    },
    // Este metodo actualiza el url cuando el departamento selecionado cambia
    updateURLParams() {
      if (this.currentRegion.region) {
        this.$router.push({
          name: "filtros",
          params: { departamento: this.currentRegion.region },
          query: {
            checkbox1: this.checkbox1,
            checkbox2: this.checkbox2,
            checkbox3: this.checkbox3,
            checkbox4: this.checkbox4,
            checkbox5: this.checkbox5,
            checkbox6: this.checkbox6,
            checkbox7: this.checkbox7,
            checkbox8: this.checkbox8,
            checkbox9: this.checkbox9
          }
        });
      }
    },
    // Este metodo recibe un route (url) y parsea sus params y query
    // Usamos esto para poder compartir 'resultados' usando el url
    restoreTablesValues() {
      const urlDepto = this.$route.params.departamento;
      const queryParams = this.$route.query;

      if (urlDepto) {
        const newDefault = this.regiones.filter(
          region => region.region == urlDepto
        );
        if (newDefault[0].region) {
          this.currentRegion = this.regiones[0];
          this.checkbox1 = queryParams.checkbox1 == "true";
          this.checkbox2 = queryParams.checkbox2 == "true";
          this.checkbox3 = queryParams.checkbox3 == "true";
          this.checkbox4 = queryParams.checkbox4 == "true";
          this.checkbox5 = queryParams.checkbox5 == "true";
          this.checkbox6 = queryParams.checkbox6 == "true";
          this.checkbox7 = queryParams.checkbox7 == "true";
          this.checkbox8 = queryParams.checkbox8 == "true";
          this.checkbox9 = queryParams.checkbox9 == "true";
        }
      }
    }
  },
  mounted() {
    // TODO: Discutir que tiene mas sentido, elegir un dpto por default o no:
    // Si seleccionamos una region automaticamente, los analytics reportaran esa region mucho mas que las demas
    // this.currentRegion = this.regiones[0];
    this.restoreTablesValues();
  }
};
</script>
