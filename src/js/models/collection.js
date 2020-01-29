import {ps, PSInstance} from "../pubsub";

export default function Collection(Model) {

    return function() {
        let c = PSInstance();

        c.data = [];

        c.get = function () {
            return Model.get()
                .then(function (collection) {
                    c.data = collection;
                    c.publish('update');
                    return collection;
                })
        };

        return c;
    }

}
