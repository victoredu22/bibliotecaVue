<template>
	<b-modal id="modal-pedido" @show="resetModal" @ok="handleEnvio">
		<template v-slot:modal-title>
			<span>Agregar un nuevo pedido libro</span>
		</template>
		<div class="media">
			<div class="media-body">
				<b-alert v-if="msg.length > 0" show :variant="variant">
					{{ msg }}
				</b-alert>

				<b-form-group
					label="Ingresa el rut del alumno."
					style="margin-top:20px"
				>
					<v-select
						placeholder="Haz click para seleccionar alumno..."
						:options="listadoALumno"
						label="dataAlumno"
						v-model="selectedAlumno"
						@input="seleccionAlumno(selectedAlumno)"
					>
						<template slot="options" slot-scope="options">
							{{ options.dataAlumno }}
						</template>
					</v-select>

					<span v-if="error.idAlumno" style="color:red">
						Este {{ error.idAlumno[0] }}
					</span>

					<br />

					<div
						v-if="infoAlumno.idAlumno"
						style="background-color: #EEEEEE;border-radius: 0.25rem;padding: 0.75rem 1.25rem;"
					>
						<p>
							Este alumno cuenta con
							<strong>{{ cantidadLibros }}</strong> pedidos
							pendientes.
						</p>
						<p>
							#{{ infoAlumno.idAlumno }} -
							{{ infoAlumno.nombre }} {{ infoAlumno.apellido }}
							{{ infoAlumno.numeroDocumento }}
						</p>
					</div>
				</b-form-group>
				<b-form-group
					label="Ingresa el nombre del libro."
					style="margin-top:20px"
				>
					<v-select
						placeholder="Haz click para seleccionar el libro..."
						:options="listadoLibro"
						label="dataLibro"
						v-model="selectedLibro"
						@input="seleccionLibro(selectedLibro)"
					>
						<template slot="options" slot-scope="options">
							{{ options.dataLibro }}
						</template>
					</v-select>

					<span v-if="error.idLibro" style="color:red">
						Este {{ error.idLibro[0] }}
					</span>
					<br />

					<div
						style="background-color: #EEEEEE;border-radius: 0.25rem;padding: 0.75rem 1.25rem;"
						v-if="infoLibro.idLibro"
					>
						Este Libro se encuentra con stock de:
						{{ infoLibro.cantidad }}
					</div>
				</b-form-group>

				<b-form-group label="Fecha Entrega" style="margin-top:20px">
					<b-calendar
						v-model="fechaEntrega"
						@context="onContext"
						locale="es"
						block
						@input="cickCalendario()"
					></b-calendar>
					<span v-if="error.fechaEntrega" style="color:red">
						Este {{ error.fechaEntrega[0] }}
					</span>
				</b-form-group>
			</div>
		</div>

		<template v-slot:modal-footer="{ ok, cancel }">
			<!-- Emulate built in modal footer ok and cancel button actions -->
			<b-button @click="cancel()">
				Cancelar
			</b-button>
			<b-button variant="primary" @click="ok()">
				Aceptar
			</b-button>
		</template>
		<toastComponent ref="toastComponent"></toastComponent>
	</b-modal>
