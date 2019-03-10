import Vue from 'vue';
import App from './App.vue';

import 'bootstrap';
import Vuelidate from 'vuelidate';
import BTable from 'bootstrap-vue/es/components/table/table';
import VueFormWizard from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';

import router from './router';
import store from './store/index';
import './filters';

Vue.use(Vuelidate);
Vue.use(VueFormWizard);
Vue.component('b-table', BTable)

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
