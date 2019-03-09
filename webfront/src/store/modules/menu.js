const state = {
	sections: [],
	showSidebar: true
};

const getters = {
	getSections(state) {
		return state.sections;
	},
	getSidebar(state) {
		return state.showSidebar;
	},
	getSubsections: (state) => (sectionName) => {
		for(const section of state.sections){
			if(section.name === sectionName){
				return section.subsections;
			}
		}
		return [];
	}
};

const mutations = {
	setSections(state, newSections) {
		state.sections = newSections;
	},
	setShowSidebar(state, newShowSidebar) {
		state.showSidebar = newShowSidebar;
	}
};

const actions = {
	createMenu({ commit, rootGetters }, routes) {
		let tempSections = [];
		for(const item of routes){
			if(item.name){
				let tempSubsections = [];
				for(const child of item.children) {
					if(
						child.meta.title &&
						(!child.meta.permission ||
							rootGetters['user/hasPermission'](child.meta.permission))){
						tempSubsections.push({
							name: child.name,
							title: child.meta.title
						});
					}
				}
				if(tempSubsections.length > 0){
					tempSections.push({
						name: item.name,
						title: item.meta.title,
						subsections: tempSubsections
					});
				}
			}
		}
		commit('setSections', tempSections);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};