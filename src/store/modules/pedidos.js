
export default {
  namespaced:true,
  state:{
      jsonPedido:[],
  },
  mutations:{
      cambioJsonPedido(state,payload){
          state.jsonPedido = payload;
      },
  },
  actions:{
      updatePedido({commit},payload){
          commit('cambioJsonPedido',payload)
      }
  },
  getters:{
     
  }
}