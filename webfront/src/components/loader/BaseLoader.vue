<template>
	<div class="loader">
		<div class="bounce1" :style="bounceStyle"></div>
		<div class="bounce2" :style="bounceStyle"></div>
		<div class="bounce3" :style="bounceStyle"></div>
	</div>
</template>

<script>
	export default {
		name: 'Loader',
		components: {},
		props: {
			dotStyle: {
				type: Object,
				required: false
			}
		}, 
		data() {
			return {};
		},
		computed: {
			bounceStyle() {
				return {
					margin: '2px',
					width: '12px',
					height: '12px',
					'background-color': '#000',
					...this.dotStyle
				}
			}
		},
		methods: {}
	}
</script>

<style scoped lang="scss">
	.loader {

		> div {
			border-radius: 100%;
			display: inline-block;
			-webkit-animation: sk-bouncedelay 1.1s infinite ease-in-out both;
			animation: sk-bouncedelay 1.1s infinite ease-in-out both;
		}

		.bounce1 {
			-webkit-animation-delay: -0.32s;
			animation-delay: -0.32s;
		}

		.bounce2 {
			-webkit-animation-delay: -0.16s;
			animation-delay: -0.16s;
		}
	}

	@-webkit-keyframes sk-bouncedelay {
		0%, 80%, 100% { -webkit-transform: scale(0) }
		40% { -webkit-transform: scale(1.0) }
	}

	@keyframes sk-bouncedelay {
		0%, 80%, 100% { 
			-webkit-transform: scale(0);
			transform: scale(0);
		} 40% { 
			-webkit-transform: scale(1.0);
			transform: scale(1.0);
		}
	}

</style>