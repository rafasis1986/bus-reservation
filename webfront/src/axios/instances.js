import axios from 'axios';

import {
	API_BASE_URL
} from '@/axios/constants';


export const axiosSgi = axios.create({
	baseURL: API_BASE_URL,
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

axiosSgi.defaults.headers.post['Content-Type'] = 'application/json';

