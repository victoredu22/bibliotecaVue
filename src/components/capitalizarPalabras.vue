<template>
  
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    capitalize(val) {
			if (val) {
				return val
					.toLowerCase()
					.trim()
					.split(" ")
					.map((v) => v[0].toUpperCase() + v.substr(1))
					.join(" ");
			}
		},
  }
}
</script>