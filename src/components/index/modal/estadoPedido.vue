<template>
	<b-modal id="modal-estadoPedido" @show="resetModal" @ok="handleEnvio">
		<template v-slot:modal-title>
			<span>Agregar un nuevo pedido libro</span>
		</template>
		<div class="media">
			<div dir="ltr" class="ml-2">
				<div>
					<i
						class="fas fa-book"
						style="font-size: 70px; color:#14b3e2a6;margin-top: 10%;"
					></i>
				</div>
			</div>

			<div class="media-body" style="margin-left:20px">
				<h4>{{ pedido.nombreLibro }}</h4>
				<li class="liNone">
					Nombre Libro :
					<span class="spanGreen">{{ pedido.nombreAlumno }}</span>
				</li>
				<li class="liNone">
					Fecha Entrega :
					<span class="spanGreen">
						{{ pedido.fechaEntrega }}
					</span>
				</li>
				<li class="liNone">
					Estado Pedido :
					<select name="select" v-model="selected">
						<option
							v-for="option in options"
							v-bind:value="option.value"
							:key="option.value"
						>
							{{ option.text }}
						</option>
					</select>
				</li>
			</div>
		</div>
		<template v-slot:modal-footer="{ ok, cancel }">
			<!-- Emulate built in modal footer ok and cancel button actions -->
			<b-button @click="cancel()">
				Cancelar
			</b-button>
			<b-button variant="primary" @click="ok()">
				Aceptar
			</b-button>
		</template>
		<toastComponent ref="toastComponent"></toastComponent>
	</b-modal>
</template>
<script>
import { mapActions, mapState } from "vuex";
import toastComponent from "@/components/toastComponent";


export default {
	components: {
		toastComponent
	},
	data() {
		return {
			pedido: "",
			estado: {
				pendiente: false,
				entregado: false,
			},

			selected: "",
			options: [
				{ text: "Pendiente", value: 1 },
				{ text: "Entregado", value: 2 },
			],
		};
	},
	computed: {
		...mapState("pedidos", ["jsonPedido"]),
	},
	methods: {
		...mapActions("pedidos", ["updatePedido"]),
		sendPedido(data) {
			this.pedido = data;
			const { estado } = this.pedido;
			this.selected = estado == 1 ? 1 : 2;
			console.log(this.pedido);
		},
		handleEnvio(bvModalEvt) {
			this.updateEstado();
			bvModalEvt.preventDefault();
		},
		updateEstado() {
			const form = {
				idPedido: this.pedido.idPedido,
				estado: this.selected,
			};
			this.axios.post(`api/updateEstadoLibro`, form).then((res) => {
				const arrayToast = {
					msg: `Felicitaciones el estado ha cambiado a ${
						this.selected == 1 ? "Pendiente" : "Entregado"
					} `,
					title: "Exito",
					variant: "success",
				};
				this.$refs.toastComponent.makeToast(arrayToast);

				const pedido = this.jsonPedido.find(
					(elem) => elem.idPedido == this.pedido.idPedido
				);
				pedido.estado = this.selected;
			});
		},
		resetModal() {},
	},
	created() {},
};
</script>
<style scoped>
.disabled {
	background-color: #d6d6d6;
}
.spanTituloGreen {
	color: #045e04;
	font-weight: 700;
}
.liNone {
	list-style: none;
}
.spanGreen {
	color: #045e04;
}
</style>
