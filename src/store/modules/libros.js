export default {
	namespaced: true,
	state: {
		jsonLibros: [],
		activeLibro: "",
	},
	mutations: {
		cambioJsonLibro(state, payload) {
			state.jsonLibros = payload;
		},
		addNewLibroJson(state, payload) {
			state.jsonLibros.push(payload);
		},
		activeLibro(state, payload) {
			state.activeLibro = state.jsonLibros.find(
				(libro) => libro.idLibro === payload
			);
		},
		setLibro(state, payload) {
			state.jsonLibros = state.jsonLibros.map((libro) =>
				libro.idLibro === payload.idLibro ? { ...payload } : libro
			);
		},
		reduceStockLibro(state, payload) {
			state.jsonLibros = state.jsonLibros.map((libro) =>
				libro.idLibro === payload ? ({cantidad: libro.cantidad --, ...libro}) : libro
			);
		},
		uploadDataLibros(state,payload){
			state.jsonLibros = payload.map(libro => ({
        ...libro,
        'dataLibro': `${libro.nombreLibro}`,
      }));
		}
	},
	actions: {
		updateLibro({ commit }, payload) {
			commit("cambioJsonLibro", payload);
		},
		addNewLibro({ commit }, payload) {
			commit("addNewLibroJson", payload);
		},
		activeLibro({ commit }, payload) {
			commit("activeLibro", payload);
		},
		setLibro({ commit }, payload) {
			commit("setLibro", payload);
		},
		reduceStockLibro({ commit }, payload) {
			commit("reduceStockLibro", payload);
		},
		uploadDataLibros({commit},payload){
			commit('uploadDataLibros',payload);
		}
	},
	getters: {},
};
