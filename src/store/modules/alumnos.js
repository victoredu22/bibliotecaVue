
export default {
  namespaced:true,
  state:{
      dataAlumnos:[],
  },
  mutations:{
    uploadAlumnos(state,payload){
      state.dataAlumnos = payload.map(user => ({
        ...user,
        'dataAlumno': `${user.numeroDocumento} ${user.nombre} ${user.apellido}`,
      }));
    }
  },
  actions:{
    uploadAlumnos({commit},payload){
      commit('uploadAlumnos',payload);
    }
  },
  getters:{
     
  }
}