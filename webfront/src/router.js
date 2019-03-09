import Vue from 'vue';
import Router from 'vue-router';

import Section from '@/views/Section';

import ErrorMsg from '@/views/ErrorMsg';

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/start', name: 'start', component: Section,
			meta: { title: 'Bus reservation start page', breadCrumb: 'Start' },
		
		},
		{ path: '/error', component: ErrorMsg },
		{ path: '*', redirect: '/inicio' }
	]
});

export default router;
