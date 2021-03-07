<template>
    <div class="h-100 no-gutters row">
		<div class="d-lg-flex d-xs-none col-md-7 col-lg-8">
			<div class="slider-light w-100">
				<div class="slick-slider slick-initialized h-100">
					<div class="h-100">
						<div class="position-relative h-100 d-flex justify-content-center align-items-center bg-premium-dark" tabindex="-1">
							<div class="slide-img-bg" :style="{'background-image': 'url(' + require('@/assets/biblioteca.jpg') + ')'}" ></div>

						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center col-md-5 col-lg-4" style="min-height: 100vh">
			<div class="mx-auto app-login-box col-md-10">             
				<form @submit.prevent="envioForm()" autocomplete="off" class="form-horizontal" >

						
						<h2 align="center" style="font-family: sans-serif;margin-top:10%">Administrador Biblioteca</h2>
						<div class="form-group ">
							<p style="margin-top:10%">Ingresa tu rut asociado a un administrador </p>
							<p v-if="msgError" style="color:red">Los datos no coinciden en el sistema <i class="far fa-frown"></i></p>
						</div>
						<div class="form-group ">
							<label for="">Rut</label>
			
							
							<input v-on:keyup="validationRut()" type="text" class="form-control inputRut" v-model="rut"  placeholder="Ej: 17708532-6" v-rut >
							<p v-if="rutInValido" style="color:red">Rut Invalido</p>
						</div>
						<div class="form-group">
							<label for="" >Contraseña</label>
							<input type="password" placeholder="Ej: 123456" class="form-control" v-model="password">
						</div>
						<div class="form-group d-flex flex-row justify-content-center">
							<button v-if="rutInValido" class="btn btn-primary" style="width:100%" disabled>Iniciar Sesion</button>
							<button v-else class="btn btn-primary" type="submit" style="width:100%">Iniciar Sesion</button>
						</div>
				</form>
			</div>
		</div>
    </div>
</template>


<script>
import {mapActions,mapState} from "vuex";
import router from '../router'
import img from '../assets/biblioteca.jpg'


export default {

    data(){
      return{
        mensaje: '',
			  rut:'',
			  rutFormateado:'',
			  rutInValido:false,
			  rutSimple:'',
			  password:'',
			  rutLimpio:'',
			  msgError:false,
				showBottom: false,
				img:''
      }
	},
	
    methods:{
		...mapActions(['setAccessToken']),
		makeToast(variant = null,error) {
			this.$bvToast.toast(error, {
				title: 'Error Encontrado',
				variant: variant,
				solid: true
			})
		},
		envioForm(){
			this.msgError = false;
        this.axios.post('api/login', {
			    numeroDocumento:this.rutLimpio,
          password:this.password,
			}).then(response => {

				if(response.data.error == "Unauthorized"){
					this.msgError = true;
				}
				else if(response.data.msg == "accesoDenegado"){
					this.makeToast('danger',response.data.error);
				}
				else{
          var token = 'Bearer '+ response.data.token.original.access_token;
					//var user = response.data.token.original.user;	
					this.setAccessToken(token);
          router.push({name:'index'});    
				}

      }).catch(error=>{ 
      })  
		},
		gteImagen(){
			this.axios
				.get('api/imagenLogin')
				.then(res=>{
					this.img = res.data.url;

				});
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

		},
	},
	created(){
		this.gteImagen();
	}

}
</script>
<style scoped>
.slick-slider .slide-img-bg{
    opacity: .8 !important;
}

.slick-slider .slide-img-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    opacity: .4;
    z-index: 10;
}
</style>
