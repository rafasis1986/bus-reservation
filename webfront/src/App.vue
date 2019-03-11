<template>
	<div id="app">
		<template v-if="!user.token">
			<Login/>
		</template>
		<template v-else>
			<MainApp/>
		</template>
	</div>
</template>

<script>
	import Login from '@/components/Login';
	import MainApp from '@/components/MainApp';

	import { createNamespacedHelpers } from 'vuex';
	const { mapState, mapActions } = createNamespacedHelpers('user');

	export default {
		name: 'App',
		components: {
			Login,
			MainApp
		},
		computed: {
			...mapState(['user'])
		},
		methods: {
			...mapActions(['configUser'])
		},
		created() {
			if(sessionStorage.token){
				this.configUser(sessionStorage);
			}
		}
	}
</script>

<style lang="scss">
	@import 'scss/custom.scss';
	@import 'bootstrap/scss/bootstrap.scss';
</style>