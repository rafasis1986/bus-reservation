const state = {
	flow: [
		{name: 'Start', to: 'start'}
	]
};

const mutations = {
	setFlow(state, flowArray){
		state.flow.push(flowArray);
	},
	deleteSameFlow(state, actualRoute){
		const index = state.flow.findIndex((item) => {
			return item.to === actualRoute.to
			
		});
		state.flow.length = index + 1;
	}
};

const actions = {
	createBreadcrumb({commit}, routes){
		const tempObject = {};
		const item = routes.route[routes.length-1];
		tempObject.to = item.name;
		tempObject.name = item.meta.breadCrumb;
		if(routes.prop){
			tempObject.param = routes.prop;
		}
		
		commit('setFlow', tempObject);
		commit('deleteSameFlow', tempObject);
	},
	createManualBreadcrumb({commit}, routes){
		const tempObject = {};
		tempObject.to = routes.to;
		tempObject.name = routes.name;
		if(routes.prop){
			tempObject.param = routes.prop;
		}
		commit('setFlow', tempObject);
	
		commit('deleteSameFlow', tempObject);
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
