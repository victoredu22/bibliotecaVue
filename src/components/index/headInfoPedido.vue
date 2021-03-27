<template>
	<div class="row">
		<div class="col-md-4">
			<b-alert show variant="info">
				<PuSkeleton v-if="cargaDatos" :count="2" />
				<div  v-else class="alerta"> 
					<h4 class="alert-heading">
						{{ pedidoMes.length }} Pedidos este mes.
					</h4>
					<p>
						Totalidad de libros solicitados este mes
					</p>
				</div>
			</b-alert>
		</div>
		<div class="col-md-4">
			<b-alert show variant="warning">
				<PuSkeleton v-if="!dataAlumnos.length > 0" :count="3" />
				<div  v-else class="alerta"> 
				<h4 class="alert-heading">
					{{ dataAlumnos.length }} Alumnos totales.
				</h4>
				<p>
					Totalidad de alumnos inscritos en el sistema. recuerda
					actualizar los alumnos cada año.
				</p>
				</div>
			</b-alert>
			
		</div>
		<div class="col-md-4">
			<b-alert show variant="success">
	
				<PuSkeleton v-if="!jsonLibros.length > 0" :count="2" />
				<div  v-else class="alerta"> 
					<h4 class="alert-heading">
						{{ jsonLibros.reduce((a, b) => a + b.cantidad, 0) }} Libros en el sistema.
					</h4>
					<p>
						Totalidad de libros en el sistema de biblioteca.
					</p>
				</div>
			</b-alert>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
export default {
	data: () => ({
	}),
	computed:{
		...mapState("alumnos", ["dataAlumnos"]),
		...mapState("libros", ["jsonLibros"]),
		...mapState("pedidos",['pedidoMes']),
		cargaDatos(){
			return (this.pedidoMes.length != "") ? false : true; 
		}
	},
};
</script>
