<template>
	<div class="d-flex" id="content-wrapper">
      <div id="sidebar-container" class="bg-primary">
        <div class="logo">
          <h3 class="text-light font-weight-bold">Aministrador Biblioteca</h3>
        </div>

        <div class="menu" v-for="item in menu" :key="item.id" >
          <router-link :to="item.name" v-bind:style="[$route.name === item.name && styleObject]" class="d-block p-3 text-light" id="liMenu">
						<i :class="item.className"></i> {{item.name}}
					</router-link>
        </div>

      </div>
      <div  class="w-100 bg-grey">
        <nav class="navbar navbar-expand-lg bg-light border-bottom">
          <div class="container-fluid">




            <input id="mostrar-modal" name="modal" type="radio" @click="scroll(true)"/>
            <label @click="eliminarClose()" for="mostrar-modal" id="lblModal"> <i class="fas fa-bars"></i> </label>
            <div id="modal" ref="myModal" >

            <input id="cerrar-modal" name="modal" type="radio" @click="scroll(false),close()" />
            <label for="cerrar-modal"> X </label>

            <div class="menu"> 
                <div class="contenedorSesion">
                  <i class="fas fa-user-alt"></i> 
                  <span>
                    Hola: {{this.usuario.nombre}} {{this.usuario.apellido}}
                  </span>                
                </div>
                <div class="separadorMenu"></div>
              
                <div v-for="item in menu" :key="item.id" class="contenedorMenu"  @click="scroll(false),close()">
                  <span>
                      <router-link :to="item.name" v-bind:style="[$route.name === item.name && {color:'#007bff'}]" style="color:white" >
                        <i :class="item.className"></i> {{item.name}}
                      </router-link>
                  </span>
                </div>
                <div class="divLogout">
                  <div class="contenedorLogout" @click="cerrarSesion()">
                      <i class="fas fa-sign-out-alt"></i> 
                      <span>
                        Salir  
                      </span> 
                  </div>
                </div>
              </div>
            </div>


            <form class="d-flex position-relative d-inline-block">
                <input class="form-control me-2" type="search" placeholder="Buscar..." aria-label="Buscar">
                <button class="btn btn-search position-absolute" type="submit"><i class="icon ion-md-search"></i></button>
              </form>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <b-avatar
                      variant="warning"
                      :text="usuario.iniciales"
                    ></b-avatar>
                    {{usuario.nombre}} {{usuario.apellido}} 
                  </a>

                  <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
   
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" v-on:click="cerrarSesion()" href="#">Cerrar Sesion</a></li>
                  </ul>
                </li>
              </ul>   
            </div>
          </div>
        </nav>
        <div id="content bg-grey"  class="bg-grey w-100">
          <section class="bg-light py-3">
            <div class="container-fluid bg-light">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-light">
                 	<li
											class="breadcrumb-item"
											v-for="(menu, index) in this.jsonMenu"
											:key="index"
										>
											<router-link v-if="menu.nameToolbar === 'Inicio'" :to="{ path: '/' + menu.urlTolbar }">
												 <i class="fas fa-home"></i> {{ menu.nameToolbar }}
											</router-link>
                      <router-link v-else :to="{ path: '/' + menu.urlTolbar }">
											   {{ menu.nameToolbar }}
											</router-link>
										</li>
                </ol>
              </nav>
            </div>
          </section>


          <section class="bg-mix">
            <div class="container-fluid ">
              <router-view />
            </div>
          </section>

        </div>
      </div>
      
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import router from "../../router";
export default {
	data() {
		return {
      styleObject: {
        backgroundColor: '#5767EE',
      },
      menu:[
        {
          id:0,
          name:'index',
          className:'fas fa-home',
          estado:false
        },
        {
          id:1,
          name:'ingreso-libros',
          className:'fas fa-book',
          estado:false
        },
        {
          id:2,
          name:'buscar-pedido',
          className:'fas fa-search',
          estado:false
        }
      ],
      usuario:{},
      estadoScroll:false,
		};
	},
	computed: {
		...mapState(["accessToken"]),
		...mapState("menu", ["jsonTitulo"]),
		...mapState("menu", ["jsonMenu"]),
	},
	methods: {
		...mapActions(["removeAccessToken"]),
    close(){
      this.$refs["myModal"].className = "cerrarModal";
    },
    eliminarClose(){
      this.$refs["myModal"].className = "";
    },
		cerrarSesion() {
			this.removeAccessToken();
			router.push({ name: "login" });
		},
		infoUsuario() {
			this.axios
				.get("api/loginLogeado")
				.then((res) => {
					this.usuario = res.data.usuarioDB;
					this.usuario["iniciales"] =
						this.usuario.nombre.substring(0, 1) +
						this.usuario.apellido.substring(0, 1);
				})
				.catch((err) => console.log(err));
		},
    scroll(estado){
      document.body.className = estado ? 'bodyHome' : 'null';
    },

	},
	mounted() {
		this.infoUsuario();
    this.scroll(false)
	},
};
</script>
<style scoped>



  

  .bg-light { background-color: var(--white) !important; }
  .bg-primary{
    background-color: var(--primary) !important;
  }
  .bg-mix{ background: linear-gradient(180deg, var(--white) 10%, var(--grey) ) ; }
  .bg-grey {background-color: var(--grey) !important;}
  .btn{
    border: 0;
  }
  .btn-primary{
    background-color: var(--primary) !important;
  }
  .btn-primary:hover{
     background-color: var(--primary) !important;
  }
  #sidebar-container{
      min-height: 100vh;
  }
  #sidebar-container .logo{
    padding: .875rem 1.25rem;
  }
  #sidebar-container .menu{
    width: 18rem;
  }
  .btn-search{
    right: 5px;
  }
  .avatar{
    max-width: 35px;
  }
  #content{
    overflow-y: auto;
    padding-bottom: 5rem;
  }
  .stat{
    border-right: 1px solid var(--grey);
  }
  #sels{
    border-bottom: 1px solid var(--grey);
  }
  a:link, a:visited, a:active {
    text-decoration:none;
  } 
  a#liMenu:hover {
    background-color:#5767EE;
  }
</style>
