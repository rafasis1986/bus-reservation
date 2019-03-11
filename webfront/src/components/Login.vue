<template>
	<div class="container">
		<div class="col-12">
			<div class="card">
				<img class="card-img-top" src="@/assets/logo.png" alt="Card image cap">
				<div class="card-body">
					<form
						autocomplete="off" >
						<div class="form-group" >
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
							<div
								class="invalid-feedback"
								v-show="$v.rut.$error">
								{{ errorRutMessage }}</div>
						</div>
                        <div class="form-group" v-if="!isLogin">
							<label for="firstName">First name</label>
							<input
								class="form-control"
								:class="{'is-invalid': $v.first_name.$error}"
								:disabled="loading"
								type="text"
								id="first_name"
								placeholder="Type your first name"
								v-model="first_name"
								@input="resetInput('first_name')">
							<div
								class="invalid-feedback"
								v-show="$v.first_name.$error">
								{{ errorFirstNameMessage }}</div>
						</div>
                        <div class="form-group" v-if="!isLogin">
							<label for="firstName">Last name</label>
							<input
								class="form-control"
								:class="{'is-invalid': $v.last_name.$error}"
								:disabled="loading"
								type="text"
								id="last_name"
								placeholder="Type your last name"
								v-model="last_name"
								@input="resetInput('last_name')">
							<div
								class="invalid-feedback"
								v-show="$v.last_name.$error">
								{{ errorLastNameMessage }}</div>
						</div>
                        <div class="form-group" v-if="!isLogin">
							<label for="firstName">Email</label>
							<input
								class="form-control"
								:class="{'is-invalid': $v.newEmail.$error}"
								:disabled="loading"
								type="text"
								id="newEmail"
								placeholder="Insert your email"
								v-model="newEmail"
								@input="resetInput('newEmail')">
							<div
								class="invalid-feedback"
								v-show="$v.newEmail.$error">
								{{ errorEmailMessage }}</div>
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
							<div
								class="invalid-feedback"
								v-show="$v.password.$error">
								{{ errorPasswordMessage }}</div>
						</div>
                        <div class="form-group" v-if="!isLogin">
							<label for="password2">Confirm your password</label>
							<input
                                
								class="form-control"
								:class="{'is-invalid': $v.password2.$error}"
								:disabled="loading"
								type="password"
								id="password2"
								placeholder="Confirm your password"
								v-model="password2"
								@input="resetInput('password2')">
							<div
								class="invalid-feedback"
								v-show="$v.password2.$error">
								{{ errorPassword2Message }}</div>
						</div>
						<div
							class="alert alert-danger"
                            role="alert"
							v-if="authError && !$v.$invalid">
							{{ authErrorMessage }}
						</div>
                        <div
							class="alert alert-success"
                            role="alert"
							v-if="userCreated && isLogin">
							{{ signUpMessage }}
						</div>
                        <div class="btn-group">
                            <LoaderButton
                                v-if="isLogin"
                                class="btn btn-primary"
                                type="submit"
                                :loading="loading"
                                @click.prevent="initSesion">
                            </LoaderButton>
                            <LoaderButton
                                text="Save"
                                class="btn btn-primary"
                                type="submit"
                                :loading="loading"
                                v-if="!isLogin"
                                @click.prevent="saveUser">
                            </LoaderButton>
                            <button
                                v-if="isLogin"
                                class="btn btn-secondary"
                                @click.prevent="showSignUp">
                                Signup
                            </button>
                            <button
                                v-if="!isLogin"
                                class="btn btn-secondary"
                                @click.prevent="showLogin">
                                Login
                            </button>
                        </div>						
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
	import { required, minLength, email } from 'vuelidate/lib/validators';
    import { createNamespacedHelpers } from 'vuex';

	const { mapGetters, mapActions } = createNamespacedHelpers('user');

	export default {
		name: 'Login',
		data() {
			return {
				rut: '',
                password: '',
                password2: '',
                newEmail: '',
                first_name: '',
                last_name: '',
				loading: false,
				authError: false,
                authErrorMessage: '',
                isLogin: true,
                userCreated: false,
                signUpMessage: ''
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
					return HELP_MESSAGES.REQUIRED_VALUE('rut');
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
					return HELP_MESSAGES.REQUIRED_VALUE('password');
				}
				else {
					return HELP_MESSAGES.DEFAULT;
				}
            },
            errorPassword2Message() {
                if ( !this.isLogin ) {
                    if(!this.$v.password2.required) {
                        return HELP_MESSAGES.REQUIRED_VALUE('password');
                    }
                    else if ( this.$v.password2 != this.$v.password){
                        return HELP_MESSAGES.SAME_AS_PASS;
                    
                    }
                    else {
                        return HELP_MESSAGES.DEFAULT;
                    }
                }
            },
            errorEmailMessage() {
                if ( !this.isLogin ) {
                    if(!this.$v.newEmail.required) {
                        return HELP_MESSAGES.REQUIRED_VALUE('Email');
                    }
                    else {
                        return HELP_MESSAGES.DEFAULT;
                    }
                }
            },
            errorLastNameMessage() {
                if ( !this.isLogin ) {
                    if(!this.$v.last_name.required) {
                        return HELP_MESSAGES.REQUIRED_VALUE('last_name');
                    }
                    else {
                        return HELP_MESSAGES.DEFAULT;
                    }
                }
            },
            errorFirstNameMessage() {
                if ( !this.isLogin ) {
                    if(!this.$v.first_name.required) {
                        return HELP_MESSAGES.REQUIRED_VALUE('first_name');
                    }
                    else {
                        return HELP_MESSAGES.DEFAULT;
                    }
                }
            }
        },
        validations () {
            return this.isLogin 
                ? {
                    rut: { required, rutValidate },
                    password: {
                        required,
                        minLength: minLength(PASSWORD_MIN_LENGTH)
                    }
                }    
                : {
                    rut: { required, rutValidate },
                    password: {
                        required,
                        minLength: minLength(PASSWORD_MIN_LENGTH)
                    },
                    password2: {
                        required,
                        minLength: minLength(PASSWORD_MIN_LENGTH)
                    },
                    first_name: { required },
                    last_name: { required },
                    newEmail: { required, email }
                }
        },
		methods: {
			...mapActions(['login', 'signUp']),
			resetInput(input) {
				this.$v[input].$reset();
				this.authError = false;
			},
			initSesion() {
                this.$v.$touch();
				if(!this.$v.$error){
                    this.loading = true;
					this.login({
                        "data": {
                            "type": "login_views",
                            "attributes": {
                                "username": this.rut,
                                "password": this.password
                                }
                        }
                    })
					.then(() => {
                        this.userCreated = true;
                        this.isLogin = true;
					})
					.catch((err) => {
                        this.authError = true;
                        this.authErrorMessage = ERROR_MESSAGES.DEFAULT;
                        if (err.response && err.response.data){
                            this.authErrorMessage = err.response.data.errors['non_field_errors'][0];   
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                    })
				}
            },
            saveUser() {
                this.$v.$touch();
				if(!this.$v.$error){
                    this.loading = true;
					this.signUp({
                        "data": {
                            "type": "user",
                            "attributes": {
                                "username": this.rut,
                                "password": this.password,
                                "first_name": this.first_name,
                                "last_name": this.last_name,
                                "email": this.newEmail
                            }
                        }
                    })
					.then((res) => {
                        this.authError = false;
                        this.isLogin = true;
                        this.userCreated = true;
                        this.signUpMessage = 'The user ' + res.attributes.username +' has been successfully signup';
					})
					.catch((err) => {
                        this.authError = true;
                        this.authErrorMessage = ERROR_MESSAGES.DEFAULT;
                        if (err.response && err.response.data){
                            this.authErrorMessage = err.response.data.errors[0].detail;   
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                    })
				}
            },
            showSignUp() {
                this.isLogin = false;
            },
            showLogin() {
                this.isLogin = true;
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