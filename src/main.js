import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { BootstrapVue ,BootstrapVueIcons} from 'bootstrap-vue'
import '@/assets/js/bootstrap.bundle.min.js'

import vRut from 'v-rut';
Vue.use(vRut)


Vue.use(BootstrapVue,axios)
import {ServerTable, ClientTable} from 'vue-tables-2';
Vue.use(ClientTable,{},false, 'bootstrap4','default');
Vue.use(ServerTable,{},false, 'bootstrap4','default');


import 'bootstrap-vue/dist/bootstrap-vue.css'


import '@/assets/css/bootstrap.css'
import '@/assets/css/icons.min.css'
import '@/assets/css/app.min.css'

import '@/assets/libs/metismenu/metisMenu.min.css'
import '@/assets/libs/metismenu/metisMenu.min.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
