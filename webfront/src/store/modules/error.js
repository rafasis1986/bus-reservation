	import { ERROR_MESSAGES } from '@/snippets/constants';

const state = {
	error: false,
	errorMessage: ERROR_MESSAGES.DEFAULT
};

const mutations = {
	setError(state, value) {
		state.error = value;
	},
	setErrorMessage(state, value) {
		state.errorMessage = value;
	}
};

const actions = {
	startError({ commit }, message) {
		commit('setError', true);
		if(message) {
			commit('setErrorMessage', message);
		}
	},
	resetError({ commit }) {
		commit('setError', false);
		commit('setErrorMessage', ERROR_MESSAGES.DEFAULT);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};