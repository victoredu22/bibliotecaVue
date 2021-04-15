<template>
	<body data-topbar="colored">
		<!-- Begin page -->
		<div id="layout-wrapper">
			<header
				id="page-topbar"
				style="    background-color: #2fa97c;!important;     z-index: 800; !important"
			>
				<div class="navbar-header">
					<div class="d-flex">
						<!-- LOGO -->

						<button
							type="button"
							class="btn btn-sm px-3 font-size-24 header-item waves-effect"
							id="vertical-menu-btn"
						></button>
					</div>

					<div class="d-flex" style="margin-right: 5%;">
						<b-dropdown
							id="dropdown-offset"
							offset="25"
							text="Offset Dropdown"
							toggle-class="text-decoration-none"
							class="m-2"
							variant="primary"
						>
						<!-- 	<template #button-content>
								{{ usuario.nombre }} {{ usuario.apellido }}
							</template> -->

							<b-dropdown-item
								href="#"
								v-on:click="cerrarSesion()"
							>
								Cerrar sesion
							</b-dropdown-item>
						</b-dropdown>
					</div>
				</div>
			</header>
			<!-- ========== Left Sidebar Start ========== -->

			<!--- Sidemenu -->
			<template>
				<sidebar-menu
					:menu="menu"
					:theme="selectedTheme"
					:hideToggle="hideToggle"
					style="max-width: 12%;"
				/>
			</template>

			<!-- Sidebar -->

			<!-- Left Sidebar End -->

			<div
				class="main-content"
				style="width: calc(60); !important; margin-top: 1%;margin-left: 12% !important;"
			>
				<div
					class="page-title-box"
					style="padding: 35px 0px 45px 0px !important; margin: 0 -3% !important;"
				>
					<div class="container-fluid" style="max-width: 90%;">
						<div class="row align-items-center">
							<div class="col-md-8" style="    margin-top: 37px;">
								<h4 class="page-title mb-1">
									{{ jsonTitulo }}
								</h4>
								<ol class="breadcrumb m-0">
									<li
										class="breadcrumb-item active"
										v-for="(menu, index) in this.jsonMenu"
										:key="index"
									>
										<router-link
											:to="{ path: '/' + menu.urlTolbar }"
										>
											{{ menu.nameToolbar }}
										</router-link>
									</li>
								</ol>
							</div>
						</div>
					</div>
				</div>

				<!-- Page-Title -->
				<div class="page-content-wrapper">
					<div class="container-fluid">
						<!-- end page title end breadcrumb -->
						<router-view></router-view>
					</div>
				</div>
				<br />
				<br />
				<footer class="footer" style="left: 12% !important;">
					<div class="container-fluid">
						<div class="row">
							<div class="col-sm-12">
								<div class="text-sm-right d-none d-sm-block">
									<i class="mdi mdi-heart text-danger"></i>
									Vgroup
								</div>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</div>

		<!-- end main content-->
	</body>
</template>
<script>
import { mapActions, mapState } from "vuex";
import router from "../../router";
export default {
	data() {
		return {
			selectedTheme: "white-theme",
			title: "Principal Layout",
			hideToggle: true,
			usuario: "",
			menu: [
				{
					header: "index",
					title: "indice",
					hiddenOnCollapse: true,
				},
				{
					href: "index",
					title: "indice",
					icon: "fa fa-user",
				},
				{
					href: "ingreso-libros",
					title: "ingreso-libros",
					icon: "fa fa-user",
				},
			],
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
		//this.infoUsuario();
	},
};
</script>
<style scoped>
@media screen and (max-width: 600px) {
	.v-sidebar-menu {
		display: none;
	}
}

</style>
