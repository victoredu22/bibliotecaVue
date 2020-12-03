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

					<div class="card">
						<div class="card-body">
							<div class="row">
								<h5 class="header-title mb-4">
									Libros mas pedidos ultimamente
								</h5>
							</div>
							<p class="text-muted">
								Libros que no tienen stock en el sistema
							</p>
							<div class="row">
								<chart ref="librosPedidos" />
							</div>
							<div class="text-center">
								<p>
									Grafico relacionado a los pedidos del ultimo
									mes.
								</p>
							</div>
						</div>
					</div>
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
									<tablaDatos ref="tablaStock" />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-xl-9">
					<div class="row">
						<div class="col-xl-4">
							<b-alert show variant="info">
								<h4 class="alert-heading">
									{{ totalPedidos }} Pedidos este mes.
								</h4>
								<p>
									Totalidad de pedidos en el sistema este mes
								</p>
							</b-alert>
						</div>
						<div class="col-xl-4">
							<b-alert show variant="warning">
								<h4 class="alert-heading">
									{{ totalAlumnos }} Alumnos totales.
								</h4>
								<p>
									Totalidad de alumnos inscritos en el
									sistema. recuerda actualizar los alumnos
									cada año.
								</p>
							</b-alert>
						</div>
						<div class="col-xl-4">
							<b-alert show variant="success">
								<h4 class="alert-heading">
									{{ totalLibros }} Libros en el sistema.
								</h4>
								<p>
									Totalidad de libros en el sistema de
									biblioteca.
								</p>
							</b-alert>
						</div>
					</div>

					<div class="row">
						<div class="col-xl-12">
							<div class="card ">
								<div class="card-body">
									<div class="row">
										<div class="col-xl-10">
											<h5 class="header-title">
												Tabla de pedidos en el año
											</h5>
										</div>
										<div class="col-xl-2">
											<b-button
												variant="outline-info"
												v-b-modal.modal-pedido
											>
												<i class="fas fa-plus"></i>
												Nuevo pedido libro
											</b-button>
										</div>
									</div>

									<v-client-table
										:data="jsonPedido"
										:columns="columns"
										:options="options"
									>
										<b-badge
											v-b-modal.modal-estadoPedido
											slot="estado"
											slot-scope="propsPedido"
											v-if="propsPedido.row.estado == 1"
											variant="warning"
											style="cursor: pointer;"
											@click="
												enviarDatosPedido(
													propsPedido.row
												)
											"
										>
											Pendiente
										</b-badge>
										<b-badge
											v-b-modal.modal-estadoPedido
											v-else
											slot="estado"
											variant="primary"
											style="cursor: pointer;"
											@click="
												enviarDatosPedido(
													propsPedido.row
												)
											"
										>
											Entregado
										</b-badge>
									</v-client-table>
								</div>
							</div>
						</div>
					</div>
				</div>

				<modalPedido ref="modalPedido" />
		<modalEstadoPedido ref="modalEstadoPedido" />
			</div>
	
		

</template>
<script>
import { mapActions, mapState } from "vuex";
import chart from "../chartPie";
import tablaDatos from "../tables";
import chartColumna from "../chartColumna";
import moment from "moment";
import es from "moment/locale/es";

import modalPedido from "./modal/nuevoPedido.vue";
import modalEstadoPedido from "./modal/estadoPedido.vue";
export default {
	components: {
		chart,
		tablaDatos,
		chartColumna,
		modalPedido,
		modalEstadoPedido,
	},
	data() {
		return {
			today: "",
			dataPedidos: [],
			totalLibros: "",
			totalAlumnos: "",
			totalPedidos: "",

			columns: [
				"idPedido",
				"nombreAlumno",
				"nombreLibro",
				"fechaEntrega",
				"estado",
			],
			tablePedido: [],
			options: {
				// see the options API
			},
		};
	},
	computed: {
		...mapState("pedidos", ["jsonPedido"]),
	},
	methods: {
		...mapActions("pedidos", ["updatePedido"]),
		currentDateTime() {
			return moment().format("LL");
		},
		enviarDatosPedido(array) {
			this.$refs.modalEstadoPedido.sendPedido(array);
		},
		enviarDatos() {
			this.axios.get("api/librosPedidos").then((res) => {
				const conjuntoLibros = res.data.conjuntoLibros;
				const cantidad = conjuntoLibros.map((elem) => elem.cantidad);
				const nombreLibro = conjuntoLibros.map(
					(elem) => elem.nombreLibro
				);
				this.$refs.librosPedidos.sendData(cantidad, nombreLibro);
			});

			this.axios.get("api/libros").then((res) => {
				const libros = res.data.libros;
				this.totalLibros = libros.reduce((a, b) => a + b.cantidad, 0);
			});

			this.axios.get("api/alumnos").then((res) => {
				const alumnos = res.data.alumnos;
				this.totalAlumnos = alumnos.length;
			});

			this.axios.get("api/pedidosMes").then((res) => {
				const pedidos = res.data.getPedidos;
				this.totalPedidos = pedidos.length;
			});
		},
		loadTablaEntregas() {
			this.axios.get("api/librosSinStock").then((res) => {
				const librosSinStock = res.data.librosSinStock;
				const tituloEntregas = ["id_libro", "nombre_libro", "cantidad"];

				const listadoEntrega = librosSinStock.map((elem, key) => ({
					id_libro: elem.idLibro,
					nombre_libro: elem.nombreLibro,
					cantidad: elem.cantidad,
				}));
				this.$refs.tablaStock.sendData(tituloEntregas, listadoEntrega);
			});

			this.axios.get("api/pedidosRecientes").then((res) => {
				const librosPedidos = res.data.getPedido;
				const librosJson = librosPedidos.map((item) => ({
					idPedido: item.idPedido,
					nombreAlumno: `${item.nombre} ${item.apellido}`,
					nombreLibro: item.nombreLibro,
					fechaEntrega: item.fechaEntrega,
					estado: item.estado,
				}));
				this.updatePedido(librosJson);
			});
		},
	},
	mounted() {
		this.enviarDatos();
		this.loadTablaEntregas();
	},
	created() {},
};
</script>
