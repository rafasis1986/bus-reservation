import Vue from 'vue'
import Vuex from 'vuex'

import menu from '@/store/modules/menu';
import table from '@/store/modules/table';
import error from '@/store/modules/error';
import httpMethods from '@/store/modules/httpMethods';

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		menu,
		table,
		error,
		httpMethods
	}
})
