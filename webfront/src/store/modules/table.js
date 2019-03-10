import { httpClient } from '@/axios/instances';
import { BASE_URIS } from '@/axios/constants';

const state = {
	list: undefined
};

const getters = {
};

const mutations = {
	setList(state, list) {
		state.list = list;
	}
};

const actions = {
	fetchList({ commit }, uriName) {
		httpClient.get(BASE_URIS[uriName])
			.then(res => {
				commit('setList', res.data)
			})
			.catch(res => {
				console.log(res.response);
			});
	},
	resetList({ commit }) {
		commit('setList', undefined);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};