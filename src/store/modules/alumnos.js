
export default {
  namespaced:true,
  state:{
      dataAlumnos:[],
      activeAlumno:undefined
  },
  mutations:{
    uploadAlumnos(state,payload){
      state.dataAlumnos = payload.map(user => ({
        ...user,
        'dataAlumno': `${user.numeroDocumento} ${user.nombre} ${user.apellido}`,
      }));
    },
    setActiveAlumno(state,payload){
      state.activeAlumno = payload;
    }
  },
  actions:{
    uploadAlumnos({commit},payload){
      commit('uploadAlumnos',payload);
    },
    setActiveAlumno({commit},payload){
      commit('setActiveAlumno',payload);
    }
  },
  getters:{
     
  }
}