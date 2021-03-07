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
				<PuSkeleton v-if="cargaDatos" :count="3" />
				<div  v-else class="alerta"> 
				<h4 class="alert-heading">
					{{ totalAlumnos }} Alumnos totales.
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
				<PuSkeleton v-if="cargaDatos" :count="2" />
				<div  v-else class="alerta"> 
					<h4 class="alert-heading">
						{{ totalLibros }} Libros en el sistema.
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
export default {
	data: () => ({
		totalLibros: "",
		totalAlumnos: "",
		totalPedidos: "",
	}),
	computed:{
		cargaDatos(){
			return (this.totalPedidos.length != "") ? false : true; 
		}
	},
	methods: {
		async loadInfo() {
			const { data: dataLibros } = await this.axios.get("api/libros");
			const { libros } = dataLibros;
			this.totalLibros = libros.reduce((a, b) => a + b.cantidad, 0);

			const { data: dataAlumnos } = await this.axios.get("api/alumnos");
			const { alumnos } = dataAlumnos;
			this.totalAlumnos = alumnos.length;

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
