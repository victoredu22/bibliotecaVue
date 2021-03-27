export default {
	namespaced: true,
	state: {
		pedidoMes:'',
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
    },
		cambioPedidoMes(state,payload){
			state.pedidoMes = payload;
		}
	},
	actions: {
		updatePedido({ commit }, payload) {
			commit("cambioJsonPedido", payload);
		},
		updatePedidoMes({commit},payload){
			commit('cambioPedidoMes',payload);
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
