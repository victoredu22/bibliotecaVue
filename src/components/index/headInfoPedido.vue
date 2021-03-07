<template>
	<div class="row">
		<div class="col-xl-4">
			<b-alert show variant="info">
				<PuSkeleton v-if="cargaDatos" :count="2" />
				<div  v-else class="alerta"> 
					<h4 class="alert-heading">
						{{ totalPedidos }} Pedidos este mes.
					</h4>
					<p>
						Totalidad de pedidos en el sistema este mes
					</p>
				</div>
			</b-alert>
		</div>
		<div class="col-xl-4">
			<b-alert show variant="warning">
				<PuSkeleton v-if="!dataAlumnos.length > 0" :count="3" />
				<div  v-else class="alerta"> 
				<h4 class="alert-heading">
					{{ dataAlumnos.length }} Alumnos totales.
				</h4>
				<p>
					Totalidad de alumnos inscritos en el sistema. recuerda
					actualizar los alumnos cada año.
				</p>
				</div>
			</b-alert>
			
		</div>
		<div class="col-xl-4">
			<b-alert show variant="success">
	
				<PuSkeleton v-if="!jsonLibros.length > 0" :count="2" />
				<div  v-else class="alerta"> 
					<h4 class="alert-heading">
						{{ jsonLibros.reduce((a, b) => a + b.cantidad, 0) }} Libros en el sistema.
					</h4>
					<p>
						Totalidad de libros en el sistema de biblioteca.
					</p>
				</div>
			</b-alert>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
	data: () => ({
		totalLibros: "",
		totalAlumnos: "",
		totalPedidos: "",
	}),
	computed:{
		...mapState("alumnos", ["dataAlumnos"]),
		...mapState("libros", ["jsonLibros"]),
		cargaDatos(){
			return (this.totalPedidos.length != "") ? false : true; 
		}
	},
	methods: {
		async loadInfo() {

			const { data: dataPedidos } = await this.axios.get(
				"api/pedidosMes"
			);
			const { getPedidos } = dataPedidos;
			this.totalPedidos = getPedidos.length;

		},
	},
	mounted() {
		this.loadInfo();
	},
};
</script>
