<template>
  <div>
    <v-layout class="mb-5" row>
      <v-flex md12>
        <div class="mb-2 mx-2 text-center">
          <h1>Decide Bien</h1>
          <h2>¿Te cuesta decidir por qué lista al Congreso 2020 votar el próximo 26 de Enero?</h2>
          <p>Ingresa tus preferencias usando los siguientes filtros (Sin sentencias judiciales, sin excongresistas, edad, etc).</p>
        </div>
      </v-flex>
    </v-layout>
  
    <v-layout row>
      <v-flex md12>
        <filtros></filtros>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>

import Filtros from '../components/Filtros'

export default {
  name: "home",
  components: {
    Filtros
  },
  data() {
    return {
      dialog: false,
      showRegion: "",
      showCurules: "",
      tabs: null,
      search: "",
      defaultSelected: null
    };
  }
};
</script>

<style lang="scss">

  h1 {
    margin: 25px 0;
    font-size: 41px;
    font-weight: 900;
  }

</style>