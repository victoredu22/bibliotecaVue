<template>
	<div class="card">
		<div class="card-body">
			<div class="row">
				<h5 class="header-title mb-4">
					Libros mas pedidos ultimamente
				</h5>
			</div>		
			<PuSkeleton v-if="tablaPedidos" :count="2"/> 
			<div class="row" >
				<apexchart
					v-if="carga"
					type="donut"
					width="500px"
					:options="chartOptions"
					:series="series"
				></apexchart>
			</div>
			<div class="text-center">
				<p>
					Grafico relacionado a los pedidos del ultimo mes.
				</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data: () => ({
		series: [],
		//series: [1, 1],
		chartOptions: {
			chart: {
				width: 300,
				type: "donut",
			},
			labels: [],
			//labels: ['Team A', 'Team B'],
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200,
						},
						legend: {
							position: "top",
						},
					},
				},
			],
		},
		carga:false,
	}),
	computed:{
		tablaPedidos(){
			return (this.chartOptions.labels.length > 0) ? false : true; 
		}
	},
	methods: {
		async loadChart() {
			const { data } = await this.axios.get("api/librosPedidos");
			const { conjuntoLibros } = data;
			const cantidad = conjuntoLibros.map((elem) => elem.cantidad);
			const nombreLibro = conjuntoLibros.map((elem) => elem.nombreLibro);

      this.series = cantidad;
      this.chartOptions.labels = nombreLibro ;
			this.carga = true;		
		},
	},
	created() {
		this.loadChart();
	},
};
</script>
<style scoped>

</style>
