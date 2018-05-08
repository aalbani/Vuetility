import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'

Vue.use(Vuex)

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App)
})
