import Api from '../api';
import {PSInstance} from '../pubsub';

function Collection(Model, name) {

    let collectionName = (' ' + name).slice(1);

    function load(params) {
        let that = this;
        return Api.get(Model.url, params)
            .then(function (result) {
                that.data = result;
                Object.freeze(that.data);
                that.publish('update');
                return that;
            });
    }

    let collection = function () {
        let c = Object.create(PSInstance());

        c.data = [];
        Object.freeze(c.data);

        c.load = load;

        return c;
    }

    Object.defineProperty(collection, 'url', {
        get: () => Model.url
    });

    Object.defineProperty(collection, 'name', {
        get: () => collectionName
    });

    return collection;
}

export default Collection;



