<template>
	<div>
		<ul>
			<li v-for="pedido in pedidos" :key="pedido.id">
				{{ pedido.nombreLibro }}
			</li>
		</ul>



		<nav aria-label="Page navigation example">
			<ul class="pagination">
				<li v-if="pagination.current_page > 1">
					<a class="page-link" href="#" @click.prevent="changePage(pagination.current_page - 1)" >Atras</a>
				</li>
				<li class="page-item" v-for="(page,index) in pagesNumber" :key=index :class="[page === isActived && 'active']">
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
export default {
	data: () => ({
		pedidos: {
			// see the options API
		},
		pagination: {
			total: 0,
			current_page: 0,
			per_page: 0,
			last_page: 0,
			from: 0,
			to: 0,
		},
    offset:3,
	}),
	computed: {
		isActived() {
			return this.pagination.current_page;
		},
		pagesNumber() {
			if (!this.pagination.total) {
				return [];
			}

			var from = this.pagination.current_page - this.offset; //TODO offset

			if (from < 1) {
				from = 1;
			}

			var to = from + (this.offset * 2); //TODO
			if (to >= this.pagination.last_page) {
				to = this.pagination.last_page;
			}

			var pagesArray = [];
			while (from <= to) {
				pagesArray.push(from);
				from++;
			}

			return pagesArray;
		},
	},
	methods: {
		async getTable(page) {

			const { data } = await this.axios.get(
				`api/pedidosAll?page=${page}`
			);

			console.log(data.pagination);

			this.pedidos = data.getPedidos.data;
			this.pagination = data.pagination;


		},

		changePage(page) {
			this.pagination.current_page = page;
			this.getTable(page);
		},
	},
	mounted() {
		this.getTable();
	},
};
</script>
