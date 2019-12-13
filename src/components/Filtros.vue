<template>
    <v-row>
      <v-flex md4 class="pl-4 mb-2">
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
          <v-layout text-xs-center align-center justify-center>
            <v-btn
              @click="onNoFiltrosClicked"
              class="ma-2"
              tile
              outlined
              color="blue-grey"
              v-bind:disabled="!currentRegion.region"
            >
              <v-icon left>mdi-map-marker-off</v-icon>Quitar Filtros
            </v-btn>
          </v-layout>

          <!-- Container para el boton de Twitter -->
          <div class="fixedHeight">
            <div ref="container"></div>
          </div>

          <v-divider />

          <v-chip
            v-if="f1"
            class="ma-2"
            close
            @click:close="
              f1 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>Fujimorismo
          </v-chip>
          <v-chip
            v-if="f2"
            class="ma-2"
            close
            @click:close="
              f2 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>Apra/PPC
          </v-chip>
          <v-chip
            v-if="f3"
            class="ma-2"
            close
            @click:close="
              f3 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>PPK
          </v-chip>
          <v-chip
            v-if="f4"
            class="ma-2"
            close
            @click:close="
              f4 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>Frente Amplio
          </v-chip>
          <v-chip
            v-if="f5"
            class="ma-2"
            close
            @click:close="
              f5 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>S. Penales
          </v-chip>
          <v-chip
            v-if="f6"
            class="ma-2"
            close
            @click:close="
              f6 = false;
              updateURLQuery();
            "
          >
            <v-icon left>mdi-alert</v-icon>S. Alimentarias
          </v-chip>
          <v-chip
            v-if="f7"
            class="ma-2"
            close
            @click:close="
              f7 = false;
              updateURLQuery();
            "
          >E.de G. > 30%</v-chip>
          <v-chip
            v-if="f8"
            class="ma-2"
            close
            @click:close="
              f8 = false;
              updateURLQuery();
            "
          >Paridad</v-chip>
          <v-chip
            v-if="f9"
            class="ma-2"
            close
            @click:close="
              f9 = false;
              updateURLQuery();
            "
          >Mujer Cabeza de Lista</v-chip>
          <v-divider />
          <h3 class="subheading font-weight-regular mb-2 mt2">¿Qué buscas en una lista?</h3>
          <!-- TODO -->
          <v-expansion-panels v-bind:disabled="!noRegionSelected">
            <v-expansion-panel>
              <v-expansion-panel-header>¿Que los candidatos no tengan sentencias?</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>
                    <v-checkbox
                      v-model="f5"
                      @change="updateURLQuery()"
                      color="info"
                      :label="
                        `Deseo descartar listas que tengan candidat@s con sentencias penales (Declaradas en Hoja de Vida)`
                      "
                    ></v-checkbox>
                    <v-checkbox
                      v-model="f6"
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
                      v-model="f1"
                      @change="updateURLQuery()"
                      color="info"
                      :label="`Fujimorismo`"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="f2"
                      @change="updateURLQuery()"
                      color="info"
                      :label="`Apra/PPC`"
                    ></v-checkbox>
                  </v-col>

                  <v-col>
                    <v-checkbox v-model="f3" @change="updateURLQuery()" color="info" :label="`PPK`"></v-checkbox>
                    <v-checkbox
                      v-model="f4"
                      @change="updateURLQuery()"
                      color="info"
                      :label="`Frente Amplio`"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>¿Que promuevan la equidad de género?</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>
                    <v-checkbox
                      v-model="f7"
                      @change="updateURLQuery()"
                      color="info"
                      :label="
                        `Deseo listas con más de lo requerido en la cuota (> 30%)`
                      "
                    ></v-checkbox>
                    <v-checkbox
                      v-model="f8"
                      @change="updateURLQuery()"
                      color="info"
                      :label="`Deseo listas con paridad (50%)`"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="f9"
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
        <transition name="fade" appear>
          <resultados
            :current-region="currentRegion"
            :data-table1="filtroTabla1"
            :data-table2="filtroTabla2"
          ></resultados>
        </transition>
      </v-flex>
    </v-row>
</template>

