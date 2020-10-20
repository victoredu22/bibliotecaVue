
export default {
    namespaced:true,
    state:{
        jsonLibros:[],
    },
    mutations:{
        cambioJsonLibro(state,payload){
            state.jsonLibros = payload;
        },
    },
    actions:{
        updateLibro({commit},payload){
            commit('cambioJsonLibro',payload)
        }
    },
    getters:{
       
    }
}