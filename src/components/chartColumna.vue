<template>
	<div id="chart">
		<apexchart
			type="bar"
			height="350"
			:options="chartOptions"
			:series="series"
		></apexchart>
	</div>
</template>
<script>
export default {
	data() {
		return {
			series: [
				{
					name: "Pedidos",
					data: [

					],
				},
			],


			chartOptions: {
				chart: {
					height: 350,
					type: "bar",
				},
				plotOptions: {
					bar: {
						dataLabels: {
							position: "top", // top, center, bottom
						},
					},
				},
				dataLabels: {
					enabled: true,
					formatter: function(val) {
						return val + "%";
					},
					offsetY: -20,
					style: {
						fontSize: "12px",
						colors: ["#304758"],
					},
				},

				xaxis: {
					categories: [
						"Ene",
						"Feb",
						"Mar",
						"Abr",
						"May",
						"Jun",
						"Jul",
						"Ago",
						"Sep",
						"Oct",
						"Nov",
						"Dec",
					],
					position: "top",
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
					crosshairs: {
						fill: {
							type: "gradient",
							gradient: {
								colorFrom: "#D8E3F0",
								colorTo: "#BED1E6",
								stops: [0, 100],
								opacityFrom: 0.4,
								opacityTo: 0.5,
							},
						},
					},
					tooltip: {
						enabled: true,
					},
				},
				yaxis: {
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
					labels: {
						show: false,
						formatter: function(val) {
							return val + "%";
						},
					},
				},
				title: {
					text: "Pedidos a traves del año",
					floating: true,
					offsetY: 330,
					align: "center",
					style: {
						color: "#444",
					},
				},
			},
		};
	},
	methods:{
		sendDatos(data,categories){
			const addSeries = data.map(item => this.series[0].data.push(item));

			console.log(this.series[0].data);
		}
	}
};
</script>
