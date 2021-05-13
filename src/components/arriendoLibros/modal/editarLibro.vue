<template>
	<b-modal id="modal-editar" @show="resetModal" @ok="handleEnvio">
		<template v-slot:modal-title>
			<span>Editar Libro</span>
		</template>
		<b-form-group>
			<b-form-group label="Nombre Libro *">
				<b-form-input
					v-model="datos.nombreLibro"
					placeholder="Ingresa el nombre del libro"
					type="text"
					disabled="disabled"
					class="dissabled"
					style="background-color:#dadada"
				>
				</b-form-input>
				<span v-if="error.nombreLibro" style="color:red">
					Este {{ error.nombreLibro[0] }}
				</span>
			</b-form-group>
			<b-form-group label="Cantidad libro *">
				<b-form-input
					:class="{ 'is-invalid': error.cantidad }"
					v-on:keyup="camposValidacion()"
					v-model="datos.cantidad"
					placeholder="Ingresa la cantidad de libros "
					type="text"
				>
				</b-form-input>
				<span v-if="error.cantidad" style="color:red">
					Este campo es obligatorio
				</span>
			</b-form-group>

			<b-form-group label="Nombre autor *">
				<b-form-input
					:class="{ 'is-invalid': error.autor }"
					v-on:keyup="camposValidacion()"
					v-model="datos.autor"
					placeholder="Ingresa el nombre del autor"
					type="text"
				>
				</b-form-input>
				<span v-if="error.autor" style="color:red">
					Este campo es obligatorio
				</span>
			</b-form-group>
			<b-form-group label="Destino">
				<b-form-textarea
					:class="{ 'is-invalid': error.destino }"
					v-on:keyup="camposValidacion()"
					v-model="datos.destino"
					id="textarea"
					placeholder="Escribe el lugar donde guardarás el libro"
					rows="3"
					max-rows="6"
				></b-form-textarea>
				<small>Escribe el lugar fisico donde se encontrará.</small>
				<br />
				<span v-if="error.destino" style="color:red">
					Este campo es obligatorio
				</span>
			</b-form-group>
		</b-form-group>
		<template v-slot:modal-footer="{ ok }">
			<!-- Emulate built in modal footer ok and cancel button actions -->
			<b-button block v-if="!loadCargaEdicion" variant="primary" @click="ok()">
				Editar Libro
			</b-button>
			<b-button v-else block variant="primary">
				<b-spinner small type="grow"></b-spinner>
				Cargando...
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
	data: () => ({
		nombreTitulo: "",
		datos: {
			nombreLibro: "",
			disponibilidad: "",
			autor: "",
			destino: "",
		},
		error: {
			cantidad: "",
			autor: "",
			destino: "",
		},
		selectCurso: null,
		loadCargaEdicion:false
	}),
	computed: {
		...mapState("libros", ["jsonLibros"]),
		...mapState("libros", ["activeLibro"]),
	},
	methods: {
		...mapActions("libros", ["setLibro"]),
		handleEnvio(bvModalEvt) {
			// Prevent modal from closing
			bvModalEvt.preventDefault();
			this.loadCargaEdicion = true;
			this.updateLibro();
		},
		async updateLibro() {
			const { data } = await this.axios.post(
				"api/update-libro",
				this.datos
			);
			const { errores } = data;
			const { libro } = data;
			
			this.loadCargaEdicion = false;
			this.error = errores ? errores : { ...this.error };

			if (libro) {
				this.setLibro(libro);
				const arrayToast = {
					msg: "Felicitaciones se ha ingresado con exito.",
					title: "Exito",
					variant: "success",
				};
				this.$refs.toastComponent.makeToast(arrayToast);
			}
		},
		datosLibro() {
			this.datos = this.activeLibro ? { ...this.activeLibro } : {};
		},
		camposValidacion() {
			if (this.datos.cantidad) {
				this.error.cantidad = false;
			}
			if (this.datos.autor) {
				this.error.autor = false;
			}
			if (this.datos.destino) {
				this.error.destino = false;
			}
		},
		resetModal() {
			this.error = {
				cantidad: "",
				autor: "",
				destino: "",
			};
			
		},
	},
};
</script>
}
