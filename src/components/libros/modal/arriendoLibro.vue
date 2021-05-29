<template>
  <b-modal id="modal-arriendo" @show="resetModal" @ok="handleEnvio">
    <template v-slot:modal-title>
      <span>Asignar libro a estudiante</span>
    </template>
    <div class="media">
      <div dir="ltr" class="ml-2">
        <div>
          <i
            class="fas fa-book"
            style="font-size: 70px; color: #14b3e2a6; margin-top: 10%"
          ></i>
        </div>
      </div>
      <div class="media-body" style="margin-left: 20px">
        <h4>{{ activeLibro.nombreLibro }}</h4>
        <li style="list-style: none">
          Autor :
          <span style="color: #045e04; font-weight: 700">
            {{ activeLibro.autor }}
          </span>
        </li>
        <li style="list-style: none">
          Disponibilidad :
          <span style="color: #045e04">
            {{ activeLibro.cantidad }}
          </span>
        </li>
      </div>
    </div>

    <b-form-group label="Ingresa el rut del alumno." style="margin-top: 20px">
      <v-select
        placeholder="Haz click para seleccionar alumno..."
        :options="dataAlumnos"
        label="dataAlumno"
        v-model="selectedAlumno"
        @input="seleccionAlumno(selectedAlumno)"
      >
        <template slot="options" slot-scope="options">
          {{ options.dataAlumno }}
        </template>
      </v-select>

      <span v-if="error.idAlumno" style="color: red">
        Este {{ error.idAlumno[0] }}
      </span>

      <br />

      <div
        v-if="infoAlumno.idAlumno"
        style="
          background-color: #eeeeee;
          border-radius: 0.25rem;
          padding: 0.75rem 1.25rem;
        "
      >
        <p>
          Este alumno cuenta con
          <strong>{{ cantidadLibros }}</strong> pedidos pendientes.
        </p>
        <p>
          #{{ infoAlumno.idAlumno }} - {{ infoAlumno.nombre }}
          {{ infoAlumno.apellido }}
          {{ infoAlumno.numeroDocumento }}
        </p>
      </div>
    </b-form-group>
    <b-form-group label="Fecha Entrega" style="margin-top: 20px">
      <b-calendar
        v-model="fechaEntrega"
        @context="onContext"
        locale="es"
        @input="error['fechaEntrega'] = false"
        block
      >
      </b-calendar>
      <span v-if="error.fechaEntrega" style="color: red">
        Este {{ error.fechaEntrega[0] }}
      </span>
    </b-form-group>
    <b-form-group label="Ingresa el estado actual del libro">
      <b-form-textarea
        id="textarea"
        v-model="estadoRetiro"
        placeholder="Enter something..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
    </b-form-group>

    <template v-slot:modal-footer="{ ok }">
      <!-- Emulate built in modal footer ok and cancel button actions -->

      <b-button v-if="!loadAsignar" block variant="primary" @click="ok()">
        Asignar Libro Estudiante
      </b-button>
      <b-button v-else block variant="primary">
        <b-spinner small type="grow"></b-spinner>
        Cargando...
      </b-button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions, mapState } from "vuex";

import { makeToast } from "@/helper/makeToast";
import { fetchToken } from "@/helper/axios";

export default {
  data() {
    return {
      selectedAlumno: "",
      infoAlumno: [],
      estadoRetiro: "El libro se encuentra en perfectas condiciones.",
      fechaEntrega: "",
      error: {
        rutAlumno: "",
        fechaEntrega: "",
      },
      loadAsignar: false,
      cantidadLibros: "",
    };
  },
  computed: {
    ...mapState("libros", ["jsonLibros"]),
    ...mapState("libros", ["activeLibro"]),
    ...mapState("alumnos", ["dataAlumnos"]),
  },
  methods: {
    ...mapActions("libros", ["reduceStockLibro"]),

    async seleccionAlumno({ idAlumno }) {
      this.error.idAlumno = false;

      //Muestra Info Alumno
      this.infoAlumno = this.dataAlumnos.find(
        (elem) => elem.idAlumno === idAlumno
      );
      const { data } = await fetchToken(`infoPedidoAlumno/${idAlumno}`);
      this.cantidadLibros = data.totalPedido;
    },
    onContext(ctx) {
      this.context = ctx;
    },
    handleEnvio(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      this.loadAsignar = true;
      this.formLibro();
    },
    async formLibro() {
      const form = {
        idLibro: this.activeLibro.idLibro,
        idAlumno: this.infoAlumno.idAlumno,
        fechaEntrega: this.fechaEntrega,
        estadoRetiro: this.estadoRetiro,
      };

      this.loadAsignar = true;
      const { data } = await fetchToken("create-pedido", form, "POST");

      const { errores, msg, ok, pedido } = data;
      this.error = errores ? errores : { ...this.error };
      this.loadAsignar = false;


      if (!ok) {
        const msgToast =
          msg === "libroEncontrado"
            ? "El alumno ya tiene asignado el libro."
            : msg === "libroSinStock"
            ? "Este libro se encuentra sin stock no podemos realizar la entrega."
            : "Debes completar los campos vacios";

        makeToast({
          msg: msgToast,
          title: "Atención",
          variant: "danger",
          solid: true,
        });
      }

      if (ok) {
        makeToast({
          msg: `El n° pedido es el ${pedido.idPedido}`,
          title: "Exito",
          variant: "primary",
          solid: true,
        });

        this.reduceStockLibro(pedido.idPedido);
      }
    },
    resetModal() {
      this.fechaEntrega = "";
      this.error = [];
    },
  },
};
</script>
<style scoped>
.disabled {
  background-color: #d6d6d6;
}
</style>
