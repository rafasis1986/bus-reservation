import Vue from 'vue';
import Router from 'vue-router';

import Section from '@/views/Section';
import ErrorMsg from '@/views/ErrorMsg';
import MyProfile from '@/views/start/MyProfile';
import Users from '@/views/lists/Users';
import Cities from '@/views/lists/Cities';
import Buses from '@/views/lists/Buses';
import Itineraries from '@/views/lists/Itineraries';
import Tickets from '@/views/lists/Tickets';


Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/start', name: 'start', component: Section,
			meta: { title: 'Main page', breadCrumb: 'Start' },
			children: [
				{
					path: 'my-profile', name: 'my-profile', component: MyProfile,
					meta: { title: 'My Profile', root: 'start', breadCrumb: 'My Profile' }
				}
			]
        },
        {
			path: '/users', name: 'users', component: Section,
            meta: { title: 'Users', breadCrumb: 'Users' },
            children: [
				{
					path: 'users', name: 'subUsers', component: Users,
					meta: { title: 'Users', root: 'users', breadCrumb: 'Users' }
				}
			]
        },
        {
			path: '/cities', name: 'cities', component: Section,
            meta: { title: 'Cities', breadCrumb: 'Cities' },
            children: [
				{
					path: 'cities', name: 'subCities', component: Cities,
					meta: { title: 'Cities', root: 'cities', breadCrumb: 'Cities' }
				}
			]
        },
        {
			path: '/buses', name: 'buses', component: Section,
            meta: { title: 'Buses', breadCrumb: 'Buses' },
            children: [
				{
					path: 'buses', name: 'subBuses', component: Buses,
					meta: { title: 'Buses', root: 'buses', breadCrumb: 'Buses' }
				}
			]
        },
        {
			path: '/itineraries', name: 'itineraries', component: Section,
            meta: { title: 'Itineraries', breadCrumb: 'Itineraries' },
            children: [
				{
					path: 'itineraries', name: 'subItineraries', component: Itineraries,
					meta: { title: 'Itineraries', root: 'itineraries', breadCrumb: 'Itineraries' }
				}
			]
        },
        {
			path: '/tickets', name: 'tickets', component: Section,
            meta: { title: 'Tickets', breadCrumb: 'Tickets' },
            children: [
				{
					path: 'tickets', name: 'subTickets', component: Tickets,
					meta: { title: 'Tickets', root: 'tickets', breadCrumb: 'Tickets' }
				}
			]
        },
		{ path: '/error', component: ErrorMsg },
		{ path: '*', redirect: '/start' }
	]
});

export default router;
