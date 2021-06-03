<template>
	<div id="sidebar-container" class="bg-primary">
		<div class="logo">
			<h3 class="text-light font-weight-bold">Aministrador Biblioteca</h3>
		</div>
		<div class="menu" v-for="item in jsonMenu" :key="item.id">
			<router-link
				:to="item.name"
				v-bind:style="[$route.name === item.name && {backgroundColor: '#5767EE'}]"
				class="d-block p-3 text-light"
				id="liMenu"
			>
				<i :class="item.className"></i> {{ item.name }}
			</router-link>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";

export default {
	data: () => ({}),
	computed: {
		...mapState("menu", ["jsonMenu"]),
	},
};
</script>
<style scoped>
  .bg-primary{
    background-color: var(--primary) !important;
  }
  #sidebar-container{
     /*  min-height: 100vh; */
    width: 288px;
    position: fixed;
    /* position: fixed; */
  }
  #sidebar-container .logo{
    padding: .875rem 1.25rem;
  }
  #sidebar-container .menu{
    width: 18rem;
  }
a:link, a:visited, a:active {
    text-decoration:none;
  } 
  a#liMenu:hover {
    background-color:#5767EE;
  }
</style>