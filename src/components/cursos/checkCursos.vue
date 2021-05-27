<template>
	<div>
		<div>
			<b-form-checkbox
				v-for="(curso, key) in dataCursos"
				:key="key"
				v-model="selected"
				:value="curso.nombreCurso"
				name="cursoChecked"
				@change="seleccionCurso(curso)"
			>
				{{ curso.nombreCurso }}
			</b-form-checkbox>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { fetchToken } from "@/helper/axios";
import { pedidosItems, formatFechaPedido } from "@/helper/listadoItems";

export default {
	data: () => ({
		selected: [],
	}),
	computed: {
		...mapState("cursos", ["dataCursos"]),
		...mapState("cursos", ["activeCurso"]),
		...mapState("pedidos",["buscador"]),
	},
	methods: {
		...mapActions("cursos", ["uploadCurso"]),
		...mapActions("cursos", ["startActiveCurso"]),
		...mapActions("alumnos", ["uploadAlumnos"]),
		...mapActions("pages", ["loadItems"]),
		...mapActions("pages", ["loadData"]),
		...mapActions('alumnos',['setActiveAlumno']),
		async loadCursos() {
			const { data } = await this.axios.get("api/cursoAll");
			const { getCurso } = data;

			this.uploadCurso(getCurso);
		},

		async seleccionCurso(curso) {
			this.startActiveCurso(curso);
			this.setActiveAlumno(undefined);


			const idCursos = this.activeCurso.map((curso) => curso.idCurso);

      const {data} = await fetchToken('searchAlumnoCurso',{idCursos},'POST')
			this.uploadAlumnos(data.alumnos);
			

      //carga pagination
			const {  data:dataBusqueda } = await pedidosItems({
				activeAlumno:undefined,
				activeCurso: this.activeCurso.length,
				buscador:this.buscador,
				idCursos,
				page: 1,
			});

			const pedidos = formatFechaPedido(dataBusqueda.getPedidos.data);

			this.loadData(pedidos);
			this.loadItems(dataBusqueda.pagination);
		},
	},
	mounted() {
		this.loadCursos();
	},
};
</script>
