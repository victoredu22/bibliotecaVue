<template>
	<div class="card ">
		<div class="card-body">
			<h5 class="header-title mb-4">
				Libros sin stock
			</h5>
			<div class="media">
				<div data-v-76b02066="" class="row">
					<div data-v-76b02066="" class="col-4 nombreLibro">
						<label >7</label>
					</div>
					<div data-v-76b02066="" class="col-8 text-center">
						Guíaburros Criptomonedas
					</div>
				</div>

				<div class="media-body">

					
					<!-- <b-alert v-if="librosSinstock.length === 0" show variant="info">No se encuentran libros sin stock.</b-alert>
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
					</b-table>  -->
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
