<template>

		<div >
		

				
			
	
		
		

		<div :class="{'animate__animated animate__fadeInDown': loadPedido}"   v-for="pedido in pedidos" :key="pedido.id">
			<div class="col-8 ms-3 p-2 align-self-center rounded" style="background-color: #F7F7F7;">
					<div class="row">
 	 					<div class="col-8">
							<label style="font-weight: 700!important;">{{pedido.nombreLibro}}</label>
						</div>
						<div class="col-4 text-center">
							<span class="badge badge-warning"> Pendiente </span>
						</div>
					</div>
					<div class="row">
						<div class="col-4 " style="border-right: 1px solid black;  border-color: #efefef;">
							<span class="text-muted">Alumno </span><br>

							<label style="font-weight: 500!important;">{{pedido.nombre}} {{pedido.apellido}}</label> - <span>{{pedido.nombreCurso}}</span><br>
						</div>
						<div class="col-4 text-center" style="border-right: 1px solid black;  border-color: #efefef;">
							<span class="text-muted"> <i class="far fa-calendar-alt"></i> Fecha Pedido</span><br>
							<label style="font-weight: 400!important;">{{pedido.fechaPedido}}</label><br>
							<label class="text-muted" style="    font-size: 13px;">El libro se encuentra con problemas en la tapa. </label>
						</div>
						<div class="col-4 text-center" >
								<span class="text-muted"><i class="far fa-calendar-alt"></i> Fecha Entrega</span><br>
								<label style="font-weight: 500!important;">{{pedido.fechaEntrega}}</label><br>
								<label class="text-muted" style="    font-size: 13px;">El libro aún no se entrega. </label>
						</div>
					</div>
				</div>
				<br>
		</div>

		<nav aria-label="Page navigation example">
			<ul class="pagination">
				<li v-if="pagination.current_page > 1">
					<a class="page-link" href="#" @click.prevent="changePage(pagination.current_page - 1)" >Atras</a>
				</li>
				<li class="page-item" v-for="(page,index) in pageNumber" :key=index :class="[page === isActived && 'active']">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{page}}</a>
        </li>
				<li v-if="pagination.current_page < pagination.last_page">
          <a class="page-link" href="#" @click.prevent="changePage(pagination.current_page + 1)" >Siguiente</a>
        </li>
			</ul>
		</nav>

		{{ pedidos }}
	</div>
</template>
<script>
import {mapActions, mapState} from 'vuex';
import {paginationData} from '../helper/pagination'
export default {
	data: () => ({
		pedidos: {},
		loadPedido:false,
		pageNumber:{}
	}),
	computed: {
		...mapState("pages", ["pagination"]),
		...mapState("pages", ["offset"]),
		isActived() {
			return this.pagination.current_page;
		},
	},
	methods: {
		...mapActions('pages',['loadItems']),
		...mapActions('pages',['changePagination']),
		async getTable(page) {
			this.loadPedido = false;
			const { data } = await this.axios.get(
				`api/pedidosAll?page=${page}`
			);

			
			this.pedidos = data.getPedidos.data;
			this.loadPedido = true;
			console.log(this.pedidos);


			this.loadItems(data.pagination);
			this.pageNumber = paginationData(this.offset, data.pagination);
		},

		changePage(page) {
			
			//this.paginationLoad.current_page = page;
			this.changePagination(page);
			this.getTable(page);
			
		},
	},
	mounted() {
		this.getTable();
	},
};
</script>
<style scoped>
.pcoolor{
	color:#EDEFFE
}
</style>
