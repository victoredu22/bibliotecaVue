<template>
    <b-modal  id="modal-nuevoLibro"  @show="resetModal" @ok="handleEnvio" >
        <template v-slot:modal-title>
            <span>Nuevo Libro</span>
        </template>
        <b-form-group>
            <b-form-group label="Nombre Libro *">
                <b-form-input
                    v-model="datos.tituloLibro"
                    v-on:keyup="camposValidacion(datos)"
                    placeholder="Ingresa el titulo del material"
                    type="text"
                    :class="{'is-invalid':camposVacio.titulo}"
                    >
                </b-form-input>
            </b-form-group>
            <b-form-group label="Cantidad Libros *">
                <b-form-input
                    v-model="datos.disponibilidad"
                    v-on:keyup="camposValidacion(datos)"
                    :class="{'is-invalid':camposVacio.disponibilidad}"
                    placeholder="Ingresa cuantos libros existen con ese nombre"
                    type="number"
                    class="disabled">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Nombre Autor *">
                <b-form-input
                    v-model="datos.autor"
                    v-on:keyup="camposValidacion(datos)"
                    :class="{'is-invalid':camposVacio.autor}"
                    placeholder="Ingrese el nombre del autor"
                    class="disabled">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Curso Destino *">
                <b-form-select 
                    v-model="selected"
                    @change="changeCurso()" 
                    :options="options"
                    :class="{'is-invalid':camposVacio.curso}"
                    >
                </b-form-select>
                <small>Selecciona el curso donde esta destinado el libro.</small>
            </b-form-group>
            <b-form-group label="Donde se encuentra">
                <b-form-textarea
                    v-model="datos.destino"
                    id="textarea"
                    placeholder="Escribe el lugar donde guardarás el libro"
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
                <small>Escribe el lugar fisico donde se encontrará.</small>
            </b-form-group>
        </b-form-group>

        <template v-slot:modal-footer="{ ok, cancel}">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button  @click="cancel()">
                Cancelar
            </b-button>
            <b-button 
                variant="primary" 
                @click="ok()"
                >
                Aceptar
            </b-button>
        </template>


    </b-modal>
</template>
<script>
import { mapActions,mapState } from 'vuex'
export default {
    data(){
        return{
            libro:null,
            datos:{tituloLibro:'',disponibilidad:'',autor:'',destino:''},  
            camposVacio:{},
            selected: null,
            options: [
                { value: null, text: 'Por favor selecciona alguna opción' },
                { value: '0', text:'Ningún curso'},
                { value: '1', text: 'Primero Basico' },
                { value: '2', text: 'Segundo Basico' },
                { value: '3', text: 'Tercero Basico'},
                { value: '4', text: 'Cuarto Basico'},
                { value: '5', text: 'Quinto Basico'},
                { value: '6', text: 'Sexto Basico'},
                { value: '7', text: 'Septimo Basico'},
                { value: '8', text: 'Octavo Basico'},
                
            ],
            error:{
                titulo:['Falta completar este campo'],
                disponibilidad:['Falta completar este campo'],
                autor:['Falta completar este campo'],
                curso:['Falta completar este campo']
            }
        }
    },
    computed:{
        ...mapState('libros',['jsonLibros'])
    },
    methods:{
        handleEnvio(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            this.nuevoLibro();
        },
        changeCurso(){
            this.camposVacio.curso = false;
        },
        camposValidacion(param){

            if(param.tituloLibro){
                this.camposVacio.titulo = false;
            }
            if(param.disponibilidad){
                this.camposVacio.disponibilidad = false;
            }
            if(param.autor){
                this.camposVacio.autor = false;
            }
        },
        
        nuevoLibro(){
            let datosFormulario = {
                titulo: this.datos.tituloLibro,
                disponibilidad: this.datos.disponibilidad,
                autor: this.datos.autor,
                curso: this.selected,
                destino: this.datos.destino 
            }
            this.camposVacio = this.error;
            this.comprobarCampos();
        },
        comprobarCampos(){
            if(this.camposVacio.titulo == false && this.camposVacio.disponibilidad == false 
                && this.camposVacio.autor == false && this.camposVacio.curso == false){
                
                this.jsonLibros.push({idLibro:5,nombreLibro: this.datos.tituloLibro, autor:this.datos.autor, 
                                    curso:this.selected, disponibilidad:this.datos.disponibilidad, destino});

            }
        },
        resetModal(){
            this.error = {
                            titulo:['Falta completar este campo'],
                            disponibilidad:['Falta completar este campo'],
                            autor:['Falta completar este campo'],
                            curso:['Falta completar este campo']
                        };
            this.camposVacio = {};
            this.datos =  {tituloLibro:'',disponibilidad:'',autor:'',destino:''};

        }
    }
}
</script>