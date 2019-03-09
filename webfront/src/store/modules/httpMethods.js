import { axiosSgi } from '@/axios/instances';
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
	getSGI(context, { uriName, path, params }) {
		const URI = path ? BASE_URIS[uriName] + path : BASE_URIS[uriName];
		return new Promise((resolve, reject) => {
			axiosSgi.get(URI, {
				params: { ...params }
			})
			.then(res => {
				resolve(res);
			})
			.catch(res => {
				reject(res);
			});
		});
	},
	postSGI(context, { uriName, body }) {
		return new Promise((resolve, reject) => {
			axiosSgi.post(BASE_URIS[uriName], body)
			.then(res => {
				resolve(res);
			})
			.catch(res => {
				reject(res);
			});
		});
	},
	patchSGI(context, { uriName, body, path }) {
		const URI = path ? BASE_URIS[uriName] + path +'/' : BASE_URIS[uriName];
		return new Promise((resolve, reject) => {
			axiosSgi.patch(URI, body)
			.then(res => {
				resolve(res);
			})
			.catch(res => {
				reject(res);
			});
		});
	},
	configPostSGI(context, { uriName, body, config }) {
		return new Promise((resolve, reject) => {
			axiosSgi.post(BASE_URIS[uriName], body, config)
			.then(res => {
				resolve(res);
			})
			.catch(res => {
				reject(res);
			});
		});
	},
	configPatchSGI(context, { uriName, body, config, path }) {
		const URI = path ? BASE_URIS[uriName] + path +'/' : BASE_URIS[uriName];
		return new Promise((resolve, reject) => {
			axiosSgi.patch(URI, body, config)
			.then(res => {
				resolve(res);
			})
			.catch(res => {
				reject(res);
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