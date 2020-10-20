<template>
    <b-modal  id="modal-arriendo"  @ok="handleEnvio" >
        <template v-slot:modal-title>
            <span>Asignar libro a estudiante</span>
        </template>
        <div class="media">
            <div dir="ltr" class="ml-2">
                <div >
                    <i class="fas fa-book" style="font-size: 70px; color:#14b3e2a6;margin-top: 10%;"></i>   
                </div>
            </div>
            <div class="media-body" style="margin-left:20px">
                <h4>{{capitalizarPalabras(libro.nombreLibro)}}</h4>
                    <li style="list-style: none;">Autor : <span style="color:#045e04;font-weight: 700;">{{capitalizarPalabras(libro.autor)}}</span></li>
                    <li style="list-style: none;">Curso Asociado : <span style="color:#045e04;">{{libro.curso}}</span></li>
                    <li style="list-style: none;">Disponibilidad : <span style="color:#045e04;">{{libro.disponibilidad}}</span></li>
            </div>
        </div>
        <b-form-group>
            <b-form-group label="Ingresa el rut del alumno." style="margin-top:20px">
                <b-alert v-if="rutInValido" show variant="danger">Rut Invalido :( </b-alert>
                <input 
                    v-on:keyup="validationRut()" 
                    type="text" 
                    class="form-control inputRut"
                    v-model="rut"  
                    placeholder="Ej: 17708532-6" 
                    v-rut>
                <small>Ingresa el rut del alumno que deseas prestarle el libro</small>
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
        <toastComponent ref="toastComponent" ></toastComponent>
    </b-modal>
</template>
<script>
import { mapActions,mapState } from 'vuex'
import toastComponent from '../../components/toastComponent'
export default {
    components:{
        toastComponent
    },
    data(){
        return{
            libro:'',
            rut:'',
            rutInValido:''
        }
    },
    computed:{
        ...mapState('libros',['jsonLibros'])
    },
    methods:{
        handleEnvio(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            this.formLibro();
        },
        formLibro(){
            let formulario = {
                idLibro:this.libro.idLibro,
                rutAlumno:this.limpiaRutAlumno(this.rut)
            } 


    
            //cuando se ejecuta la accion se disminuye en un la disponibilidad
            for(const [index,libro] of this.jsonLibros.entries()){
                if(this.libro.idLibro == libro.idLibro ){
                    this.jsonLibros[index].disponibilidad --;
                }
            }

            //mensaje de que todo salio bien
            let arrayToast = {
                msg:'Salio todo bien',
                title: 'Exito',
                variant: 'success'
            };
            this.$refs.toastComponent.makeToast(arrayToast);
            console.log(this.jsonLibros);
        },
        limpiaRutAlumno(rut){
            let rutAlumno = rut.replace(/\./g,'')
                rutAlumno = rutAlumno.split ("-");
                rutAlumno = rutAlumno[0];

            return rutAlumno;
        },
        envioDatos(array) {
            this.libro = array;
        },
        capitalizarPalabras( val ) {
            if(val){
            return val.toLowerCase()
                    .trim()
                    .split(' ')
                    .map( v => v[0].toUpperCase() + v.substr(1) )
                    .join(' ');
           
            }
        },
        validationRut(){
			let rutSimple = this.rut.replace(/\./g, ""); 
			var guion = rutSimple.replace(/\-/g, "");
		
			rut = rutSimple.split("-");
			this.rutLimpio = rut[0];

			// Divide el valor ingresado en dígito verificador y resto del RUT.
			let cuerpo = guion.slice(0, -1);
			let dv = guion.slice(-1).toUpperCase();

		  
			// Formatear RUN
			var rut = cuerpo + '-'+ dv;

			 // Calcular Dígito Verificador
			var suma = 0;
			var multiplo = 2;
			
			
    		if(cuerpo.length < 7) { 
				this.rutInValido = true; 
				//console.log("RUT Incompleto"); 
				return false;
			}

			// Para cada dígito del Cuerpo
			for(var i=1;i<=cuerpo.length;i++) {
			
				// Obtener su Producto con el Múltiplo Correspondiente
				var index = multiplo * rutSimple.charAt(cuerpo.length - i);
				// Sumar al Contador General
				suma = suma + index;
				// Consolidar Múltiplo dentro del rango [2,7]
				if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
		
			}
			// Calcular Dígito Verificador en base al Módulo 11
			var dvEsperado = 11 - (suma % 11);
			// Casos Especiales (0 y K)
			dv = (dv == 'K')?10:dv;
			dv = (dv == 0)?11:dv;
    		if(dvEsperado != dv) { 
				//console.log("RUT Inválido");
				this.rutInValido = true; 
				return false; 
			}else{
				this.rutInValido = false
				//console.log("valido");
			}
        }
    }
}
</script>
<style scoped>
    .disabled{
        background-color:#d6d6d6;
    }
</style>