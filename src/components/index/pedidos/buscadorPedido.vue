<template>
	<div class="row">
		<div class="col-md-12 mb-2">
			<span class="searchNav">
				<i class="fas fa-search"></i>
			</span>
			<input
				v-on:keyup="searchProducto"
				v-model="buscador"
				type="text"
				class="form-control searchProducto w-100"
				placeholder="Buscar Pedido"
				autoComplete="off"
			/>
		</div>
	</div>
</template>
<script>

import { mapActions, mapState } from "vuex";
import { paginationData } from "@/helper/pagination";
import { formateoFecha } from "@/helper/fechaSql";
export default {
	data: () => ({
    buscador:''
  }),
	computed: {
  
  },
	methods: {
    ...mapActions("pages", ["loadItems"]),
    ...mapActions("pages", ["loadData"]),
		async searchProducto() {

			const { data } = await this.axios.get(
				`api/searchPedido?buscador=${this.buscador}`
			);

			const pedidos = data.resultadoBusqueda.data;
			const formatPedidos = pedidos.map((pedido) => ({
				 ...pedido,
				fechaEntrega: formateoFecha(pedido.fechaEntrega),
				fechaRetiro:formateoFecha(pedido.fechaRetiro),
			}));

			this.loadData(formatPedidos);
			this.loadItems(data.pagination);
			const paginacion = paginationData(this.offset, data.pagination);

		},
	},
};
</script>
<style scoped>
.searchProducto {
	padding-left: 25px;
	height: 40px;
	width: 300px;
}
.searchNav {
	position: absolute;
	margin-left: 5px;
	height: 40px;
	display: flex;
	align-items: center;
}
</style>
