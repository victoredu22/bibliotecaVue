<template>
    <div class="page-content-wrapper">
        <div class="container-fluid">
        <div class="row">
            <div class="col-9">
            <div class="card">
                <div class="card-body">
                    <h5 class="header-title mb-4"><i class="fas fa-users"></i> Listado Libros </h5> 
                    <p class="card-title-desc">A continuacion podras ver el listado completo en el libro.</p> 
                    <v-client-table 
                        :data="jsonLibros" 
                        :columns="columns" 
                        :options="options">
                        <b-button 
                            slot="arriendo" 
                            slot-scope="propsAlumno" 
                            v-b-modal.modal-arriendo
                            @click="envioModal(propsAlumno.row)" 
                            variant="outline-primary">
                            <i class="fas fa-graduation-cap"></i> 
                            Arriendo libro alumno
                        </b-button>
                        <b-button 
                            slot="opcion" 
                            slot-scope="propsAlumno" 
                            v-b-modal.modal-editar
                            @click="editarModal(propsAlumno.row)" 
                            variant="outline-success">
                            <i class="far fa-edit"></i>
                            Editar Libro
                        </b-button>
                     </v-client-table>
                </div>
            </div>
            </div>
            <div class="col-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="header-title mb-4"><i class="fas fa-book-medical"></i> Agregar un nuevo libro </h5>
                    <p class="card-title-desc">Haz click para agregar libros para poder agregar uno nuevo.</p>
                    <b-button 
                        v-b-modal.modal-nuevoLibro
                        block 
                        variant="outline-info">
                        <i class="far fa-plus-square"></i>
                        Agregar libro
                    </b-button>
                </div>
            </div>
            </div>
        </div>
        </div>
        <modalArriendo ref="componente" ></modalArriendo>
        <modalLibro></modalLibro>
        <editarLibro ref="componenteEditar"></editarLibro>
    </div>
</template>
<script>
import {mapActions, mapState} from "vuex";
import modalArriendo from '../views/modal/arriendoLibro'
import modalLibro from '../views/modal/nuevoLibro'
import editarLibro from '../views/modal/editarLibro'


export default {
    components:{
        modalArriendo,
        modalLibro,
        editarLibro,
        
    },
    data(){
        return{
            columns: ['idLibro', 'nombreLibro','autor','curso','disponibilidad','arriendo','opcion'],
            options: {
                // see the options API
            }
        }
    },
    computed:{
        ...mapState('libros',['jsonLibros'])
    },
    methods:{
        ...mapActions('libros',['updateLibro']),
              ...mapActions('menu',['updateMenu']),
            ...mapActions('menu',['updateTitulo']),
        envioModal(id){
            this.$refs.componente.envioDatos(id);
        },
        editarModal(obj){
            this.$refs.componenteEditar.datosLibro(obj);

            
        },
        cargaTabla(){
            this.updateLibro([{ idLibro: 1, nombreLibro: "Quijote de la mancha", autor: "pablo neruda",curso:'Segundo Basico',disponibilidad:2,destino:'' },
                            { idLibro: 2, nombreLibro: "Palpelucho", autor: "juan",curso:'Tercero Basico',disponibilidad:4,destino:'Se encuentra en la repisa 2' },
                            { idLibro: 3, nombreLibro: "Principito", autor: "victor",curso:'Cuarto Basico',disponibilidad:1, destino:"Se encuentran la tercera repisa" },
                            { idLibro: 4, nombreLibro: "rey de la selva", autor: "marcelo",curso:"Primero Basico",disponibilidad:0, destino:"" }]);
        }
    },
    created(){
        this.cargaTabla();

          let menu = [ {
                urlTolbar :'index',
                nameToolbar: 'Inicio'
            },
            {
                urlTolbar :'arriendo-libros',
                nameToolbar: 'Arriendo-libros'
            }]
            let titulo = "Panel Arriendo Libros";
            
            this.updateTitulo(titulo);
            this.updateMenu(menu);


    }
}
</script>