import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user';
import menu from '@/store/modules/menu';
import table from '@/store/modules/table';
import error from '@/store/modules/error';
import httpMethods from '@/store/modules/httpMethods';

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		menu,
		table,
		error,
		httpMethods
	}
})
