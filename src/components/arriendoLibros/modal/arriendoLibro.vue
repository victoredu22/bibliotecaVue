<template>
	<b-modal id="modal-arriendo" @show="resetModal" @ok="handleEnvio">
		<template v-slot:modal-title>
			<span>Asignar libro a estudiante</span>
		</template>
		<div class="media">
			<div dir="ltr" class="ml-2">
				<div>
					<i
						class="fas fa-book"
						style="font-size: 70px; color:#14b3e2a6;margin-top: 10%;"
					></i>
				</div>
			</div>
			<div class="media-body" style="margin-left:20px">
				<h4>{{ libro.nombreLibro }}</h4>
				<li style="list-style: none;">
					Autor :
					<span style="color:#045e04;font-weight: 700;">
						{{ capitalizarPalabras(libro.autor) }}
					</span>
				</li>
				<li style="list-style: none;">
					Disponibilidad :
					<span style="color:#045e04;">
						{{ libro.cantidad }}
					</span>
				</li>
			</div>
		</div>
		<b-form-group>
			<b-form-group
				label="Ingresa el rut del alumno."
				style="margin-top:20px"
			>
				<b-alert v-if="rutInValido" show variant="danger"
					>Rut Invalido :(
				</b-alert>
				<input
					v-on:keyup="validationRut()"
					type="text"
					class="form-control inputRut"
					v-model="rut"
					placeholder="Ej: 17708532-6"
					v-rut
					@input="seleccionAlumno()"
				/>
				<small>
					Ingresa el rut del alumno que deseas prestarle el libro
				</small>
				<br />
				<span v-if="error.rutAlumno" style="color:red">
					Debes ingresar un alumno valido.
				</span>
			</b-form-group>
			<b-form-group label="Fecha Entrega" style="margin-top:20px">
				<b-calendar
					v-model="fechaEntrega"
					@context="onContext"
					locale="es"
					@input="cickCalendario()"
					block
				>
				</b-calendar>
				<span v-if="error.fechaEntrega" style="color:red">
					Este {{ error.fechaEntrega[0] }}
				</span>
			</b-form-group>
		</b-form-group>
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
			libro: {},
			rut: "",
			rutInValido: "",
			fechaEntrega: "",
			error: {
				rutAlumno: "",
				fechaEntrega: "",
			},
		};
	},
	computed: {
		...mapState("libros", ["jsonLibros"]),
		...mapState("libros", ["activeLibro"]),
	},
	methods: {
		...mapActions("libros", ["reduceStockLibro"]),
		seleccionAlumno(alumno) {
			this.error.idAlumno = false;
		},
		cickCalendario() {
			this.error.fechaEntrega = false;
		},
		onContext(ctx) {
			this.context = ctx;
		},
		handleEnvio(bvModalEvt) {
			// Prevent modal from closing
			bvModalEvt.preventDefault();
			this.formLibro();
		},
		async formLibro() {
			const { idLibro } = this.libro;
			const formulario = {
				idLibro,
				rutAlumno: this.limpiaRutAlumno(this.rut),
				fechaEntrega: this.fechaEntrega,
			};

			const { data } = await this.axios.post(
				"api/arriendo-libros",
				formulario
			);

			const { errores } = data;

			this.error = errores ? errores : { ...this.error };

			const { msg: msgServidor } = data;
			
			if (msgServidor === "libroEncontrado") {
				const arrayToast = {
					msg: "El alumno ya tiene asignado el libro.",
					title: "Atención",
					variant: "warning",
				};
				this.$refs.toastComponent.makeToast(arrayToast);
			}

			if (msgServidor === "libroArrendado") {
				this.reduceStockLibro(idLibro);
				const arrayToast = {
					msg: "Felicitaciones se ha ingresado con exito.",
					title: "Exito",
					variant: "success",
				};
				this.$refs.toastComponent.makeToast(arrayToast);
			}

		},
		limpiaRutAlumno(rut) {
			let rutAlumno = rut.replace(/\./g, "");
			rutAlumno = rutAlumno.split("-");
			rutAlumno = rutAlumno[0];

			return rutAlumno;
		},
		envioDatos() {
			this.libro = this.activeLibro;
		},
		resetModal() {
			this.rut = "";
			this.rutInValido = "";
			this.fechaEntrega = "";
			this.error = {
				rutAlumno: "",
				fechaEntrega: "",
			};
		},
		capitalizarPalabras(val) {
			if (val) {
				return val
					.toLowerCase()
					.trim()
					.split(" ")
					.map((v) => v[0].toUpperCase() + v.substr(1))
					.join(" ");
			}
		},
		validationRut() {
			let rutSimple = this.rut.replace(/\./g, "");
			var guion = rutSimple.replace(/\-/g, "");

			rut = rutSimple.split("-");
			this.rutLimpio = rut[0];

			// Divide el valor ingresado en dígito verificador y resto del RUT.
			let cuerpo = guion.slice(0, -1);
			let dv = guion.slice(-1).toUpperCase();

			// Formatear RUN
			var rut = cuerpo + "-" + dv;

			// Calcular Dígito Verificador
			var suma = 0;
			var multiplo = 2;

			if (cuerpo.length < 7) {
				this.rutInValido = true;
				//console.log("RUT Incompleto");
				return false;
			}

			// Para cada dígito del Cuerpo
			for (var i = 1; i <= cuerpo.length; i++) {
				// Obtener su Producto con el Múltiplo Correspondiente
				var index = multiplo * rutSimple.charAt(cuerpo.length - i);
				// Sumar al Contador General
				suma = suma + index;
				// Consolidar Múltiplo dentro del rango [2,7]
				if (multiplo < 7) {
					multiplo = multiplo + 1;
				} else {
					multiplo = 2;
				}
			}
			// Calcular Dígito Verificador en base al Módulo 11
			var dvEsperado = 11 - (suma % 11);
			// Casos Especiales (0 y K)
			dv = dv == "K" ? 10 : dv;
			dv = dv == 0 ? 11 : dv;
			if (dvEsperado != dv) {
				//console.log("RUT Inválido");
				this.rutInValido = true;
				return false;
			} else {
				this.rutInValido = false;
				//console.log("valido");
			}
		},
	},
};
</script>
<style scoped>
.disabled {
	background-color: #d6d6d6;
}
</style>
