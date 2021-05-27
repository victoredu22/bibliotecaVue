<template>
	<div>
		<v-client-table :data="jsonLibros" :columns="columns" :options="options">
			<b-button
				slot="arriendo"
				slot-scope="propsAlumno"
				v-b-modal.modal-arriendo
				@click="arriendoModal(propsAlumno.row.idLibro)"
				variant="outline-primary"
			>
				<i class="fas fa-graduation-cap"></i>
				Arriendo libro alumno
			</b-button>
			<b-button
				slot="opcion"
				slot-scope="propsAlumno"
				v-b-modal.modal-editar
				@click="editarModal(propsAlumno.row.idLibro)"
				variant="outline-success"
			>
				<i class="far fa-edit"></i>
				Editar Libro
			</b-button>
		</v-client-table>
    <modalArriendo ref="componente"></modalArriendo>
    <editarArriendo ref="componenteEditar"></editarArriendo>
	</div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import modalArriendo from './modal/arriendoLibro'
import editarArriendo from './modal/editarLibro'
export default {
  components:{
    modalArriendo,
    editarArriendo
  },
	data: () => ({
    	columns: [
				"idLibro",
				"nombreLibro",
				"autor",
				"cantidad",
				"arriendo",
				"opcion",
			],
			options: {
				// see the options API
			},
  }),
  computed:{
    ...mapState("libros", ["jsonLibros"]),
  },
  methods:{
    ...mapActions("libros", ["activeLibro"]),
    arriendoModal(idLibro) {
			this.activeLibro(idLibro);
			this.$refs.componente.envioDatos();
		},
    editarModal(idLibro) {

			this.activeLibro(idLibro);
			this.$refs.componenteEditar.datosLibro();
		},
  }
};
</script>
