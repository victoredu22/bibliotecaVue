export default {
	namespaced: true,
	state: {
		dataCursos: [],
		activeCurso: [],
	},
	mutations: {
		uploadCurso(state, payload) {
			state.dataCursos = payload;
		},
		checkCurso(state, payload) {

			const cursoEncontrado = state.activeCurso.filter(
				(curso) => curso.idCurso === payload.idCurso
			);

			state.activeCurso =
        cursoEncontrado.length === 0
					? [...state.activeCurso, payload]
					: state.activeCurso.filter(
							(curso) => curso.idCurso !== payload.idCurso
					  );
		},
	},
	actions: {
		uploadCurso({ commit }, payload) {
			commit("uploadCurso", payload);
		},
		startActiveCurso({ commit }, payload) {
			commit("checkCurso", payload);
		},
	},
	getters: {},
};
