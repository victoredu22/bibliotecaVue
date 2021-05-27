<template>
	<div class="row">
		<div class="col-xl-12">
			<div class="card ">
				<div class="card-body">
					<h5 class="header-title pb-2">
						Historial de pedidos
					</h5>

					<div class="row mb-2">
						<div class="col-md-10 col-xs-10">
							<label class="text-muted"
								>A continuacion verás el listado de libros
								arrendados segun su fecha correspondiente.
							</label>
						</div>
						<div class="col-md-2 col-xs-2">
							<b-button
								class="btnPedido"
								variant="outline-info"
								v-b-modal.modal-nuevoPedido
							>
								<i class="fas fa-plus"></i>
								Crear pedido
							</b-button>
						</div>
					</div>

					<PuSkeleton v-if="puSkeleton" :count="5" />
					<div v-else>
						<hr />
						<buscadorPedido />
						<cardPedido />
						<paginationPedido />
					</div>

					<modalNuevoPedido />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import paginationPedido from "@/components/pedidos/paginacionPedido";
import cardPedido from "@/components/pedidos/cardPedido";
import buscadorPedido from "@/components/pedidos/buscadorPedido";
import modalNuevoPedido from "@/components/pedidos/modal/nuevoPedido";
import { pedidosItems, formatFechaPedido } from "@/helper/listadoItems";
export default {
	components: {
		cardPedido,
		paginationPedido,
		buscadorPedido,
		modalNuevoPedido,
	},
	data: () => ({
		puSkeleton: true,
	}),
	computed: {
		...mapState("cursos",["activeCurso"]),
		...mapState("alumnos",["activeAlumno"]),
		...mapState("pedidos",["buscador"]),
	},
	methods: {
		...mapActions("pages", ["loadItems"]),
		...mapActions("pages", ["changePagination"]),
		...mapActions("pages", ["loadData"]),
		...mapActions("pages", ["changePedido"]),
		async getTable(page) {
			this.changePedido(false);

			const { data } = await pedidosItems({
				activeAlumno:this.activeAlumno,
        buscador:this.buscador,
        idCursos:this.activeCurso,
				page: 1,
			});
			const pedidos = formatFechaPedido(data.getPedidos.data);

			this.loadData(pedidos);
			this.changePedido(true);
			this.loadItems(data.pagination);
			this.puSkeleton = false;
		},
	},
	mounted() {
		this.getTable();
	},
};
</script>
<style>
.btnPedido {
	float: float-right;
}
@media (max-width: 768px) {
	.btnPedido {
		width: 100% !important;
	}
}
</style>
