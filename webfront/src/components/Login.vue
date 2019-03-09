<template>
	<div class="container">
		<div class="col-12">
			<div class="card">
				<img class="card-img-top" src="@/assets/logo.png" alt="Card image cap">
				<div class="card-body">
					<form
						autocomplete="off">
						<div class="form-group">
							<label for="userRut">Rut</label>
							<input
								class="form-control"
								:class="{'is-invalid': $v.rut.$error}"
								:disabled="loading"
								type="text"
								id="userRut"
								placeholder="Type your Rut"
								v-model="formatedRut"
								@input="resetInput('rut')">
							<small
								class="form-text text-muted"
								v-show="!$v.rut.$error">
								Type your Rut</small>
							<div
								class="invalid-feedback"
								v-show="$v.rut.$error">
								{{ errorRutMessage }}</div>
						</div>
						<div class="form-group">
							<label for="password">Password</label>
							<input
								class="form-control"
								:class="{'is-invalid': $v.password.$error}"
								:disabled="loading"
								type="password"
								id="password"
								placeholder="Type your passord"
								v-model="password"
								@input="resetInput('password')">
							<small
								class="form-text text-muted"
								v-show="!$v.password.$error">
								Type your password</small>
							<div
								class="invalid-feedback"
								v-show="$v.password.$error">
								{{ errorPasswordMessage }}</div>
						</div>
						<div
							class="alert alert-danger"
							v-if="authError && !$v.$invalid">
							{{ authErrorMessage }}
						</div>
						<LoaderButton
							class="btn btn-primary"
							type="submit"
							:loading="loading"
							@click.prevent="initSesion">
							Login
						</LoaderButton>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LoaderButton from '@/components/loader/LoaderButton';
	import { ERROR_MESSAGES, HELP_MESSAGES, PASSWORD_MIN_LENGTH } from '@/snippets/constants';

	import {
		rutClean,
		rutFormat,
		rutValidate,
		zerosLeftRemove
	} from '@/snippets/string';
	import { required, minLength } from 'vuelidate/lib/validators';
	import { createNamespacedHelpers } from 'vuex';

	const { mapGetters, mapActions } = createNamespacedHelpers('user');

	export default {
		name: 'Login',
		data() {
			return {
				rut: '',
				password: '',
				loading: false,
				authError: false,
				authErrorMessage: ''
			};
		},
		components: {
			LoaderButton
		},
		computed: {
			...mapGetters(['hasPermission']),
			userData() {
				return {
					rut: this.rut,
					password: this.password
				};
			},

			formatedRut: {
				get() {
					return rutFormat(this.rut);
				},
				set(val) {
					this.rut = this.rut === '' ? 'a' : '';
					this.rut = zerosLeftRemove(rutClean(val));
				}
			},
			errorRutMessage() {
				if(!this.$v.rut.required) {
					return HELP_MESSAGES.VALUE_REQUIRED('rut');
				}
				else if(!this.$v.rut.rutValidate) {
					return HELP_MESSAGES.INVALID_RUT;
				}
				else {
					return HELP_MESSAGES.DEFAULT;
				}
			},
			errorPasswordMessage() {
				if(!this.$v.password.required) {
					return HELP_MESSAGES.VALUE_REQUIRED('password');
				}
				else {
					return HELP_MESSAGES.DEFAULT;
				}
			}
		},
		methods: {
			...mapActions(['login']),
			resetInput(input) {
				this.$v[input].$reset();
				this.authError = false;
			},
			initSesion() {
				this.$v.$touch();
				if(!this.$v.$error){
					this.loading = true;
					this.login({
						rut: this.rut,
						password: this.password
					})
					.then(() => {
						this.loading = false;
					})
					.catch((res) => {
						this.loading = false;
						this.authError = true;
						this.authErrorMessage = res.response ? res.response.data.detail : ERROR_MESSAGES.DEFAULT;
					});
				}
			}
		},
		validations: {
			rut: {
				required,
				rutValidate
			},
			password: {
				required,
				minLength: minLength(PASSWORD_MIN_LENGTH)
			}
		},
		beforeDestroy() {
			if(this.$route.meta.permission){
				if(!this.hasPermission(this.$route.meta.permission)){
					this.$router.push('/start');
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		padding-top: 15vh;
		padding-bottom: 15vh;

		.card {
			width: 25rem;
			margin: 0 auto;

			img {
				padding: 2rem;
			}

			.btn {
				float: right;
			}
		}
	}
</style>