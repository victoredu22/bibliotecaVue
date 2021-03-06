
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue ,BootstrapVueIcons} from 'bootstrap-vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import Skeleton from 'vue-loading-skeleton';
import $ from 'jquery'
import toastr from 'toastr'


import VCalendar from 'v-calendar';


Vue.use(VCalendar, {
  componentPrefix: 'vc',
});





import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

Vue.component('calendar', Calendar)
Vue.component('date-picker', DatePicker)







Vue.component('v-select', vSelect)

import '@fortawesome/fontawesome-free/js/all.js';
Vue.use(Skeleton)



import moment from 'moment'
Vue.prototype.moment = moment
require('moment/locale/es')




import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)


import vRut from 'v-rut';
Vue.use(vRut)

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue,axios)
import {ServerTable, ClientTable} from 'vue-tables-2';
Vue.use(ClientTable,{},false, 'bootstrap4','default');
Vue.use(ServerTable,{},false, 'bootstrap4','default');

import "animate.css";

// Agregamos la URL base de nuestra API
axios.defaults.baseURL = process.env.VUE_APP_RUTA_API;
//axios.defaults.baseURL = 'http://localhost:8000';
//axios.defaults.baseURL = 'https://api.cumbresanramon.cl/';


/* 
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
Vue.use(VueSidebarMenu)
 */

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
/* import '@/assets/css/bootstrap.css' */
import '@/assets/css/icons.min.css' 
import '@/assets/css/app.min.css'
import './assets/css/menuModal.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
