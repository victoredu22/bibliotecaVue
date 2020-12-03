<template>
	<b-modal id="modal-editar" @show="resetModal" @ok="handleEnvio">
		<template v-slot:modal-title>
			<span>Editar Libro</span>
		</template>
		<b-form-group>
			<b-form-group label="Nombre Libro *">
				<b-form-input
					v-model="datos.nombreLibro"
					placeholder="Ingresa el titulo del material"
					type="text"
					disabled="disabled"
					class="dissabled"
					style="background-color:#dadada"
				>
				</b-form-input>
			</b-form-group>
			<b-form-group label="Cantidad libro *">
				<b-form-input
					:class="{ 'is-invalid': error.cantidad }"
					v-on:keyup="camposValidacion()"
					v-model="datos.cantidad"
					placeholder="Ingresa el titulo del material"
					type="text"
				>
				</b-form-input>
				<span v-if="error.cantidad" style="color:red">
					Este {{ error.cantidad[0] }}
				</span>
			</b-form-group>
			<b-form-group label="Nombre autor *">
				<b-form-input
					:class="{ 'is-invalid': error.autor }"
					v-on:keyup="camposValidacion()"
					v-model="datos.autor"
					placeholder="Ingresa el titulo del material"
					type="text"
				>
				</b-form-input>
				<span v-if="error.autor" style="color:red">
					Este {{ error.autor[0] }}
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
					Este {{ error.destino[0] }}
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
			datos: {
				tituloLibro: "",
				disponibilidad: "",
				autor: "",
				destino: "",
      },
      error:{
        cantidad:'',
        autor:'',
        destino:''
      },
			selectCurso: null,
		};
	},
	computed: {
		...mapState("libros", ["jsonLibros"]),
	},
	methods: {
		handleEnvio(bvModalEvt) {
			// Prevent modal from closing
			bvModalEvt.preventDefault();
			this.updateLibro();
		},
		updateLibro() {

      this.axios
        .post('api/update-libro', this.datos)
        .then((res)=>{
          console.log(res.data);
          if(res.data.ok === false){
            this.error = res.data.errores;
          }

          if(res.data.ok === true){
            const libro = res.data.libro;
            const datosLibro = this.jsonLibros.find((elem)=>elem.idLibro === libro.idLibro);

            //actualizacion datos array y bd
            datosLibro.nombre = libro.nombre;
            datosLibro.cantidad = libro.cantidad;
            datosLibro.autor= libro.autor;
            datosLibro.destino = libro.destino;

            const arrayToast = {
              msg: "Felicitaciones se ha ingresado con exito.",
              title: "Exito",
              variant: "success",
            };
					  this.$refs.toastComponent.makeToast(arrayToast);
          }
        });

		},
		datosLibro(obj) {
			this.datos = {
				idLibro: obj.idLibro,
				nombreLibro: obj.nombreLibro,
				autor: obj.autor,
				cantidad: obj.cantidad,
				destino: obj.destino,
			};
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
    resetModal(){
      this.error = {
        cantidad:'',
        autor:'',
        destino:''

      };
    },
	},
};
</script>}
