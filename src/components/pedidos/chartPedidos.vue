<template>
	<div class="card">
		<div class="card-body">
			<div class="col-md-12">
				<h5 class="header-title mb-4">
					Libros mas pedidos ultimamente
				</h5>
			</div>
			<PuSkeleton v-if="tablaPedidos" :count="2" />
			<apexchart
				v-if="carga"
				type="donut"
				width="350px"
				:options="chartOptions"
				:series="series"
			/>
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
				width: 350,
				type: "donut",
			},
			labels: [],
			//labels: ['Team A', 'Team B'],
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 350,
						},
						legend: {
							show: false,
						},
					},
				},
			],
			legend: {
				position: "bottom",
			},
		},
		carga: false,
	}),
	computed: {
		tablaPedidos() {
			return this.chartOptions.labels.length > 0 ? false : true;
		},
	},
	methods: {
		async loadChart() {
			const { data } = await this.axios.get("api/librosPedidos");
			const { conjuntoLibros } = data;
			const cantidad = conjuntoLibros.map((elem) => elem.cantidad);
			const nombreLibro = conjuntoLibros.map((elem) => elem.nombreLibro);

			this.series = cantidad;
			this.chartOptions.labels = nombreLibro;
			this.carga = true;
		},
	},
	created() {
		this.loadChart();
	},
};
</script>
<style scoped></style>
