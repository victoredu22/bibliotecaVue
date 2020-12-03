<template>
  <h5>
    
  </h5>
</template>
<script>
export default {
  setup(){
    const state = reactive({
			form: {
				nombreLibro: "",
				cantidad: "",
				autor: "",
				destino: "",
				idCurso: "",
			},
		});
    return {state}
  }
};
</script>