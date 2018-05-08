import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import DDutilev2 from '../components/DDUtil/DDUtilModule/DDutilev2.js'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
export const store = new Vuex.Store({
  namespaced: true,
  state: {
  },
  modules: {
    DDutil: DDutilev2
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  }
})
