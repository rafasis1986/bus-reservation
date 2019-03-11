<template>
		<ol class="breadcrumb" 
			style="background-color: white;">
			<li class="breadcrumb-item"
				v-for="(item, index) of flow"
				:key="index">
				<router-link
					:active-class="index === flow.length-1 ? 
						'breadcrumb-active' : ''"
					:style="index < flow.length-1 ? 
						'color: gray' : ''"
					:to="item.param ? {name: item.to, params: {id: item.param}} : {name: item.to}">
					{{ item.name }}
				</router-link>
			</li>
		</ol>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex';
	
	const { mapState } = createNamespacedHelpers('breadcrumb');

	export default {
		name: 'BreadcrumbNav',
		data() {
			return {
			}
		},
		computed: {
			...mapState(['flow'])
		}
	}
</script>

<style>
	.breadcrumb-active {
		pointer-events: none;
		cursor: default;
		text-decoration: none;
		color: #0080FF;
	}
</style>