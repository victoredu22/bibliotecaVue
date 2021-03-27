<template>
	<div class="d-flex" id="content-wrapper">
      <div id="sidebar-container" class="bg-primary">
        <div class="logo">
          <h3 class="text-light font-weight-bold">Panel Admin</h3>
        </div>

        <div class="menu ">
          <router-link to="/index" v-bind:style="[this.$route.name === 'index' && styleObject]" class="d-block p-3 text-light" id="liMenu">
						<i class="fas fa-home"></i> Index
					</router-link>
          <router-link to="/ingreso-Libros" v-bind:style="[this.$route.name === 'ingreso-Libros' && styleObject]" class="d-block p-3 text-light" id="liMenu">
						<i class="fas fa-book"></i>  ingreso-Libros
					</router-link>
         
        </div>
      </div>
      <div  class="w-100 bg-grey">
        <nav class="navbar navbar-expand-lg bg-light border-bottom">
          <div class="container-fluid">
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
      usuario:{}
		};
	},
	computed: {
		...mapState(["accessToken"]),
		...mapState("menu", ["jsonTitulo"]),
		...mapState("menu", ["jsonMenu"]),
	},
	methods: {
		...mapActions(["removeAccessToken"]),
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
	},
	mounted() {
		this.infoUsuario();
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
