<template>
	<div class="col-12 loader-col-12">
		<BaseLoader :dotStyle="{'background-color': 'gray'}"/>
		<span class="h6">
			{{ text }}
		</span>
	</div>
</template>

<script>
	import BaseLoader from '@/components/loader/BaseLoader';

	export default {
		name: 'Loader',
		components: {
			BaseLoader
		},
		props: {
			text: {
				type: String,
				default: 'Cargando'
			}
		},
		data() {
			return {};
		},
		computed: {},
		methods: {}
	}
</script>

<style scoped lang="scss">
	.loader-col-12{
		margin-top: 20vh;

		.h6 {
			text-align: center;
			display: block;
		}

		.loader {
			display: block;
			margin: 3rem auto 1rem auto;
			width: fit-content;
		}
	}
</style>