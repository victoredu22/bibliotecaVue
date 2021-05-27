<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-body">
					<div class="row">
						<div class="col-12">
							<div class="row">
								<div class="col-3">
									<h4>Listado de pedidos</h4>
									<span>{{dataPage.length}} productos encontrados </span>
								</div>
								<div class="col-9">
									<buscador />
								</div>
							</div>
						</div>
						<div class="col-3">
							<filtro />
						</div>
						<div class="col-9">
							<itemsPedido />
							<paginationPedido />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-xl-9"></div>
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
	computed:{
		...mapState("pages", ["dataPage"]),
		...mapState("alumnos",["activeAlumno"]),
		...mapState("cursos",["activeCurso"]),
		...mapState("pedidos",["buscador"]),
	},
	methods: {
		...mapActions("menu", ["updateMenu"]),
		...mapActions("menu", ["updateTitulo"]),
		...mapActions("pages", ["loadItems"]),
		...mapActions("pages", ["loadData"]),
		verFecha(){
			console.log('hoa');
		},
		async loadCardItems() {
			const {data} = await pedidosItems({
				page: 1,
				activeAlumno:this.activeAlumno,
				idCursos:this.activeCurso,
				buscador:this.buscador,
			});

			const pedidos = formatFechaPedido(data.getPedidos.data);
			
		 	this.loadData(pedidos);
			this.loadItems(data.pagination);
		},
	},
	mounted() {
		let menu = [
			{
				urlTolbar: "index",
				nameToolbar: "Inicio",
			},
			{
				urlTolbar: "buscador-pedido",
				nameToolbar: "Buscador-pedido",
			},
		];
		let titulo = "Home";

		this.updateTitulo(titulo);
		this.updateMenu(menu);

		this.loadCardItems();
	},
};
</script>
