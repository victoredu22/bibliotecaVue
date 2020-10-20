<template>
    <b-modal  id="modal-editar"  @ok="handleEnvio" >
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
                    v-model="datos.disponibilidad"
                    placeholder="Ingresa el titulo del material"
                    type="text"
                    >
                </b-form-input>
            </b-form-group>
            <b-form-group label="Nombre autor *">
                <b-form-input
                    v-model="datos.autor"
                    placeholder="Ingresa el titulo del material"
                    type="text"
                    >
                </b-form-input>
            </b-form-group>
            <b-form-group label="Curso*">
               <b-form-select 
                    v-model="datos.curso"
                    @change="changeCurso($event)" 
                    :options="options"
                    >
                </b-form-select>
            </b-form-group>
            <b-form-group label="Destino">
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
            datos:{tituloLibro:'',disponibilidad:'',autor:'',destino:''},
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
            selectCurso:null
        }
    },
    computed:{
        ...mapState('libros',['jsonLibros'])
    },
    methods:{
        handleEnvio(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            this.updateLibro();
        },
        updateLibro(){
            

            var nombreCurso = '';
            if(this.selectCurso){
                nombreCurso = this.cambioCursoNumero(parseInt(this.selectCurso));
            }else{
                nombreCurso = this.cambioCursoNumero(parseInt(this.datos.curso));
            }
    
            //cuando se ejecuta la accion se disminuye en un la disponibilidad
            for(const [index,libro] of this.jsonLibros.entries()){
                if(this.datos.idLibro == libro.idLibro ){
                    this.jsonLibros[index].autor = this.datos.autor;
                    this.jsonLibros[index].nombreLibro = this.datos.nombreLibro;
                    this.jsonLibros[index].curso = nombreCurso;
                    this.jsonLibros[index].disponibilidad = this.datos.disponibilidad;
                    this.jsonLibros[index].destino = this.datos.destino;
                }
            }  
        },
        datosLibro(obj){

            this.datos = {idLibro:obj.idLibro, nombreLibro:obj.nombreLibro, autor:obj.autor, curso: this.cambioCurso(obj.curso),
                        disponibilidad: obj.disponibilidad, destino: obj.destino}
        },
        changeCurso(event){
            this.selectCurso = event;
        },
        cambioCurso(text){
            var value=0;
            switch (text) {
                case 'Ningún curso':
                    return value = 0
                    break;
                case 'Primero Basico':
                    return value = 1
                    break;
                case 'Segundo Basico':
                    return value = 2
                    break;
                case 'Tercero Basico':
                    return value = 3
                    break;
                case 'Cuarto Basico':
                    return value = 4
                    break;
                case 'Quinto Basico':
                    return value = 5
                    break;
                case 'Sexto Basico':
                    return value = 6
                    break;
                case 'Septimo Basico':
                    return value = 7
                    break;
                case 'Octavo Basico':
                    return value = 8
                    break;
                default:
                    break;
            }
        },
        cambioCursoNumero(text){
            var value=0;
            switch (text) {
                case 0:
                    return value = 'Ningún curso'
                    break;
                case 1:
                    return value = 'Primero Basico'
                    break;
                case 2:
                    return value = 'Segundo Basico'
                    break;
                case 3:
                    return value = 'Tercero Basico'
                    break;
                case 4:
                    return value = 'Cuarto Basico'
                    break;
                case 5:
                    return value = 'Quinto Basico'
                    break;
                case 6:
                    return value = 'Sexto Basico'
                    break;
                case 7:
                    return value = 'Septimo Basico'
                    break;
                case 8:
                    return value = 'Octavo Basico'
                    break;
                default:
                    break;
            }
        },
        
    }
}
</script>