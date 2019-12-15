import Vue from 'vue'
import Vuex from 'vuex'
import listas from './listas.json'
import regiones from './regiones.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listas: listas,
    regiones: regiones,
    filtros: {
      f1: false,
      f2: false,
      f3: false,
      f4: false,
      f5: false,
      f6: false,
      f7: false,
      f8: false,
      f9: false,
      f10: false
    }
  },
  mutations: {
    updateFiltro1(state, payload) {
      state.filtros.f1 = payload;
    },
    updateFiltro2(state, payload) {
      state.filtros.f2 = payload;
    },
    updateFiltro3(state, payload) {
      state.filtros.f3 = payload;
    },
    updateFiltro4(state, payload) {
      state.filtros.f4 = payload;
    },
    updateFiltro5(state, payload) {
      state.filtros.f5 = payload;
    },
    updateFiltro6(state, payload) {
      state.filtros.f6 = payload;
    },
    updateFiltro7(state, payload) {
      state.filtros.f7 = payload;
    },
    updateFiltro8(state, payload) {
      state.filtros.f8 = payload;
    },
    updateFiltro9(state, payload) {
      state.filtros.f9 = payload;
    },
    updateFiltro10(state, payload) {
      state.filtros.f10 = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
