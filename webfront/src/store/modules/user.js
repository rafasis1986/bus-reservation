import { axiosSgi } from '@/axios/instances';
import { BASE_URIS } from '@/axios/constants';

const state = {
	user: {}
};

const getters = {
	hasPermission: (state) => (checkPermission) => {
		if(state.user.permissions){
			for(const permission of state.user.permissions) {
				if(checkPermission === permission){
					return true;
				}
			}
		}
		return false;
	}
};

const mutations = {
	setUser(state, userData) {
		state.user = userData;
	}
};

const actions = {
	login({ dispatch }, userData) {
		return new Promise((resolve, reject) => {
			axiosSgi.post(BASE_URIS.login, userData)
			.then(res => {
				sessionStorage.setItem('id', res.data.user_id);
				sessionStorage.setItem('token', res.data.token);
				sessionStorage.setItem('permissions', res.data.user_permissions);
				dispatch('configUser', sessionStorage);
				resolve(res);
			})
			.catch(res => {
				reject(res);
			});
		});
	},
	configUser({ commit }, userData) {
		const { id, token, permissions} = userData;
		commit('setUser', { id, token, permissions: permissions.split(',') });
		axiosSgi.defaults.headers.common['Authorization'] = 'Token ' + token;
	},
	logout({commit}) {
		commit('setUser', {});
		sessionStorage.clear();
		delete axiosSgi.defaults.headers.common['Authorization'];
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};