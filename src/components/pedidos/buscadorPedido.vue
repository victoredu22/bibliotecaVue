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
import { pedidosItems, formatFechaPedido } from "@/helper/listadoItems";

export default {
	data: () => ({
		buscador: "",
	}),
	computed: {
		...mapState("cursos", ["activeCurso"]),
		...mapState("alumnos", ["activeAlumno"]),
	},
	methods: {
		...mapActions("pages", ["loadItems"]),
		...mapActions("pages", ["loadData"]),
		...mapActions("pedidos", ["loadBuscador"]),

		async searchProducto() {
			this.loadBuscador(this.buscador);

			const idCursos = this.activeCurso.map((curso) => curso.idCurso);

			const { data } = await pedidosItems({
				activeAlumno:this.activeAlumno,
				activeCurso: this.activeCurso.length,
				buscador: this.buscador,
				idCursos,
				page:1
			});
			console.log(data);
			

			const pedidos = formatFechaPedido(data.getPedidos.data);

			this.loadData(pedidos);
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
