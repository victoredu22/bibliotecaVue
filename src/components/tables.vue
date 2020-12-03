<template>
    <div >
    	<b-table striped hover :items="itemsPendientes" :fields="librosPendientes"></b-table>
    </div>
</template>
<script>
export default {
  data(){
    return{
      	librosPendientes: [],
        itemsPendientes: []      
    }
  },
  methods:{
    sendData(titulo,data){
      const addLibros = titulo.map(item => this.librosPendientes.push(item));
      const itemsPendientes = data.map(item => this.itemsPendientes.push(item));
    }
  }
}
</script>