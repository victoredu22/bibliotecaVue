<template>
	<b-modal id="modal-nuevoLibro" @show="resetModal" @ok="handleEnvio">
		<template v-slot:modal-title>
			<span>Crear nuevo libro.</span>
		</template>
		<b-form-group>
			<b-form-group label="Nombre Libro *">
				<b-form-input
					v-model="datos.nombreLibro"
					v-on:keyup="camposValidacion(datos)"
					placeholder="Ingresa el titulo del libro"
					type="text"
					:class="{ 'is-invalid': error.nombreLibro }"
				>
				</b-form-input>

				<span v-if="error.nombreLibro" style="color:red">
					Este {{ error.nombreLibro[0] }}
				</span>
			</b-form-group>
			<b-form-group label="Cantidad Libros *">
				<b-form-input
					v-model="datos.cantidad"
					v-on:keyup="camposValidacion(datos)"
					:class="{ 'is-invalid': error.cantidad }"
					placeholder="Ingresa cuantos libros existen con ese nombre"
					type="number"
					class="disabled"
				>
				</b-form-input>
				<span v-if="error.cantidad" style="color:red">
					Este {{ error.cantidad[0] }}
				</span>
			</b-form-group>
			<b-form-group label="Nombre Autor *">
				<b-form-input
					v-model="datos.autor"
					v-on:keyup="camposValidacion(datos)"
					:class="{ 'is-invalid': error.autor }"
					placeholder="Ingrese el nombre del autor"
					class="disabled"
				>
				</b-form-input>
				<span v-if="error.autor" style="color:red">
					Este {{ error.autor[0] }}
				</span>
			</b-form-group>
			<b-form-group label="Curso Destino *">
				<b-form-select
					v-model="selected"
					@change="changeCurso()"
					:options="options"
					:class="{ 'is-invalid': error.curso }"
				>
				</b-form-select>
				<small>
					Selecciona el curso donde esta destinado el libro.
				</small>
				<br />
				<span v-if="error.curso" style="color:red">
					Este {{ error.curso[0] }}
				</span>
			</b-form-group>
			<b-form-group label="Donde se encuentra">
				<b-form-textarea
					:class="{ 'is-invalid': error.destino }"
					v-model="datos.destino"
					v-on:keyup="camposValidacion(datos)"
					id="textarea"
					placeholder="Escribe el lugar donde guardarás el libro"
					rows="3"
					max-rows="6"
				></b-form-textarea>
				<small>Escribe el lugar fisico donde se encontrará.</small>
			</b-form-group>
			<span v-if="error.destino" style="color:red">
				Este {{ error.destino[0] }}
			</span>
		</b-form-group>

		<template v-slot:modal-footer="{ ok }">
			<!-- Emulate built in modal footer ok and cancel button actions -->
			<b-button v-if="!loadCargaPedido" block variant="primary" @click="ok()">
				Agregar Libro
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
import {makeToast} from '@/helper/makeToast';
import { fetchToken } from '@/helper/axios';

export default {
	data: () => ({
		libro: null,
		nombreLibro: "",
		datos: {
			nombreLibro: "",
			disponibilidad: "",
			autor: "",
			destino: "",
		},
		camposVacio: {},
		selected: null,
		options: [
			{ value: null, text: "Por favor selecciona alguna opción" },
			{ value: "0", text: "Ningún curso" },
			{ value: "1", text: "Primero Basico" },
			{ value: "2", text: "Segundo Basico" },
			{ value: "3", text: "Tercero Basico" },
			{ value: "4", text: "Cuarto Basico" },
			{ value: "5", text: "Quinto Basico" },
			{ value: "6", text: "Sexto Basico" },
			{ value: "7", text: "Septimo Basico" },
			{ value: "8", text: "Octavo Basico" },
		],
		error: {
			nombreLibro: "",
			disponibilidad: "",
			autor: "",
			curso: "",
		},
		loadCargaPedido:false
	}),
	computed: {
		...mapState("libros", ["jsonLibros"]),
		...mapState("libros", ["activeLibro"]),
	},
	methods: {
		...mapActions("libros", ["addNewLibro"]),
		handleEnvio(bvModalEvt) {
			// Prevent modal from closing
			bvModalEvt.preventDefault();
			this.loadCargaPedido = true;
			this.nuevoLibro();
			
		},
		changeCurso() {
			this.error.curso = false;
		},
		camposValidacion(param) {
			if (param.nombreLibro) {
				this.error.nombreLibro = false;
			}
			if (param.cantidad) {
				this.error.cantidad = false;
			}
			if (param.autor) {
				this.error.autor = false;
			}
			if (param.curso) {
				this.error.curso = false;
			}
			if (param.destino) {
				this.error.destino = false;
			}
		},

		async nuevoLibro() {
			const formulario = {
				nombreLibro: this.datos.nombreLibro,
				cantidad: this.datos.cantidad,
				autor: this.datos.autor,
				idCurso: this.selected,
				destino: this.datos.destino,
			};

			const { data } = await fetchToken('create-libro',formulario,'POST');

			const { libro,cantidad, errores } = data;

			this.loadCargaPedido = false;

			if (errores) {
				this.error = errores;
			}

			if (libro) {
				//llamo funcion vuex
				this.addNewLibro({...libro,cantidad});

				makeToast({	msg: "Felicitaciones se ha ingresado el libro con exito.",
					title: "Exito",
					variant: "success"})
			}
		},
		resetModal() {
			this.error = {
				titulo: "",
				cantidad: "",
				autor: "",
				curso: "",
				destino: "",
			};
			this.datos = {
				titulo: "",
				cantidad: "",
				autor: "",
				curso: "",
				destino: "",
			};
		},
	},
};
</script>
