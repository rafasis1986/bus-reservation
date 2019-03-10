import Vuex from 'vuex';

const { mapActions } = Vuex;

export const loadData = (path, type) => {
    mapActions({
        getSGI: 'httpMethods/getAPI'
	});
    let items = [];
    this.getSGI.getAPI({ uriName: path })
    .then(res => {
        res.data.forEach( (user) => {
            if (user.type === type ){
                items.push(user.attributes);
            }
        })
    })
    .catch();
    return items;
};
