<template>
    <div class="row">
      <div class="col-md-3 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <h4>
                  <i class="fas fa-university"></i>
                  Colegio Cumbres
                </h4>
                <p class="text-muted">
                  {{ currentDateTime }}
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
        <br />
        <headInfoPedido />
        <chartPedidos />
        <tablasStock class="mt-2 mb-2" />
      </div>
      <div class="col-md-9">
        <historialPedido />
      </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import moment from "moment";

import historialPedido from "@/components/pedidos/historialPedido";
import chartPedidos from "@/components/pedidos/chartPedidos";
import tablasStock from "@/components/pedidos/tablaStock";
import headInfoPedido from "@/components/pedidos/headInfoPedido";

import {fechaConversion} from '../helper/fechaSql';
import {fetchToken} from '../helper/axios';

export default {
  components: {
    chartPedidos,
    tablasStock,
    headInfoPedido,
    historialPedido,
  },
  data:() =>({}),
  computed: {
		currentDateTime() {
      return moment().format("LL");
    }
	},
  methods: {
    ...mapActions("alumnos", ["uploadAlumnos"]),
    ...mapActions("pedidos", ["updatePedido"]),
    ...mapActions("libros", ["uploadDataLibros"]),
    ...mapActions("menu", ["updateMenu"]),
    ...mapActions("menu", ["updateTitulo"]),
    async loadPedidos() {
      const {data} = await fetchToken('pedidosRecientes');
			const { getPedido: ultimosPedidos } = data;
      const pedidosJson = ultimosPedidos.map((item) => ({
        nombreAlumno: `${item.nombre} ${item.apellido}`,
        ...item,
        fechaEntrega: fechaConversion(item.fechaEntrega),
      }));
      this.updatePedido(pedidosJson);
    },
    async loadAlumnos() {
      const { data } = await fetchToken('alumnos');
      const { alumnos } = data;
      this.uploadAlumnos(alumnos);
    },
    async loadLibros() {
      const { data } = await fetchToken('libros');
      const { libros } = data;
      this.uploadDataLibros(libros);
    },
  },
  mounted() {
    this.loadPedidos();
    this.loadAlumnos();
    this.loadLibros();

    this.updateTitulo("home");
    this.updateMenu([{urlTolbar:"index",nameToolbar:"Inicio"}]);
  },
};
</script>
