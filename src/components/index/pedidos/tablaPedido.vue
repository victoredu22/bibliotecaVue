<template>
	<div class="row">
		<div class="col-xl-12">
			<div class="card ">
				<div class="card-body">
					<h5 class="header-title pb-2">
						Historial de pedidos
					</h5>

					<div class="row mb-2">
						<div class="col-10">
							<label class="text-muted"
								>A continuacion verás el listado de libros
								arrendados segun su fecha correspondiente.
							</label>
						</div>
						<div class="col-2">
							<b-button
								class="float-right"
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
import { paginationData } from "../../../helper/pagination";
import paginationPedido from "./paginacionPedido";
import cardPedido from "./cardPedido";
import buscadorPedido from "./buscadorPedido";
import modalNuevoPedido from "../modal/nuevoPedido";
import { formateoFecha } from "../../../helper/fechaSql";

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
	computed: {},
	methods: {
		...mapActions("pages", ["loadItems"]),
		...mapActions("pages", ["changePagination"]),
		...mapActions("pages", ["loadData"]),
		...mapActions("pages", ["changePedido"]),
		async getTable(page) {
			this.changePedido(false);
			const { data } = await this.axios.get(
				`api/pedidosAll?page=${page}`
			);
			const pedidos = data.getPedidos.data;
			const formatPedidos = pedidos.map((pedido) => ({
				...pedido,
				fechaEntrega: formateoFecha(pedido.fechaEntrega),
				fechaRetiro: formateoFecha(pedido.fechaRetiro),
			}));

			this.loadData(formatPedidos);
			this.changePedido(true);
			this.loadItems(data.pagination);
			this.puSkeleton = false;
			paginationData(this.offset, data.pagination);
		},
	},
	mounted() {
		this.getTable();
	},
};
</script>
