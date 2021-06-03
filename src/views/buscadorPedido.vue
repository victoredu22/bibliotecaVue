<template>
	<div class="card">
		<div class="card-body">
			<div class="row">
				<div class="col-md-3">
					<h4>Listado de pedidos</h4>
					<span>{{ dataPage.length }} productos encontrados </span>
					<filtro />
				</div>
				<div class="col-md-9">
					<buscador class="buscadorPedido"/>
					<itemsPedido />
					<paginationPedido />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import buscador from "../components/pedidos/buscadorPedido";
import itemsPedido from "../components/pedidos/cardPedido";
import paginationPedido from "../components/pedidos/paginacionPedido";
import checkCurso from "../components/cursos/checkCursos";
import filtro from "../components/menu/filtrosBusqueda";
import { pedidosItems, formatFechaPedido } from "@/helper/listadoItems";

export default {
	components: {
		buscador,
		itemsPedido,
		checkCurso,
		filtro,
		paginationPedido,
	},
	data: () => ({
		selectedAlumno: "",
		dataAlumno: [],
		hola: false,
	}),
	computed: {
		...mapState("pages", ["dataPage"]),
		...mapState("alumnos", ["activeAlumno"]),
		...mapState("cursos", ["activeCurso"]),
		...mapState("pedidos", ["buscador"]),
	},
	methods: {
		...mapActions("pages", ["loadItems"]),
		...mapActions("pages", ["loadData"]),
		...mapActions("menu",["loadNavbar"]),
		verFecha() {
			console.log("hoa");
		},
		async loadCardItems() {
			const { data } = await pedidosItems({
				page: 1,
				activeAlumno: this.activeAlumno,
				idCursos: this.activeCurso,
				buscador: this.buscador,
			});

			const pedidos = formatFechaPedido(data.getPedidos.data);

			this.loadData(pedidos);
			this.loadItems(data.pagination);
		},
	},
	mounted() {
		
		this.loadNavbar([{id:0},{id:2}]);


		this.loadCardItems();
	},
};
</script>
<style scoped>
@media (max-width: 768px) {
	.buscadorPedido {
		padding-top: 5%;
		margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
	}
}
</style>