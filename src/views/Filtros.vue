<template>
  <v-container>
    <v-layout row>
      <v-flex md12>
        <filtros></filtros>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>

  import Filtros from '../components/Filtros'
  
  export default {
    name: "home",
    components: {
      Filtros
    }
  };
</script>