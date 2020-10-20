import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginLayout from '../views/layout/layout-login.vue'
import BaseLayout from '../views/layout/layout-base.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
	base: process.env.BASE_URL,
	routes:[
        {
		    path: '/',
			name: 'login',
			meta: { layout: LoginLayout },
			component: () => import('../views/Login.vue'),

        },
		{
		    path: '/index',
			name: 'index',
			meta: { layout: BaseLayout },
			component: () => import('../views/Index.vue'),
        },
        {
		    path: '/arriendo-libros',
			name: 'arriendo-Libros',
			meta: { layout: BaseLayout },
			component: () => import('../views/arriendoLibros.vue'),
		},
    ]
})

export default router
