import Vue from 'vue';

import {
	numberFormat,
	rutFormat
} from '@/snippets/string';

Vue.filter('numberFormat', numberFormat);

Vue.filter('rutFormat', rutFormat);
