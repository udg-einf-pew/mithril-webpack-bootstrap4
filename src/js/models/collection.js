import {ps, PSInstance} from "../pubsub";

export default function Collection(Model) {

    return function() {
        let c = PSInstance();

        c.data = [];

        c.get = function (params) {
            return Model.get(params)
                .then(function (collection) {
                    c.data = collection;
                    c.publish('update');
                    return collection;
                })
        };

        c.getByIds = function (ids) {
            return Model.get({id: ids})
                .then(function (collection) {
                    c.data = collection;
                    c.publish('update');
                    return collection;
                })
        };


        return c;
    }

}