<script>
import Resultados from "../components/Resultados.vue";
import Button from "../components/Button.vue";
import Vue from "vue";

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
          if (!this.f1) {
            return true;
          }
          break;
        case 2:
          if (!this.f2) {
            return true;
          }
          break;
        case 3:
          if (!this.f3) {
            return true;
          }
          break;
        case 4:
          if (!this.f4) {
            return true;
          }
          break;
        default:
          return true;
      }
    },
    sentencia1Filter: function(lista) {
      if (this.f5) {
        return lista.Sentencia < 1;
      } else {
        return true;
      }
    },
    sentencia2Filter: function(lista) {
      if (this.f6) {
        return lista.Sentencia2 < 1;
      } else {
        return true;
      }
    },
    genero1Filter: function(lista) {
      if (this.f7) {
        return lista.dif > 0;
      } else {
        return true;
      }
    },
    genero2Filter: function(lista) {
      if (this.f8) {
        return lista.eq1 >= 49;
      } else {
        return true;
      }
    },
    genero3Filter: function(lista) {
      if (this.f9) {
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
      f1: false,
      f2: false,
      f3: false,
      f4: false,
      f5: false,
      f6: false,
      f7: false,
      f8: false,
      f9: false,
      currentRegion: {
        default: {}
      }
    };
  },
  computed: {
    noRegionSelected() {
      return !!this.currentRegion.region;
    },
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
    reAttachTwitterButton() {
      if (window.twttr) {
        var first =
          this.$refs.container &&
          this.$refs.container.children &&
          this.$refs.container.children[0];

        var ComponentClass = Vue.extend(Button);
        var instance = new ComponentClass({
          propsData: { type: "primary" }
        });
        instance.$mount(); // pass nothing

        if (!first) {
          this.$refs.container.appendChild(instance.$el);
        } else {
          this.$refs.container.replaceChild(instance.$el, first);
        }

        if (window.twttr.widgets) {
          window.twttr.widgets.load();
        }
      }
    },
    onNoFiltrosClicked() {
      if (
        this.f1 == false &&
        this.f2 == false &&
        this.f3 == false &&
        this.f4 == false &&
        this.f5 == false &&
        this.f6 == false &&
        this.f7 == false &&
        this.f8 == false &&
        this.f9
      ) {
        return;
      } else {
        this.f1 = false;
        this.f2 = false;
        this.f3 = false;
        this.f4 = false;
        this.f5 = false;
        this.f6 = false;
        this.f7 = false;
        this.f8 = false;
        this.f9 = false;
        this.updateURLQuery();
      }
    },
    noFiltrosUsed() {
      return (
        this.f1 ||
        this.f2 ||
        this.f3 ||
        this.f4 ||
        this.f5 ||
        this.f6 ||
        this.f7 ||
        this.f8 ||
        this.f9
      );
    },
    // Este metodo actualiza el url cuando los checkboxes cambian
    updateURLQuery() {
      if (
        this.f1 === true ||
        this.f1 === false ||
        this.f2 === true ||
        this.f2 === false ||
        this.f3 === true ||
        this.f3 === false ||
        this.f4 === true ||
        this.f4 === false ||
        this.f5 === true ||
        this.f5 === false ||
        this.f6 === true ||
        this.f6 === false ||
        this.f7 === true ||
        this.f7 === false ||
        this.f8 === true ||
        this.f8 === false ||
        this.f9 === true ||
        this.f9 === false
      ) {
        // TODO: refactorizar para evitar el error. Baja prioridad.
        // .push bota un error en el console cuando se trata ir al mismo route existente,
        this.$router
          .push({
            name: "filtros",
            params: {
              departamento: this.currentRegion.region
            },
            query: {
              f1: this.f1,
              f2: this.f2,
              f3: this.f3,
              f4: this.f4,
              f5: this.f5,
              f6: this.f6,
              f7: this.f7,
              f8: this.f8,
              f9: this.f9
            }
          })
          .catch(err => {
            throw new Error(`Problem handling something: ${err}.`);
          });
      }
      this.sendToGA();
      this.reAttachTwitterButton();
    },
    // Este metodo actualiza el url cuando el departamento selecionado cambia
    updateURLParams() {
      if (this.currentRegion.region) {
        this.$router.push({
          name: "filtros",
          params: { departamento: this.currentRegion.region },
          query: {
            f1: this.f1,
            f2: this.f2,
            f3: this.f3,
            f4: this.f4,
            f5: this.f5,
            f6: this.f6,
            f7: this.f7,
            f8: this.f8,
            f9: this.f9
          }
        });
      }
      this.sendToGA();
      this.reAttachTwitterButton();
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
        if (newDefault && newDefault[0].region) {
          this.currentRegion = newDefault[0];
          this.f1 = queryParams.f1 == "true";
          this.f2 = queryParams.f2 == "true";
          this.f3 = queryParams.f3 == "true";
          this.f4 = queryParams.f4 == "true";
          this.f5 = queryParams.f5 == "true";
          this.f6 = queryParams.f6 == "true";
          this.f7 = queryParams.f7 == "true";
          this.f8 = queryParams.f8 == "true";
          this.f9 = queryParams.f9 == "true";
          this.sendToGA();
          this.reAttachTwitterButton();
        }
      }
    },
    // Mandar la pagina visitada a Google Analytics como un custom event
    sendToGA() {
      window.gtag("event", "region_" + this.currentRegion.region, {
        url: this.$route.fullPath
      });
    }
  },
  mounted() {
    // TODO: Discutir que tiene mas sentido, elegir un dpto por default o no:
    // Si seleccionamos una region automaticamente, los analytics reportaran esa region mucho mas que las demas
    this.restoreTablesValues();
  }
};
</script>

<style scoped>
.fixedHeight {
  height: 75px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
