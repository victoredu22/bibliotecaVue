<template>
	<div class="row">
		<div class="col-xl-3">
			<div class="card">
				<div class="card-body">
					<div class="row">
						<div class="col-6">
							<h4>
								<i class="fas fa-university"></i>
								Colegio Cumbre
							</h4>
							<p class="text-muted">
								{{ currentDateTime() }}
							</p>
						</div>
						<div class="col-5 ml-auto">
							<div>
								<img
									src="https://im0-tub-com.yandex.net/i?id=a9ab8ad65c5e6b8d6f8d93d4749f84f3&n=13"
									alt=""
									class="img-fluid"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<chartPedidos />
			<tablasStock />
		</div>

		<div class="col-xl-9">
			<headPedido />
			<tablaPedidoAnual />
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";

import moment from "moment";
import es from "moment/locale/es";

import tablaPedidoAnual from "../index/tablaPedidosAnual";
import headPedido from "./headInfoPedido";
import chartPedidos from "./chartPedidos";
import tablasStock from "../index/tablaStock";

export default {
	components: {
		tablasStock,
		tablaPedidoAnual,
		chartPedidos,
		headPedido,
	},
	data:()=> ({
	}),
	methods: {
		currentDateTime() {
			return moment().format("LL");
		},

	},
};
</script>
