<template>
    <index />
</template>
<script>
import { mapActions, mapState } from "vuex";
import index from '@/components/arriendoLibros/index'
export default {
  components:{
    index
  },
	data() {
		return {
			
		};
	},
  methods:{
    ...mapActions("libros", ["updateLibro"]),
    async cargaTabla() {
			const {data} = await this.axios.get("api/libros");
      const {libros}= data;

      this.updateLibro(libros);

      /* this.axios.get("api/libros").then((res) => {
				this.updateLibro(res.data.libros);
			}); */
		},
  },
  created(){
    this.cargaTabla();
    console.log(this.$route.name);
  }
};
</script>
