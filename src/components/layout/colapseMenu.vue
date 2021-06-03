<template>
	<div class="collapse navbar-collapse" id="navbarSupportedContent">
		<ul class="navbar-nav ml-auto mt-2 mt-lg-0">
			<li class="nav-item dropdown">
				<a
					class="nav-link dropdown-toggle"
					href="#"
					id="navbarDropdown"
					role="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<b-avatar variant="warning" :text="usuario.iniciales"></b-avatar>
					{{ usuario.nombre }} {{ usuario.apellido }}
				</a>

				<ul
					class="dropdown-menu dropdown-menu-right"
					aria-labelledby="navbarDropdown"
				>
					<li><hr class="dropdown-divider" /></li>
					<li>
						<a class="dropdown-item" v-on:click="cerrarSesion()" href="#"
							>Cerrar Sesion</a
						>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import router from "../../router";
export default {
	data: () => ({}),
  computed:{
    ...mapState(["usuario"])
  },
  methods:{
    ...mapActions(["removeAccessToken"]),
    cerrarSesion() {
			this.removeAccessToken();
			router.push({ name: "login" });
		},
  }
};
</script>
