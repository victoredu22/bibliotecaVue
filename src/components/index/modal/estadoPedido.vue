<template>
	<b-modal id="modal-estadoPedido" @show="resetModal" @ok="handleEnvio">
		<template v-slot:modal-title>
			<span>Cambiar el estado del pedido</span>
		</template>

		<div class="d-flex">
			<div class="col-md-12">
				<h4>{{ pedido.nombreLibro }}</h4>
				<li class="liNone">
					Nombre Alumno :
					<span class="spanGreen">
						{{ pedido.nombre }} {{ pedido.apellido }}
					</span>
				</li>
				<li class="liNone">
					Fecha Limite Entrega:
					<span class="spanGreen">
						{{ pedido.fechaEntrega }}
					</span>
				</li>
				<li class="liNone">
					Estado Pedido :
					<select
						class="form-select"
						name="select"
						v-model="selected"
					>
						<option
							v-for="option in options"
							v-bind:value="option.value"
							:key="option.value"
						>
							{{ option.text }}
						</option>
					</select>
				</li>
				<li v-if="selected === 2" class="liNone">
					<label class="form-label">Estado Libro:</label>
					<textarea
						class="form-control"
						rows="3"
						v-model="pedido.estadoEntrega"
					></textarea>
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
	</b-modal>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { makeToast } from "@/helper/makeToast";
export default {
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
		...mapState("pages", ["active"]),
	},
	methods: {
		...mapActions("pages", ["changeActivePedido"]),
		...mapActions("pages", ["updateEstadoPedido"]),
		sendPedido() {
			this.pedido = {
				...this.active,
				estadoEntrega:
					this.active.estadoEntrega === null
						? "El libro se encuentra en el mismo estado como se entrego."
						: this.active.estadoEntrega,
			};
			const { estado } = this.pedido;
			this.selected = estado == 1 ? 1 : 2;
		},
		handleEnvio(bvModalEvt) {
			// Prevent modal from closing
			bvModalEvt.preventDefault();
			this.formEstado();
		},
		async formEstado() {
			const form = {
				idPedido: this.pedido.idPedido,
				estado: this.selected,
				estadoEntrega:
					this.selected === 2 ? this.pedido.estadoEntrega : null,
			};

			const { data } = await this.axios.post(
				`api/updateEstadoLibro`,
				form
			);
			const { updatePedido: pedido } = data;

			this.updateEstadoPedido(pedido);
			this.changeActivePedido(pedido);
			makeToast({
				msg: `Felicitaciones el estado ha cambiado a ${
					this.selected == 1 ? "Pendiente" : "Entregado"
				} `,
				title: "Exito",
				variant: "success",
				solid: true,
			});
		},
		resetModal() {},
	},
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
