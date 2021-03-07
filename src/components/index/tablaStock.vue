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

					<PuSkeleton v-if="!this.jsonLibros.length > 0" :count="5" />
					<b-table
						v-else
						striped
						hover
						:items="librosSinstock"
						:fields="fieldsLibro"
					>
						<template #cell(id_libro)="data">
							{{ data.item.idLibro }}
						</template>
						<template #cell(nombre_libro)="data">
							{{ data.item.nombreLibro }}
						</template>
						<template #cell(cantidad)>
							Sin Stock
						</template>
					</b-table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
	data: () => ({
		itemsLibro: [],
		fieldsLibro: ["id_libro", "nombre_libro", "cantidad"],
	}),
	computed: {
		tablaLibro() {
			return this.itemsLibro.length > 0 ? false : true;
		},
		librosSinstock() {
			return this.jsonLibros.filter((libro) => libro.cantidad === 0);
		},
		...mapState("libros", ["jsonLibros"]),
	},
};
</script>
