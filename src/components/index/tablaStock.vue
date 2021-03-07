<template>
	<div class="card ">
		<div class="card-body">
			<h5 class="header-title mb-4">
				Libros sin stock
			</h5>
			<div class="media">
				<div class="media-body">
					<p class="text-muted">
						Libros que no tienen stock en el sistema
					</p>
					<PuSkeleton v-if="tablaLibro" :count="5" />
					<b-table
						v-else
						striped
						hover
						:items="itemsLibro"
						:fields="fieldsLibro"
					></b-table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data: () => ({
		itemsLibro: [],
		fieldsLibro: [],
	}),
	computed: {
		tablaLibro() {
			return this.itemsLibro.length > 0 ? false : true;
		},
	},
	methods: {
		async loadDataStock() {
			const { data } = await this.axios.get("api/librosSinStock");
			const { librosSinStock } = data;
			const fieldsLibro = ["id_libro", "nombre_libro", "cantidad"];

			this.itemsLibro = librosSinStock.map((elem) => ({
				id_libro: elem.idLibro,
				nombre_libro: elem.nombreLibro,
				cantidad: elem.cantidad,
			}));
		},
	},
	created() {
		this.loadDataStock();
	},
};
</script>
