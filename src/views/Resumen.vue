<template>
  <v-container>
    <v-flex xs12 md6 pt-4>
      <v-select
        :items="tablasResumen"
        item-text="value"
        item-value="id"
        label="Elige:"
        v-model="currentResumen"
        prepend-icon="mdi-table"
        color="secondary"
        :return-object="true"
        v-on:change="updateTabla"
      ></v-select>
    </v-flex>
    <v-data-table :headers="getHeaders()" :items="currentTabla"> </v-data-table>
    <line-chart v-if="datacollection" :chart-data="datacollection"></line-chart>
  </v-container>
</template>

<script>
import LineChart from "../components/Chart";

export default {
  name: "resumen",
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: null,
      currentTabla: [],
      tablasResumen: [
        { id: 1, value: "Experiencia Política" },
        { id: 2, value: "Delitos Penales" },
        { id: 3, value: "Otros Delitos" },
        { id: 4, value: "Mujeres" }
      ],
      currentResumen: []
    };
  },
  computed: {
    t1() {
      return this.$store.state.t1;
    },
    t2() {
      return this.$store.state.t2;
    },
    t3() {
      return this.$store.state.t3;
    },
    t4() {
      return this.$store.state.t4;
    }
  },
  methods: {
    updateTabla() {
      switch (this.currentResumen.id) {
        case 1:
          this.currentTabla = this.t1;
          this.fillData();
          break;
        case 2:
          this.currentTabla = this.t2;
          this.fillData();
          break;
        case 3:
          this.currentTabla = this.t3;
          this.fillData();
          break;
        case 4:
          this.currentTabla = this.t4;
          this.fillData();
          break;
      }
    },
    getHeaders() {
      switch (this.currentResumen.id) {
        case 1:
          return [
            { text: "# de Candidatos", value: "Candidatos" },
            { text: "Cargos Anteriores", value: "Cargos_Anteriores" }
          ];
        case 2:
          return [
            { text: "Tipo Delito Penal", value: "strDelitoPenal" },
            { text: "Cantidad", value: "Delitos_Penales" }
          ];
        case 3:
          return [
            { text: "Materia Sentencia", value: "strMateriaSentencia" },
            { text: "Otros Delitos", value: "Otros_delitos" }
          ];
        case 4:
          return [
            { text: "Region", value: "Region" },
            { text: "Por Mujeres", value: "PorMujeres1" },
            { text: "Por Mujeres Final", value: "PorMujeresFinal" }
          ];
      }
    },
    fillData() {
      let etiquetas;
      let data;
      let data1;
      let data2;

      switch (this.currentResumen.id) {
        case 1:
          etiquetas = this.currentTabla.map(item => {
            return item.Cargos_Anteriores;
          });
          data = this.currentTabla.map(item => {
            return item.Candidatos;
          });
          this.datacollection = {
            labels: etiquetas,
            datasets: [
              {
                label: "# de Candidatos",
                backgroundColor: "#f87979",
                data: data
              }
            ]
          };
          break;
        case 2:
          etiquetas = this.currentTabla.map(item => {
            return item.strDelitoPenal;
          });
          data = this.currentTabla.map(item => {
            return item.Delitos_Penales;
          });
          this.datacollection = {
            labels: etiquetas,
            datasets: [
              {
                label: "# de Candidatos",
                backgroundColor: "#f87979",
                data: data
              }
            ]
          };
          break;
        case 3:
          etiquetas = this.currentTabla.map(item => {
            return item.strMateriaSentencia;
          });
          data = this.currentTabla.map(item => {
            return item.Otros_delitos;
          });
          this.datacollection = {
            labels: etiquetas,
            datasets: [
              {
                label: "# de Candidatos",
                backgroundColor: "#f87979",
                data: data
              }
            ]
          };
          break;
        case 4:
          etiquetas = this.currentTabla.map(item => {
            return item.Region;
          });
          data1 = this.currentTabla.map(item => {
            return item.PorMujeres1;
          });
          data2 = this.currentTabla.map(item => {
            return item.PorMujeresFinal;
          });
          this.datacollection = {
            labels: etiquetas,
            datasets: [
              {
                label: "Por Mujeres",
                backgroundColor: "#f87979",
                data: data1
              },
              {
                label: "Por Mujeres Final",
                backgroundColor: "#9aa15d",
                data: data2
              }
            ]
          };
          break;
      }
    }
  }
};
</script>
