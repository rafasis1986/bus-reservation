<template>
	<button
		:disabled="loading"
		:class="classes"
		@click="emitClick">
		<span v-if="!loading">{{ text }}</span>
		<BaseLoader v-if="loading" :dotStyle="{'background-color': '#fff'}"/>
	</button>
</template>

<script>
	import BaseLoader from '@/components/loader/BaseLoader';

	export default {
		name: 'LoaderButton',
		components: {
			BaseLoader
		},
		props: {
			text: {
				type: String,
				default: 'Accept'
			},
			loading: {
				type: Boolean,
				required: true
			},
			classes: {
				type: Object,
				default() {
					return {
						'btn': true,
						'btn-primary': true
					}
				}
			}
		},
		data() {
			return {};
		},
		computed: {},
		methods: {
			emitClick(e) {
				this.$emit('click', e);
			}
		}
	}
</script>

<style scoped lang="scss">
	.loader {
		margin-top: 5px;
	}
</style>