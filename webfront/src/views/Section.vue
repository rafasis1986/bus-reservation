<template>
	<div class="section">
		<router-view></router-view>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex';
	const { mapGetters } = createNamespacedHelpers('menu');

	const redirectIfRoot = (vm) => {
		if(!vm.$route.meta.root) {
			vm.$router.push({name: (vm.getSubsections(vm.$route.name)[0].name)})
		}
	}

	export default {
		name: 'Section',
		computed: {
			...mapGetters(['getSubsections'])
		},
		created() {
			redirectIfRoot(this);
		},
		beforeUpdate() {
			redirectIfRoot(this);
		}
	}
</script>

<style scoped lang="scss">
	.section {
		padding-top: 3rem;
	}
</style>