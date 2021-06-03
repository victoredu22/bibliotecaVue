export default {
	namespaced: true,
	state: {
		jsonMenu: [],
	},
	mutations: {
		loadMenu(state, payload) {
			state.jsonMenu = payload;
		},
		trueNavbar(state, payload) {
			state.jsonMenu = state.jsonMenu.map((elem) =>
				payload.find((p) => elem.id === p.id)
					? { ...elem, estado: true }
					: { ...elem, estado: false }
			);
		},
	},
	actions: {
		loadMenu({ commit }, payload) {
			commit("loadMenu", payload);
		},
		loadNavbar({ commit }, payload) {
			commit("trueNavbar", payload);
		},
	},
	getters: {},
};
