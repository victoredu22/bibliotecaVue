<template>
	<div>
		<nav aria-label="Page navigation example">
			<ul class="pagination justify-content-center">
				<li v-if="pagination.current_page > 1">
					<a
						class="page-link"
						href="#"
						@click.prevent="changePage(pagination.current_page - 1)"
						>Atras</a
					>
				</li>
				<li
					class="page-item"
					v-for="(page, index) in numPaginas"
					:key="index"
					:class="[page === pagination.current_page && 'active']"
				>
					<a
						class="page-link"
						href="#"
						@click.prevent="changePage(page)"
						>{{ page }}</a
					>
				</li>
				<li v-if="pagination.current_page < pagination.last_page">
					<a
						class="page-link"
						href="#"
						@click.prevent="changePage(pagination.current_page + 1)"
						>Siguiente</a
					>
				</li>
			</ul>
			<p class="text-center">{{ dataPage.length }} Items encontrados</p>
		</nav>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { paginationData } from "@/helper/pagination";

import { pedidosItems, formatFechaPedido } from "@/helper/listadoItems";

export default {
	data: () => ({
		pageNumber: {},
	}),
	computed: {
		...mapState("pages", ["pagination"]),
		...mapState("pages", ["offset"]),
		...mapState("pages", ["dataPage"]),
		...mapState("pages", ["loadPedido"]),
		...mapState("cursos", ["activeCurso"]),
		...mapState('alumnos',['activeAlumno']),
		...mapState('pedidos',['buscador']),
		numPaginas() {
			return paginationData(this.offset, this.pagination);
		},
	},
	methods: {
		...mapActions("pages", ["loadItems"]),
		...mapActions("pages", ["changePagination"]),
		...mapActions("pages", ["loadData"]),
		...mapActions("pages", ["changePedido"]),
		async getTable(page) {
		

			this.changePedido(false);
			const idCursos = this.activeCurso.map((curso) => curso.idCurso);
			
			console.log('holaaa'+this.buscador);

			
			const { data: dataPedido } = await pedidosItems({
				activeAlumno: this.activeAlumno,
				activeCurso: this.activeCurso.length,
				buscador: this.buscador,
				idCursos,
				page,
			});

			
			

			const pedidos = formatFechaPedido(dataPedido.getPedidos.data);

			this.loadData(pedidos);
			this.changePedido(true);
			this.loadItems(dataPedido.pagination);
			this.pageNumber = paginationData(
				this.offset,
				dataPedido.pagination
			);
		},

		changePage(page) {
			//this.paginationLoad.current_page = page;
			this.changePagination(page);
			this.getTable(page);
		},
	},
};
</script>
