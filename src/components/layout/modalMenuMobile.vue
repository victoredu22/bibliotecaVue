<template>
	<div>
		<input id="mostrar-modal" name="modal" type="radio" @click="scroll(true)" />
		<label @click="eliminarClose()" for="mostrar-modal" id="lblModal">
			<i class="fas fa-bars"></i>
		</label>
		<div id="modal" ref="myModal">
			<input
				id="cerrar-modal"
				name="modal"
				type="radio"
				@click="scroll(false), close()"
			/>
			<label for="cerrar-modal"> X </label>

			<div class="menu">
				<div class="contenedorSesion">
					<i class="fas fa-user-alt"></i>
					<span>
						Hola: {{ this.usuario.nombre }} {{ this.usuario.apellido }}
					</span>
				</div>
				<div class="separadorMenu"></div>

				<div
					v-for="item in jsonMenu"
					:key="item.id"
					class="contenedorMenu"
					@click="scroll(false), close()"
				>
					<span>
						<router-link
							:to="item.name"
							v-bind:style="[$route.name === item.name && { color: '#007bff' }]"
							style="color:white"
						>
							<i :class="item.className"></i> {{ item.name }}
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
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import router from "../../router";

export default {
	data: () => ({}),
  computed: {
		...mapState("menu", ["jsonMenu"]),
		...mapState(["usuario"])
	},
	methods: {
    ...mapActions(["removeAccessToken"]),
		scroll(estado) {
			document.body.className = estado ? "bodyHome" : "null";
		},
		cerrarSesion() {
			this.removeAccessToken();
			router.push({ name: "login" });
		},
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
	},
  mounted(){
    this.scroll(false);
  }
};
</script>
