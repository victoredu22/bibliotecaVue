import Vue from "vue";
import Vuex from "vuex";
import libros from "./modules/libros";
import menu from "./modules/menu";
import pedidos from "./modules/pedidos";
import alumnos from "./modules/alumnos";
import pages from "./modules/pages";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		accessToken: "" || localStorage.getItem("accessToken"),
		autenticado: false || localStorage.getItem("autenticado"),
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
			localStorage.removeItem("coordinadora");

			state.accessToken = "";
			state.coordinadora = "";
			state.autenticado = false;
		},
	},
	actions: {
		setAccessToken(context, token) {
			context.commit("SET_ACCESS_TOKEN", token);
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
		pages
	},
});
