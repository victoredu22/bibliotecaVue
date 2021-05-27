<template>
	<b-modal id="modal-nuevoPedido" @show="resetModal" @ok="handleEnvio">
		<template v-slot:modal-title>
			<h5 class="modal-title">Creación nuevo pedido</h5>
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
						:options="dataAlumnos"
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
							<strong>{{ cantidadLibros }}</strong> pedidos pendientes.
						</p>
						<p>
							#{{ infoAlumno.idAlumno }} - {{ infoAlumno.nombre }}
							{{ infoAlumno.apellido }}
							{{ infoAlumno.numeroDocumento }}
						</p>
					</div>
				</b-form-group>
				<b-form-group
					label="Ingresa el nombre del libro."
					style="margin-top:20px"
				>
					<v-select
						class="form-select"
						placeholder="Haz click para seleccionar el libro..."
						:options="jsonLibros"
						label="dataLibro"
						v-model="selectedLibro"
						@input="seleccionLibro(selectedLibro.idLibro)"
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
				<b-form-group label="Ingresa el estado actual del libro">
					<b-form-textarea
						id="textarea"
						v-model="estadoRetiro"
						placeholder="Enter something..."
						rows="3"
						max-rows="6"
					></b-form-textarea>
				</b-form-group>
			</div>
		</div>

		<template v-slot:modal-footer="{ ok }">
			<!-- Emulate built in modal footer ok and cancel button actions -->
			<b-button v-if="!loadCargaPedido" block variant="primary" @click="ok()">
				Nuevo Pedido
			</b-button>
			<b-button v-else block variant="primary">
				<b-spinner small type="grow"></b-spinner>
				Cargando...
			</b-button>
		</template>
	</b-modal>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { makeToast } from "@/helper/makeToast";
import { formateoFecha } from "@/helper/fechaSql";
import { fetchToken } from "@/helper/axios";
export default {
	data() {
		return {
			selectedAlumno: "",
			selectedLibro: "",
			estadoRetiro: "El libro se encuentra en perfectas condiciones.",
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
			loadCargaPedido: false,
		};
	},
	computed: {
		...mapState("alumnos", ["dataAlumnos"]),
		...mapState("libros", ["jsonLibros"]),
	},
	methods: {
		...mapActions("pedidos", ["addPedido"]),
		...mapActions("pages", ["addPedidoData"]),
		cickCalendario() {
			this.error.fechaEntrega = false;
		},
		handleEnvio(bvModalEvt) {
			bvModalEvt.preventDefault();
			this.sendPedido();
		},
		async sendPedido() {
			const { idLibro } = this.selectedLibro;
			const { idAlumno } = this.selectedAlumno;

			const form = {
				idLibro,
				idAlumno,
				fechaEntrega: this.fechaEntrega,
				estadoRetiro: this.estadoRetiro,
			};

			this.loadCargaPedido = true;
			const { data } = await fetchToken("create-pedido", form, "POST");
			const { errores, msg, ok, pedido, libro, curso } = data;

			this.error = errores ? errores : { ...this.error };
			this.loadCargaPedido = false;
			if (!ok) {
				if (msg == "libroEncontrado") {
					makeToast({
						msg: "El alumno ya tiene asignado el libro.",
						title: "Atención",
						variant: "warning",
						solid: true,
					});
				}
				if (msg == "libroSinStock") {
					makeToast({
						msg:
							"Este libro se encuentra sin stock no podemos realizar la entrega.",
						title: "Atención",
						variant: "danger",
						solid: true,
					});
				}
			}

			if (ok) {
				makeToast({
					msg: `El n° pedido es el ${pedido.idPedido}`,
					title: "Exito",
					variant: "primary",
					solid: true,
				});

				//update variables internas
				this.infoAlumno.cantidad++;
				this.infoLibro.cantidad--;

				this.addPedido(pedido);
				this.addPedidoData({
					...pedido,
					fechaEntrega: formateoFecha(pedido.fechaEntrega),
					fechaRetiro: formateoFecha(pedido.fechaRetiro),
					nombre: this.infoAlumno.nombre,
					apellido: this.infoAlumno.apellido,
					nombreLibro: libro.nombreLibro,
					nombreCurso: curso.nombreCurso,
				});
			}
		},
		async seleccionAlumno({ idAlumno }) {
			this.error.idAlumno = false;

			//Muestra Info Alumno
			this.infoAlumno = this.dataAlumnos.find(
				(elem) => elem.idAlumno === idAlumno
			);
			const { data } = await fetchToken(`infoPedidoAlumno/${idAlumno}`);
			this.cantidadLibros = data.totalPedido;
		},

		async seleccionLibro(idLibro) {
			this.error.idLibro = false;
			const { data } = await fetchToken(`infoLibroId/${idLibro}`);
			this.infoLibro = data.libro;
		},
		onContext(ctx) {
			this.context = ctx;
		},
		resetModal() {
			this.selectedAlumno = "";
			this.selectedLibro = "";
			this.fechaEntrega = "";
			this.infoAlumno = [];
			this.infoLibro = [];
			this.msg = "";

			this.error = {
				rutAlumno: "",
				fechaEntrega: "",
			};
		},
	},
};
</script>
<style scoped>
.disabled {
	background-color: #d6d6d6;
}
</style>
