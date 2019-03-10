<template>
	<div class="container-actions row justify-content-end">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'ContainerActions',
	}
</script>

<style scoped lang="scss">
	.container-actions {
		margin-bottom: 3rem;
		padding: 0 15px;

		.btn {
			margin-left: 0.5rem;
		}
	}
</style>