</template>
<script>
import { mapActions, mapState } from "vuex";
import toastComponent from "@/components/toastComponent";
export default {
	components: {
		toastComponent,
	},
	data() {
		return {
			alumnos: [],
			selectedAlumno: "",
			listadoALumno: [],
			selectedLibro: "",
			listadoLibro: [],

			infoAlumno: [],
			infoLibro: [],
			fechaEntrega: "",
			context: null,
			error: {
				idLibro: "",
				idAlumno: "",
				fechaEntrega: "",
			},
			msg: "",
			variant: "",
			cantidadLibros: "",
		};
	},
	computed: {
		...mapState("pedidos", ["jsonPedido"]),
	},
	methods: {
		...mapActions("pedidos", ["updatePedido"]),
		cickCalendario() {
			this.error.fechaEntrega = false;
		},
		handleEnvio(bvModalEvt) {
			bvModalEvt.preventDefault();
			this.sendPedido();
		},
		sendPedido() {
			const { idLibro } = this.selectedLibro;
			const { idAlumno } = this.selectedAlumno;
			const fechaEntrega = this.fechaEntrega;

			const form = {
				idLibro,
				idAlumno,
				fechaEntrega,
			};

			this.axios.post(`api/create-pedido`, form).then((res) => {
				if (res.data.ok === false) {
					if (res.data.msg == "libroEncontrado") {
						const arrayToast = {
							msg: "El alumno ya tiene asignado el libro.",
							title: "Atención",
							variant: "warning",
						}; 
						this.$refs.toastComponent.makeToast(arrayToast);
					}

					if (res.data.msg == "libroSinStock") {
						const arrayToast = {
							msg: "Este libro se encuentra sin stock no podemos realizar el pedido.",
							title: "Atención",
							variant: "danger",
						}; 
						this.$refs.toastComponent.makeToast(arrayToast);
					}

					if (res.data.errores) {
						this.error = res.data.errores;
					}
				}
				if (res.data.ok === true) {

					const arrayToast = {
						msg: "Felicitaciones se ha ingresado con exito.",
						title: "Exito",
						variant: "success",
					};
					this.variant = "primary";
					this.msg = `El n° pedido es el ${res.data.pedido.idPedido}`;
					this.$refs.toastComponent.makeToast(arrayToast);
					this.infoAlumno.cantidad++;
					this.infoLibro.cantidad--;
				
					const pedido = res.data.pedido;

					//ingreso nuevo pedido a vuex
					this.jsonPedido.push({
						idPedido:pedido.idPedido,
						nombreAlumno: this.infoAlumno.nombre + this.infoAlumno.apellido,
						nombreLibro:this.infoLibro.nombreLibro,
						fechaEntrega:this.fechaEntrega,
						estado:1
					});

	
				}
			});
		},
		seleccionAlumno(alumno) {
			this.error.idAlumno = false;
			const { idAlumno } = alumno;
			this.infoAlumno = this.alumnos.find(
				(elem) => elem.idAlumno === idAlumno
			);
			this.axios.get(`api/infoPedidoAlumno/${idAlumno}`).then((res) => {
				const cantidad = res.data.totalPedido;
				this.cantidadLibros = cantidad;
			});
		},
		seleccionLibro(libro) {
			this.error.idLibro = false;
			const { idLibro } = libro;
			this.axios.get(`api/infoLibroId/${idLibro}`).then((res) => {
				this.infoLibro = res.data.libro;
			});
		},
		onContext(ctx) {
			this.context = ctx;
		},
		loadAlumnos() {
			this.axios.get("api/alumnos").then((res) => {
				this.alumnos = res.data.alumnos;
				const addAlumno = this.alumnos.map((item) =>
					this.listadoALumno.push({
						idAlumno: item.idAlumno,
						dataAlumno: `${item.numeroDocumento} ${item.nombre} ${item.apellido}`,
					})
				);
			});
		},
		loadLibros() {
			this.axios.get("api/libros").then((res) => {
				const libros = res.data.libros;

				const addLibros = libros.map((item) =>
					this.listadoLibro.push({
						idLibro: item.idLibro,
						dataLibro: `${item.nombreLibro}`,
					})
				);
			});
		},
		resetModal() {
			this.selectedAlumno = "";
			this.selectedLibro = "";
			this.fechaEntrega = "";
			this.infoAlumno = [];
			this.infoLibro = [];
			this.msg = "";

			this.error= {
				rutAlumno: "",
				fechaEntrega: "",
			};
		},
	},
	created() {
		this.loadAlumnos();
		this.loadLibros();
	},
};
</script>
<style scoped>
.disabled {
	background-color: #d6d6d6;
}
</style>
