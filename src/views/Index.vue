<template>
	<div class="row">
		<div class="col-xl-3">
			<div class="card">
				<div class="card-body">
					<div class="row">
						<div class="col-6">
							<h4>
								<i class="fas fa-university"></i>
								Colegio Cumbre
							</h4>
							<p class="text-muted">
								{{ currentDateTime() }}
							</p>
						</div>
						<div class="col-5 ml-auto">
							<div>
								<img
									src="https://im0-tub-com.yandex.net/i?id=a9ab8ad65c5e6b8d6f8d93d4749f84f3&n=13"
									alt=""
									class="img-fluid"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<chartPedidos />
			<tablasStock /> 
		</div>

		<div class="col-xl-9">
			<headPedido />
			<tablaPedidoAnual />
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import tablaPedidoAnual from "../components/index/tablaPedidosAnual";
import moment from "moment";
import chartPedidos from "../components/index/chartPedidos";
import tablasStock from '../components/index/tablaStock';
import headPedido from '../components/index/headInfoPedido';

export default {
	components: {
		tablaPedidoAnual,
    chartPedidos,
    tablasStock,
    headPedido
	},
	data() {
		return {};
	},
	computed: {},
	methods: {
    ...mapActions('alumnos',['uploadAlumnos']),
    ...mapActions("pedidos", ["updatePedido"]),
    ...mapActions('libros',['uploadDataLibros']),
		async loadData() {
			const { data } = await this.axios.get("api/pedidosRecientes");
			const { getPedido: librosPedidos } = data;

			const pedidosJson = librosPedidos.map((item) => ({
				nombreAlumno: `${item.nombre} ${item.apellido}`,
				...item,
			}));

			this.updatePedido(pedidosJson);
		},
    async loadAlumnos() {
			const {data} = await this.axios.get('api/alumnos');
			const {alumnos} = data;
			this.uploadAlumnos(alumnos);
		},
    async loadLibros() {
			const {data} = await this.axios.get("api/libros");
			const {libros} = data;
			this.uploadDataLibros(libros);
		},
		currentDateTime() {
			return moment().format("LL");
		},
	},
  mounted(){
    this.loadData();
    this.loadAlumnos();
    this.loadLibros();
  }
};
</script>
