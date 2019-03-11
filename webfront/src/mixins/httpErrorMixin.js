import { createNamespacedHelpers } from 'vuex';

const { mapActions: mapActionsError } = createNamespacedHelpers('error');

export default {
	methods: {
		...mapActionsError(['startError']),
		handleHttpException(res, func, exceptionStatuses = [409]) {
			if(res){
				if(res.response && exceptionStatuses.indexOf(res.response.status) > -1){
					func();
				} else {
					this.handleHttpError(res);
				}
			} else {
				this.handleHttpError();
			}
		},
		handleHttpError(res) {
			if(res && res.response && res.response.data) {
				this.startError(res.response.data.detail);
			} else {
				this.startError();
			}
			this.$router.push('/error');
		}
	}
};