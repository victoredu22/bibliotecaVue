<template>
	<div class="row">
		<div class="col-xl-12">
			<div class="card ">
				<div class="card-body">
					<div class="row">
						<div class="col-xl-10">
							<h5 class="header-title">
								Tabla de pedidos en el año
							</h5>
						</div>
						<div class="col-xl-2">
							<b-button
								variant="outline-info"
								v-b-modal.modal-nuevoPedido
							>
								<i class="fas fa-plus"></i>
								Nuevo pedido libro
							</b-button>
						</div>
					</div>
					<PuSkeleton v-if="tablaAlumnos" :count="5" />
					<v-client-table
						v-else
						:data="jsonPedido"
						:columns="columns"
						:options="options"
					>
						<b-badge
							v-b-modal.modal-estadoPedido
							slot="estado"
							slot-scope="propsPedido"
							v-if="propsPedido.row.estado == 1"
							variant="warning"
							style="cursor: pointer;"
							@click="enviarDatosPedido(propsPedido.row.idPedido)"
						>
							Pendiente
						</b-badge>
						<b-badge
							v-b-modal.modal-estadoPedido
							v-else
							slot="estado"
							variant="primary"
							style="cursor: pointer;"
							@click="enviarDatosPedido(propsPedido.row.idPedido)"
						>
							Entregado
						</b-badge>
					</v-client-table>
				</div>
			</div>
			<modalEstadoPedido ref="modalEstadoPedido"/>
			<modalNuevoPedido />
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import modalEstadoPedido from "./modal/estadoPedido.vue";
import  modalNuevoPedido  from './modal/nuevoPedido.vue';

export default {
	components:{
		modalEstadoPedido,
		modalNuevoPedido
	},
	data: () => ({
		columns: [
			"idPedido",
			"nombreAlumno",
			"nombreLibro",
			"fechaEntrega",
			"estado",
		],
		options: {
			// see the options API
		},
	}),
	computed: {
		...mapState("pedidos", ["jsonPedido"]),
		tablaAlumnos(){
			return this.jsonPedido.length > 0 ? false : true;
		}
	},
	methods: {
		...mapActions("pedidos",['activePedido']),
		
		enviarDatosPedido(idPedido) {
			this.activePedido(idPedido);
			this.$refs.modalEstadoPedido.sendPedido();
		},
	},
};
</script>
