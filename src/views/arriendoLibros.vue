<template>
  <div class="container-fluid ">
		<div class="row rowIngreso" >
				
			<div class="col-md-9 mb-4 listadoLibros">
				<div class="card">
					<div class="card-body">
						<h5 class="header-title mb-4">
							<i class="fas fa-users"></i> Listado Libros
						</h5>
						<p class="card-title-desc">
							A continuacion podras ver el listado completo en el
							libro.
						</p>
            <tablaLibros/>
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
		<modalNuevoLibro/>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import modalNuevoLibro from '../components/libros/modal/nuevoLibro';
import {fetchToken} from '@/helper/axios';
import tablaLibros from '../components/libros/tablaLibros'
export default {
  components: {
    tablaLibros,
		modalNuevoLibro
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("libros", ["updateLibro"]),
		...mapActions("cursos",["uploadCurso"]),
		...mapActions("alumnos",["uploadAlumnos"]),
		...mapActions("menu",['loadNavbar']),
		async loadCursos() {
			const { data } = await fetchToken("cursoAll");
			this.uploadCurso(data.getCurso);
		},
		async loadAlumnos() {
      const { data } = await fetchToken('alumnos');
      const { alumnos } = data;
      this.uploadAlumnos(alumnos);
    },
    async cargaTabla() {
      const { data } = await fetchToken('libros');
      this.updateLibro(data.libros);

      /* this.axios.get("api/libros").then((res) => {
				this.updateLibro(res.data.libros);
			}); */
    },
  },
  created() {
    this.cargaTabla();
		this.loadCursos();
		this.loadAlumnos();

		this.loadNavbar([{id:0},{id:1}]);
  },
};
</script>
<style scoped>
@media (max-width: 768px) {
	.rowIngreso {
    flex-direction: column-reverse;
	}
	.listadoLibros{
		margin-top: 5%;
	}
}
</style>
