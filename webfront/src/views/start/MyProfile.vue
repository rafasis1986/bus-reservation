<template>
	<div class="my-profile row">

		<LoaderCol12
			v-if="loading"/>

		<template
			v-if="!loading">

			<div class="col-7">
				<dl class="row">
					<dt class="col-3">Name</dt>
					<dd class="col-9">{{ user.first_name }}</dd>

					<dt class="col-3">Last name</dt>
					<dd class="col-9">{{ user.last_name }}</dd>

					<dt class="col-3">Rut</dt>
					<dd class="col-9">{{ user.username | rutFormat }}</dd>

					<dt class="col-3">Email</dt>
					<dd class="col-9">{{ user.Email }}</dd>
				</dl>
			</div>
			
		</template>
	</div>
</template>

<script>	
	import ContainerActions from '@/components/ContainerActions';
	import httpErrorMixin from '@/mixins/httpErrorMixin';
	
	import Vuex from 'vuex';
    import { createNamespacedHelpers } from 'vuex';

	const { mapActions } = Vuex;
	const { mapState } = createNamespacedHelpers('user');


	export default {
		name: 'MyProfile',
		components: {
			ContainerActions
		},
		data() {
			return {
				formSuccess: false,
				loading: true,
				user: {}
			};
		},
		computed: {
			...mapState({
				storeUser: 'user'
			})
		},
		methods: {
			...mapActions({
				getAPI: 'httpMethods/getAPI'
			}),
			...mapActions({
				createBreadcrumb: 'breadcrumb/createBreadcrumb'
			}),
			loadData() {
				this.loading = true;
				this.getAPI({ uriName: 'users', path: this.storeUser.id })
				.then((res) => {
					this.user = res.data;
					this.loading = false;
				})
				.catch(this.handleHttpError);
			}
			
		},
		mixins: [ httpErrorMixin ],
		created() {
			this.loadData();
			const routes = {route: this.$route.matched,
							length: this.$route.matched.length};
			this.createBreadcrumb(routes);
		}
	}
</script>

<style scoped lang="scss">
</style>