const state = {
	flow: [
		{name: 'Start', to: 'start'}
	]
};

const subLinks = ['subUsers'];

const mutations = {
	setFlow(state, flowArray){
		state.flow.push(flowArray);
	},
	deleteSameFlow(state, actualRoute){
		const index = state.flow.findIndex((item) => {
			return item.to === actualRoute.to
			
		});
		state.flow.length = index + 1;
    },
    modifyFlow(state, actualRoute){
		const index = subLinks.indexOf(actualRoute.to);

		if(index !== -1){
			for(const itemA of subLinks){
				for(const itemB of state.flow){
					if(itemA === itemB.to){
						state.flow.length = 1;
						switch(actualRoute.to){
							case 'subUsers':
								state.flow.push({name: 'Users', to: 'subUsers'})
								break;							
						}

					}
				}
			}
        }
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
        commit('modifyFlow', tempObject);
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
		commit('modifyFlow', tempObject);
		commit('deleteSameFlow', tempObject);
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
