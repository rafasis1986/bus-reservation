import axios from 'axios';

import {
	BASE_URL
} from '@/axios/constants';


export const httpClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		common: {},
		delete: {},
		get: {},
		head: {},
		patch: {},
		post: {},
		put: {}
	}
});

httpClient.defaults.headers.common['Content-Type'] = 'application/vnd.api+json';
