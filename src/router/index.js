import Vue from "vue";
import VueRouter from "vue-router";
import LoginLayout from "../views/layout/layout-login.vue";
import BaseLayout from "../views/layout/layout-base.vue";
import BaseLayout2 from '../views/layout/layout-base2.vue'
import store from "../store";
import axios from "axios";
/* import '@/assets/css/adminlte.min.css'


 */
Vue.use(VueRouter);
function guard(to, from, next) {
	if (store.state.autenticado == "true" || store.state.autenticado) {
		axios.defaults.headers.Authorization = store.state.accessToken;

		next();
	} else {
		next("/");
	}
}

function verifyAutenticado(to, from, next) {
	next();
}


const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "login",
			meta: { layout: LoginLayout },
			component: () => import("../views/Login.vue"),
			beforeEnter: verifyAutenticado,
		},
		{
			path:"/nuevoLayout",
			name:'nuevoLayout',
			meta:{layout:BaseLayout2},
			component: () => import("../components/hola.vue"),
			beforeEnter: guard,
		},
		{
			path: "/index",
			name: "index",
			meta: { layout: BaseLayout2 },
			component: () => import("../views/Index.vue"),
			beforeEnter: guard
		},
		{
			path: "/ingreso-libros",
			name: "ingreso-Libros",
			meta: { layout: BaseLayout2 },
			component: () => import("../views/arriendoLibros.vue"),
			beforeEnter: guard
		},
		{
			path: "/buscar-pedido",
			name: "buscar-pedido",
			meta: { layout: BaseLayout2 },
			component: () => import("../views/buscadorPedido.vue"),
			beforeEnter: guard
		},
	],
});

router.beforeEach((to, from, next) => {
	/** Se intercepta cada petición axios y se controla el error 401, para alumnos que perdieron la vigencia de dsu token **/
	axios.interceptors.response.use(
		
		function(response) {
	
			if (response.data.status === "Token is Expired") {
				return next("/");
			}
			//console.log(response);
			return response;
		},
	);
	
	return next();
});
export default router;
