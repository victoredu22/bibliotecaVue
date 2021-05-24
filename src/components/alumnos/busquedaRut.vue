<template>
	<div>
	 	<v-select
			placeholder="Haz click para seleccionar alumno..."
			:options="dataAlumnos"
			label="dataAlumno"
			v-model="selectedAlumno"
      v-bind=seleccion
			@input="seleccionAlumno()"
		>
			<template slot="options" slot-scope="options">
				{{ options.nombre }}
			</template>
		</v-select>

	</div>
</template>
<script>
import {mapActions, mapState} from 'vuex';
import {fetchToken} from '@/helper/axios';
import {pedidosItems, formatFechaPedido} from '@/helper/listadoItems';

export default {
	data: () => ({
    selectedAlumno:''
  }),
  computed:{
    ...mapState('alumnos',['dataAlumnos']),
    ...mapState('alumnos',['activeAlumno']),
    ...mapState("cursos", ["activeCurso"]),
    ...mapState("pedidos",["buscador"]),
    seleccion(){

      return this.activeCurso.length >= 0 ? this.selectedAlumno = '' : this.selectedAlumno;
    }
  },
  methods:{
    ...mapActions('alumnos',['uploadAlumnos']),
    ...mapActions('alumnos',['setActiveAlumno']),
    ...mapActions("pages", ["loadItems"]),
		...mapActions("pages", ["loadData"]),
    async cargaAlumnos(){
      const {data} = await fetchToken('alumnos');
			const {alumnos} = data;

      this.uploadAlumnos(alumnos);
    },

    async seleccionAlumno(){

      this.setActiveAlumno(this.selectedAlumno);
  
      const {data} = await pedidosItems({
				activeAlumno:this.activeAlumno,
        buscador:this.buscador,
				page: 1,
			});

   
      const pedidos = formatFechaPedido(data.getPedidos.data);

      this.loadData(pedidos);
			this.loadItems(data.pagination);

    }
  },
  created(){
    this.cargaAlumnos();
  }
};
</script>
