<template>
	<div style="border-right:2px solid #819FF7; height: 100%;">
		<ul class="nav flex-column">
			<li
				v-for="item of getSections"
				:key="item.name">
				<router-link
					active-class="active"
					:to="{name: item.name}">
					{{ item.title }}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex';
	const { mapGetters } = createNamespacedHelpers('menu');

	export default {
		name: 'Sidebar',
		data() {
			return {
				sectionName: ''
			}
		},
		computed: {
			...mapGetters(['getSections'])
		},
		methods: {
		}
	}
</script>

<style scoped lang="scss">
	.nav {

		li {
			margin-top: 1rem;
		}

		.active {
			font-weight: bold;
		}
	}
</style>