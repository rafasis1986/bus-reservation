<template>
	<div class="error-msg">
		<template
			v-if="typeof errorMessage === 'object'">
			<template
				v-for="(item, key) of errorMessage">
				<div
					class="alert alert-danger"
					v-for="(subItem, index) of item"
					:key="key + '-' + index">
					{{ subItem }}
				</div>
			</template>
		</template>
		<div
			class="alert alert-danger"
			v-if="typeof errorMessage === 'string'">
			{{ errorMessage }}
		</div>
		<button
			class="btn btn-primary"
			@click="$router.push('/inicio')">
			Go to home
		</button>
		<button
			class="btn"
			@click="$router.go(-1)">
			Back
		</button>
	</div>
</template>

<script>
	import jQuery from 'jquery';
	import { createNamespacedHelpers } from 'vuex';

	const $ = jQuery;
	const { mapState, mapActions } = createNamespacedHelpers('error');

	export default {
		name: 'ErrorMsg',
		computed: {
			...mapState(['error', 'errorMessage'])
		},
		methods: {
			...mapActions(['resetError'])
		},
		created() {
			if(!this.error) {
				this.$router.push('/inicio');
			} else if($('.modal').length > 0) {
				$('.modal').modal('hide');
			}
		},
		beforeDestroy() {
			this.resetError();
		}
	}
</script>

<style scoped lang="scss">
	.error-msg {
		padding: 2rem 2rem 0 0;

		.btn {
			float: right;
			margin-left: 0.5rem;
		}
	}
</style>