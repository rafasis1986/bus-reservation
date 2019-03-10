import Vue from 'vue';
import Router from 'vue-router';

import Section from '@/views/Section';
import ErrorMsg from '@/views/ErrorMsg';
import MyProfile from '@/views/start/MyProfile';

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/start', name: 'start', component: Section,
			meta: { title: 'Bus reservation start page', breadCrumb: 'Start' },
			children: [
				{
					path: 'my-profile', name: 'my-profile', component: MyProfile,
					meta: { title: 'My Profile', root: 'start', breadCrumb: 'My Profile' }
				}
			]
		},
		{ path: '/error', component: ErrorMsg },
		{ path: '*', redirect: '/start' }
	]
});

export default router;
