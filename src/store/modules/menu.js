
export default {
    namespaced:true,
    state:{
        jsonTitulo:'',
        jsonMenu:[],
    },
    mutations:{
        updateJsonMenu(state,payload){
            state.jsonMenu = payload;
        },
        updateJsonTitulo(state,payload){
            state.jsonTitulo = payload;
        }
    },
    actions:{
        updateMenu({commit},payload){
            commit('updateJsonMenu',payload)
        },
        updateTitulo({commit},payload){
            commit('updateJsonTitulo',payload)
        }
    },
    getters:{
       
    }
}