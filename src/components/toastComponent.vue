<template></template>
<script>
export default {
    data(){
        return{
        }
    },
    methods:{
        makeToast(array) {
			this.$bvToast.toast(array.msg, {
				title: array.title,
				variant: array.variant,
				solid: true
			}) 
		}
    }
}
</script>