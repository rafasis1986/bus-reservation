<template>
	<div class="users">

		<Loader
			v-if="loading"/>

		<template
			v-if="!loading">
            <b-table
                :items="items">
            
            </b-table>
		</template>

	</div>
    
</template>

<script>
	import httpErrorMixin from '@/mixins/httpErrorMixin';
	import Loader from '@/components/loader/Loader';

	import Vuex from 'vuex';
	
	const { mapActions } = Vuex;

	export default {
		name: 'Users',
		components: {
			Loader
		},
		props: {},
		data() {
			return {
				formSuccess: false,
				loading: true,
				search: {
					value: '',
					isActive: undefined,
					roles: []
				},
				items: []
			};
		},
		computed: {
			
		},
		methods: {
			...mapActions({
				getSGI: 'httpMethods/getAPI'
			}),
			...mapActions({
				createBreadcrumb: 'breadcrumb/createBreadcrumb'
			}),
			loadData() {
				this.loading = true;
				this.getSGI({ uriName: 'users' })
				.then(res => {
                    res.data.forEach( (user) => {
                        if (user.type === 'user' ){
                            this.items.push(user.attributes);
                        }
                    })
				})
                .catch(this.handleHttpError)
                .finally( () => { this.loading = false });
			},
			
		},
		mixins: [ httpErrorMixin ],
		created() {
			this.loadData();
			this.createBreadcrumb({route: this.$route.matched,
							length: this.$route.matched.length});
		}
    }
  
</script>

<style scoped lang="scss">
	.users {
		.actions {
			margin-bottom: 1rem;
			padding: 0 15px;
		}
	}
</style>