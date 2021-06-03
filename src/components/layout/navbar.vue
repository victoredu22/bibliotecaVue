<template>
	<section class="bg-light py-1">
		<div class="container-fluid bg-light">
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb bg-light">
					<li v-for="(menu, index) in this.jsonMenu" :key="index">
						<router-link
							v-if="menu.estado == true"
							:to="{ path: '/' + menu.name }"
						>
							{{ menu.name }}
							<span
								style="padding-right: 0.5rem;color: #6c757d;"
								>/</span
							>
						</router-link>
					</li>
				</ol>
			</nav>
		</div>
	</section>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
	data: () => ({}),
    computed: {
		...mapState("menu", ["jsonMenu"]),
	},
};
</script>
