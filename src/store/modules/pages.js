import { _ } from "core-js";

export default {
	namespaced: true,
	state: {
		dataPage: {},
		loadPedido: false,
		pagination: {
			total: 0,
			current_page: 0,
			per_page: 0,
			last_page: 0,
			from: 0,
			to: 0,
		},
		offset: 3,
		active:{},
	},
	mutations: {
		loadData(state, payload) {
			state.dataPage = payload;
		},
		loadPagination(state, payload) {
			state.pagination = payload;
		},
		cambioPagination(state, payload) {
			state.pagination.current_page = payload;
		},
		loadPedido(state, payload) {
			state.loadPedido = payload;
		},
		updateEstadoPedido(state, payload) {
			state.dataPage = state.dataPage.map((data) =>
				data.idPedido === payload.idPedido
					? { ...data, estado: payload.estado,estadoEntrega: payload.estadoEntrega  }
					: { ...data }
			);
		},
		addPedidoItem(state,payload){
			state.dataPage.push({...payload});
		},
		activePedido(state, payload) {
			state.active = state.dataPage.find(
				(pedido) => pedido.idPedido === payload
			);
		},
		changePedido(state,payload){
			state.active.estado = payload.estado
		},
	},
	actions: {
		loadData({ commit }, payload) {
			commit("loadData", payload);
		},
		activePedido({commit},payload){
			commit('activePedido',payload);
		},
		addPedidoData({commit},payload){
			commit("addPedidoItem",payload);	
		},		
		changePedido({ commit }, payload) {
			commit("loadPedido", payload);
		},
		loadItems({ commit }, payload) {
			commit("loadPagination", payload);
		},
		changePagination({ commit }, payload) {
			commit("cambioPagination", payload);
		},
		paginasActuales({ commit }, payload) {
			commit("paginasActuales", payload);
		},
		updateEstadoPedido({ commit }, payload) {
			commit("updateEstadoPedido", payload);
		},
		changeActivePedido({commit},payload){
			commit("changePedido",payload)
		},
	},
};
