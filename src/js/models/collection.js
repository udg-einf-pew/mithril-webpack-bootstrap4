import {ps} from "../pubsub";

let id = 0;

export default function Collection(Model) {

    return function() {
        let c = {};

        c.id = Model.name + '_collection_' + id++;

        c.data = [];

        c.get = function () {
            return Model.get()
                .then(function (collection) {
                    c.data = collection;
                    ps.publish(c.id + '.' + 'update');
                    return collection;
                })
                .catch((e) => ps.publish('error.' + c.id))
        };

        c.subscribe = (event, f) => ps.subscribe(c.id + '.' + event, f);

        return c;
    }

}
