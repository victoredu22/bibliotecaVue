import Vue from "vue";
import Vuex from "vuex";
import libros from "./modules/libros";
import menu from "./modules/menu";
import pedidos from "./modules/pedidos";
import alumnos from "./modules/alumnos";
import pages from "./modules/pages";
import cursos from './modules/cursos';
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		accessToken: "" || localStorage.getItem("accessToken"),
		autenticado: false || localStorage.getItem("autenticado"),
		usuario: ''
	},
	mutations: {
		SET_ACCESS_TOKEN(state, token) {
			localStorage.setItem("accessToken", token);
			localStorage.setItem("autenticado", true);
			state.accessToken = token;
			state.autenticado = true;
		},
		REMOVE_ACCESS_TOKEN(state) {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("autenticado");

			state.accessToken = "";
			state.autenticado = false;
		},
		setUsuario(state,payload){
			state.usuario = payload;
		}
	},
	actions: {
		setAccessToken(context, token) {
			context.commit("SET_ACCESS_TOKEN", token);
		},
		setLoadUsuario({commit},payload){
			commit('setUsuario',payload);
		},
		removeAccessToken(context) {
			context.commit("REMOVE_ACCESS_TOKEN");
		},
  },
  getters:{
    estaActivo: state => !!state.token
  },
	modules: {
		libros,
		menu,
		pedidos,
		alumnos,
		pages,
		cursos
	},
});
