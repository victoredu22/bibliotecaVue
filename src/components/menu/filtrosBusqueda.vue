<template>
  <div>
    <b-card
      v-for="(menu, index) in listadoMenu"
      :key="index"
      no-body
      class="mb-1"
    >
      <hr />
      <b-card-header>
        <a
          block
          v-b-toggle
          :href="'#' + menu.toggle"
          @click.prevent
          @click="cambioEstado(index, menu.estado)"
        >
          <h5>
            <i class="fas fa-angle-right"></i>
            {{ menu.titulo }}
          </h5>
        </a>
      </b-card-header>
      <b-collapse :id="menu.toggle" :visible="menu.estado">
        <div v-if="menu.id == 0">
          <busquedaRut style="margin-left: 6%" />
        </div>
        <div v-if="menu.id == 1">
          <checkCursos style="margin-left: 6%" />
        </div>

        <div v-if="menu.id == 2">
          <datePickerCurso style="margin-left: 6%" />
        </div>
      </b-collapse>
    </b-card>
  </div>
</template>
<script>
import busquedaRut from "../alumnos/busquedaRut";
import checkCursos from "../cursos/checkCursos";
import datePickerCurso from "../cursos/datePickerCurso";

export default {
  components: {
    busquedaRut,
    checkCursos,
    datePickerCurso,
  },
  data: () => ({
    hola: false,
    listadoMenu: [
      {
        id: 0,
        estado: true,
        titulo: "Alumnos",
        toggle: "toggle-alumnos",
      },
      {
        id: 1,
        estado: true,
        titulo: "Cursos",
        toggle: "toggle-cursos",
      },
      {
        id: 2,
        estado: true,
        titulo: "Fecha",
        toggle: "toggle-fechaa",
      },
    ],
  }),
  methods: {
    cambioEstado(indice, estado) {
      const cambioEstado = estado ? false : true;
      this.listadoMenu = this.listadoMenu.map((list) =>
        list.id === indice ? { ...list, estado: cambioEstado } : { ...list }
      );
    },
  },
};
</script>
<style scoped>
.card {
  border: 0;
}
.card-header {
  background-color: transparent;
  border-bottom: transparent;
}
.card-body {
  padding: 0;
  margin-left: 10px;
}
</style>
