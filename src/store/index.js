import Vue from 'vue'
import Vuex from 'vuex'
import listas from './listas.json'
import regiones from './regiones.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listas: listas,
    regiones: regiones
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
