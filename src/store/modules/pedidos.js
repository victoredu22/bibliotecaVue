export default {
	namespaced: true,
	state: {
		jsonPedido: [],
		active: "",
		buscador:undefined
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
		changePedido(state,payload){
			state.active.estado = payload.estado
		},
		updateEstado(state, payload) {
			state.jsonPedido = state.jsonPedido.map((pedido) =>
				pedido.idPedido === payload.idPedido
					? { ...pedido, estado: payload.estado }
					: pedido
			);
    },
    addPedido(state,payload){
      state.jsonPedido.push(payload);
    },
		loadBuscador(state,payload){
			state.buscador = payload;
		}
	},
	actions: {
		updatePedido({ commit }, payload) {
			commit("cambioJsonPedido", payload);
		},
		activePedido({ commit }, payload) {
			commit("activePedido", payload);
		},
		changeActivePedido({commit},payload){
			commit("changePedido",payload)
		},
		updateEstado({ commit }, payload) {
			commit("updateEstado", payload);
    },
    addPedido({commit},payload){
      commit("addPedido",payload)
    },
		loadBuscador({commit},payload){
			commit("loadBuscador",payload)
		}
	},
	getters: {},
};
