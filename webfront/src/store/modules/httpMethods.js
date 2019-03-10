import { httpClient } from '@/axios/instances';
import { BASE_URIS } from '@/axios/constants';

const state = {
	data: undefined
};

const mutations = {
	setData(state, data) {
		state.data = data;
	}
};

const actions = {
	getAPI(context, { uriName, path, params }) {
        const URI = path ? BASE_URIS[uriName] + path : BASE_URIS[uriName];
		return new Promise((resolve, reject) => {
			httpClient.get(URI, {
				params: { ...params }
			})
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			});
		});
	},
	postAPI(context, { uriName, body }) {
		return new Promise((resolve, reject) => {
			httpClient.post(BASE_URIS[uriName], body)
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			});
		});
	},
	patchAPI(context, { uriName, body, path }) {
		const URI = path ? BASE_URIS[uriName] + path +'/' : BASE_URIS[uriName];
		return new Promise((resolve, reject) => {
			httpClient.patch(URI, body)
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			});
		});
	},
	configPostAPI(context, { uriName, body, config }) {
		return new Promise((resolve, reject) => {
			httpClient.post(BASE_URIS[uriName], body, config)
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			});
		});
	},
	configPatchAPI(context, { uriName, body, config, path }) {
		const URI = path ? BASE_URIS[uriName] + path +'/' : BASE_URIS[uriName];
		return new Promise((resolve, reject) => {
			httpClient.patch(URI, body, config)
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			});
		});
	},
	resetData({ commit }) {
		commit('setData', undefined);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};