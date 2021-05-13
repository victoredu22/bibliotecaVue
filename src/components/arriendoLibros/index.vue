<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-9 mb-4">
				<div class="card">
					<div class="card-body">
						<h5 class="header-title mb-4">
							<i class="fas fa-users"></i> Listado Libros
						</h5>
						<p class="card-title-desc">
							A continuacion podras ver el listado completo en el
							libro.
						</p>
						<v-client-table
							:data="jsonLibros"
							:columns="columns"
							:options="options"
						>
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
					</div>
				</div>
			</div>
			<div class="col-md-3">
				<div class="card">
					<div class="card-body">
						<h5 class="header-title mb-4">
							<i class="fas fa-book-medical"></i> Agregar un nuevo
							libro
						</h5>
						<p class="card-title-desc">
							Haz click para agregar libros para poder agregar uno
							nuevo.
						</p>
						<b-button
							v-b-modal.modal-nuevoLibro
							class="w-100"
							variant="outline-info"
						>
							<i class="far fa-plus-square"></i>
							Agregar libro
						</b-button>
					</div>
				</div>
			</div>
		</div>
		<modalArriendo ref="componente"></modalArriendo>
		<modalLibro></modalLibro>
		<editarLibro ref="componenteEditar"></editarLibro>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import modalArriendo from "./modal/arriendoLibro.vue";
import modalLibro from "./modal/nuevoLibro";
import editarLibro from "./modal/editarLibro";
export default {
	components: {
		modalArriendo,
		modalLibro,
		editarLibro,
	},
	data() {
		return {
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
		};
	},
	computed: {
		...mapState("libros", ["jsonLibros"]),
	},
	methods: {
		...mapActions('alumnos',['uploadAlumnos']),
		...mapActions("libros", ["updateLibro"]),
		...mapActions("libros", ["activeLibro"]),
		...mapActions("menu", ["updateMenu"]),
		...mapActions("menu", ["updateTitulo"]),
		arriendoModal(idLibro) {
			this.activeLibro(idLibro);
			this.$refs.componente.envioDatos();
		},
		async loadAlumnos() {
			const {data} = await this.axios.get('api/alumnos');
			const {alumnos} = data;

			this.uploadAlumnos(alumnos);
		},
		editarModal(idLibro) {

			this.activeLibro(idLibro);
			this.$refs.componenteEditar.datosLibro();
		},
		cargaTabla() {
			this.axios.get("api/libros").then((res) => {
				this.updateLibro(res.data.libros);
			});
		},
	},
	created() {
		//this.cargaTabla();

		let menu = [
			{
				urlTolbar: "index",
				nameToolbar: "Inicio",
			},
			{
				urlTolbar: "arriendo-libros",
				nameToolbar: "Arriendo-libros",
			},
		];
		let titulo = "Panel Arriendo Libros";

		this.updateTitulo(titulo);
		this.updateMenu(menu);
		this.loadAlumnos()
	},
};
</script>
