export default {
	namespaced: true,
	state: {
		jsonPedido: [],
		active: "",
	},
	mutations: {
		cambioJsonPedido(state, payload) {
			state.jsonPedido = payload;
		},
		activePedido(state, payload) {
			state.active = state.jsonPedido.find(
				(pedido) => pedido.idPedido === payload
			);
		},
		updateEstado(state, payload) {
			state.jsonPedido = state.jsonPedido.map((pedido) =>
				pedido.idPedido === payload.idPedido
					? { ...pedido, estado: payload.estado }
					: pedido
			);
    },
    addPedido(state,payload){
      state.jsonPedido.push({
        ...payload.pedido,
        nombreAlumno: `${payload.infoAlumno.infoAlumno} ${payload.infoAlumno.apellido}`,
        nombreLibro: `${payload.infoLibro.nombreLibro}`
      });
    }
	},
	actions: {
		updatePedido({ commit }, payload) {
			commit("cambioJsonPedido", payload);
		},
		activePedido({ commit }, payload) {
			commit("activePedido", payload);
		},
		updateEstado({ commit }, payload) {
			commit("updateEstado", payload);
    },
    addPedido({commit},payload){
      commit("addPedido",payload)
    }
	},
	getters: {},
};