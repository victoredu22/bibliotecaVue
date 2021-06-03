<template>
	<div class="d-flex" id="content-wrapper">
		<siderContainer />
		<div class="bg-grey container-main">
			<nav class="navbar navbar-expand-lg bg-light border-bottom">
				<div class="container-fluid">
					<menuModal />
					<form class="d-flex position-relative d-inline-block">
						<input
							class="form-control me-2"
							type="search"
							placeholder="Buscar..."
							aria-label="Buscar"
						/>
						<button class="btn btn-search position-absolute" type="submit">
							<i class="icon ion-md-search"></i>
						</button>
					</form>
					<colapseMenu />
				</div>
			</nav>

			<div id="content bg-grey">
				<navbar />
				<section class="bg-mix" style="height:100%">
					<div class="container-fluid ">
						<router-view />
					</div>
				</section>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions } from "vuex";
import siderContainer from "../../components/layout/sider";
import menuModal from "../../components/layout/modalMenuMobile";
import navbar from "../../components/layout/navbar";
import colapseMenu from "../../components/layout/colapseMenu";

export default {
	components: {
		siderContainer,
		menuModal,
		navbar,
		colapseMenu,
	},
	data: () => ({}),
	methods: {
		...mapActions(["setLoadUsuario"]),
		...mapActions("menu", ["loadMenu"]),
		infoUsuario() {
			this.axios
				.get("api/loginLogeado")
				.then((res) => {
					this.usuario = res.data.usuarioDB;
					this.usuario["iniciales"] =
						this.usuario.nombre.substring(0, 1) +
						this.usuario.apellido.substring(0, 1);

					this.setLoadUsuario(this.usuario);
				})
				.catch((err) => console.log(err));
		},
	},
	mounted() {
		this.infoUsuario();
	},
	created() {
		this.loadMenu([
			{
				id: 0,
				name: "index",
				className: "fas fa-home",
				estado: false,
			},
			{
				id: 1,
				name: "ingreso-libros",
				className: "fas fa-book",
				estado: false,
			},
			{
				id: 2,
				name: "buscar-pedido",
				className: "fas fa-search",
				estado: false,
			},
		]);
	},
};
</script>
