<template>
	<div>
		<Navbar/>
		<div>
		</div>
		<div class="container-fluid">
			<div class="row">
				<transition name="fade">
					<div v-show="getSidebar" class="col-2">
						<Sidebar/>
					</div>
				</transition>
				<div class="col-10">
				<BreadcrumbNav style="padding-top: 3em;"/>
					<router-view></router-view>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import BreadcrumbNav from '@/components/BreadcrumbNav'; 
	import Navbar from '@/components/Navbar';
	import Sidebar from '@/components/Sidebar';

	import { createNamespacedHelpers } from 'vuex';
	const { mapActions, mapGetters } = createNamespacedHelpers('menu');

	export default {
		name: 'MainApp',
		components: {
			BreadcrumbNav,
			Navbar,
			Sidebar
		},
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters(['getSidebar'])
		},
		methods: {
			...mapActions(['createMenu'])


		},
		created() {
			this.createMenu(this.$router.options.routes);
		}
	}
</script>

<style scoped lang="scss">
	.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>