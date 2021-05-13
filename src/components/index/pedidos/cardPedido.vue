<template>
	<div class="row">
		<div v-if="dataPage.length === 0" class="col-md-12">
			<div class="col-12 ms-3 rounded bg-light text-center p-5">
				<p><i class="fas fa-ban"></i> No se encontraron resultados.</p>
			</div>
		</div>
		
		<div
			class="col-12 mb-2"
			:class="{ 'animate__animated animate__fadeInDown': loadPedido }"
			v-for="pedido in dataPage"
			:key="pedido.id"
		>
			<div
				v-b-modal.modal-estadoPedido
				@click="enviarDatosPedido(pedido.idPedido)"
				class="col-12 ms-3 rounded cardPedido"
			>
				<div class="row">
					<div class="col-8">
						<label class="lblPedido">{{
							pedido.nombreLibro
						}}</label>
					</div>
					<div class="col-4 text-center">
						<span
							v-if="pedido.estado == 1"
							class="badge badge-warning"
						>
							Pendiente
						</span>
						<span v-else class="badge badge-primary">
							Entregado
						</span>
					</div>
				</div>
				<div class="row">
					<div class="col-4 infoPedido">
						<span class="text-muted">Alumno </span><br />
						<label class="lblPedido">
							{{ pedido.nombre }} {{ pedido.apellido }} -
						</label>
						<span>
							{{ pedido.nombreCurso }}
						</span>
					</div>
					<div class="col-4 text-center detallePedido">
						<span class="text-muted">
							<i class="far fa-calendar-alt"></i> 
							Fecha
							Retiro</span
						><br />
						<p class="fechaEntrega">{{ pedido.fechaRetiro }}</p>
						<label class="text-muted textResena"
							>{{pedido.estadoRetiro === null ? '-' : pedido.estadoRetiro}}
						</label>
					</div>
					<div class="col-4 text-center">
						<span class="text-muted"
							><i class="far fa-calendar-alt"></i> Fecha Limite
							Entrega</span
						><br />
						<label class="fechaEntrega">
							{{pedido.fechaEntrega}}
						</label
						><br />
						<label class="text-muted textResena"
							>{{pedido.estadoEntrega === null ? '-' : pedido.estadoEntrega}}
						</label>
					</div>
				</div>
			</div>
			<br />
		</div>
		<modalEstadoPedido ref="modalEstadoPedido" />
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import modalEstadoPedido from "../modal/estadoPedido";
export default {
	components: {
		modalEstadoPedido,
	},
	data: () => ({
		pedidos: {},
	}),
	computed: {
		...mapState("pages", ["dataPage"]),
		...mapState("pages", ["loadPedido"]),
	},
	methods: {
		...mapActions("pages", ["activePedido"]),
		enviarDatosPedido(idPedido) {

			this.activePedido(idPedido);
			this.$refs.modalEstadoPedido.sendPedido();
		},
	},
};
</script>
<style scoped>
.lblPedido {
	font-weight: 700 !important;
}
.cardPedido {
	background-color: #f7f7f7;
	cursor: pointer;
	padding: 1%;
}
.cardPedido:hover {
	background-color: #d6e9ffb9;
}
.infoPedido {
	border-right: 1px solid black;
	border-color: #efefef;
}
.detallePedido {
	border-right: 1px solid black;
	border-color: #efefef;
}
.fechaEntrega {
	font-weight: 500 !important;
}
.textResena {
	font-size: 13px;
}
</style>
