<template>
	<body data-topbar="colored">
		<!-- Begin page -->
		<div id="layout-wrapper">
			<header id="page-topbar" style="    background-color: seagreen;!important;     z-index: 800; !important">
				<div class="navbar-header">
					<div class="d-flex">
						<!-- LOGO -->
		
						<button
							type="button"
							class="btn btn-sm px-3 font-size-24 header-item waves-effect"
							id="vertical-menu-btn"
						></button>
					</div>

					<div class="d-flex">
						<div class="dropdown d-inline-block d-lg-none ml-2">
							<button
								type="button"
								class="btn header-item noti-icon waves-effect"
								id="page-header-search-dropdown"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<i class="mdi mdi-magnify"></i>
							</button>
							<div
								class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
								aria-labelledby="page-header-search-dropdown"
							>
								<form class="p-3">
									<div class="form-group m-0">
										<div class="input-group">
											<input
												type="text"
												class="form-control"
												placeholder="Search ..."
												aria-label="Recipient's username"
											/>
											<div class="input-group-append">
												<button
													class="btn btn-primary"
													type="submit"
												>
													<i
														class="mdi mdi-magnify"
													></i>
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>

						<div class="dropdown d-inline-block">
							<button
								type="button"
								class="btn header-item waves-effect"
								id="page-header-user-dropdown"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<img
									class="rounded-circle header-profile-user"
									src="assets/images/users/avatar-1.jpg"
									alt="Header Avatar"
								/>
								<span class="d-none d-sm-inline-block ml-1"
									>Smith</span
								>
								<i
									class="mdi mdi-chevron-down d-none d-sm-inline-block"
								></i>
							</button>
							<div class="dropdown-menu dropdown-menu-right">
								<!-- item-->
								<a class="dropdown-item" href="#"
									><i
										class="mdi mdi-face-profile font-size-16 align-middle mr-1"
									></i>
									Profile</a
								>
								<a class="dropdown-item" href="#"
									><i
										class="mdi mdi-credit-card-outline font-size-16 align-middle mr-1"
									></i>
									Billing</a
								>
								<a class="dropdown-item" href="#"
									><i
										class="mdi mdi-account-settings font-size-16 align-middle mr-1"
									></i>
									Settings</a
								>
								<a class="dropdown-item" href="#"
									><i
										class="mdi mdi-lock font-size-16 align-middle mr-1"
									></i>
									Lock screen</a
								>
								<div class="dropdown-divider"></div>
								<a class="dropdown-item" href="#"
									><i
										class="mdi mdi-logout font-size-16 align-middle mr-1"
									></i>
									Logout</a
								>
							</div>
						</div>
					</div>
				</div>
			</header>
			<!-- ========== Left Sidebar Start ========== -->

					<!--- Sidemenu -->
					<template>
						<sidebar-menu  :menu="menu" :theme="selectedTheme"  :hideToggle="hideToggle" style="max-width: 12%;"/>
					</template>

					<!-- Sidebar -->

			<!-- Left Sidebar End -->

			<div class="main-content" style="width: calc(70); !important">
				<div class="page-content" style="margin-top:2%">
					<!-- end page title end breadcrumb -->
					<router-view></router-view>
				</div>
				<br />
				<br />
				<footer class="footer">
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
      selectedTheme: 'white-theme',
      title: "Principal Layout",
      hideToggle: true,
			menu: [
				{
					header: 'index',
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
};
</script>
<style scoped>
@media screen and (max-width: 600px) {
.v-sidebar-menu{
display:none;
}
}
</style>
