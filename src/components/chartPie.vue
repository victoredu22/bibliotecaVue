<template>
	<div>
		<apexchart
			type="pie"
			width="400"
			:options="chartOptions"
			:series="series"
		></apexchart>
	</div>
</template>
<script>
export default {
	data() {
		return {
			series: [],
			chartOptions: {
				chart: {
					width: 500,
					type: "pie",
				},
				labels: [],
				responsive: [
					{
						breakpoint: 480,
						options: {
							chart: {
								width: 200,
							},
							legend: {
								position: "bottom",
							},
						},
					},
				],
			},
		};
  },
  methods:{
    sendData(series,labels){
      const addSeries = series.map(item => this.series.push(item));
      const addLabels = labels.map(item => this.chartOptions.labels.push(item));
    }
  }
};
</script>
