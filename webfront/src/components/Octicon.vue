<template>
	<span
		class="octicon"
		v-html="octicons[icon].toSVG(octiconOptions)"
		@click="handleClick"></span>
</template>

<script>
	import octicons from 'octicons';

	export default {
		name: 'Octicon',
		props: {
			icon: {
				type: String,
				required: true
			},
			width: {
				type: Number,
				default: undefined
			},
			height: {
				type: Number,
				default: undefined
			}
		},
		data() {
			return {
				octicons
			};
		},
		computed: {
			octiconOptions() {
				let tempObj = {};
				if(this.width) {tempObj.width = this.width}
				if(this.height) {tempObj.height = this.height}
				return tempObj;
			}
		},
		methods: {
			handleClick() {
				this.$emit('click');
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'octicons/index.scss';
	.octicon {
		vertical-align: inherit;
	}
</style>