import { httpClient } from '@/axios/instances';
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
            let config = { 
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json'
                }};
			httpClient.post(BASE_URIS.login, userData, config)
			.then(res => {
				sessionStorage.setItem('token', res.data.token);
				sessionStorage.setItem('permissions', []);
                dispatch('configUser', sessionStorage);
				resolve(res);
			})
			.catch(res => {
                console.log(res);
				reject(res);
			});
		});
	},
	configUser({ commit }, userData) {
		const { id, token, permissions} = userData;
		commit('setUser', { id, token, permissions: permissions.split(',') });
		httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	},
	logout({commit}) {
		commit('setUser', {});
		sessionStorage.clear();
		delete httpClient.defaults.headers.common['Authorization'];
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};