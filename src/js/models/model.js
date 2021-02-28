import Api from '../api';
import {PSInstance} from '../pubsub';


function Model(url, name) {

    let modelURL = (' ' + url).slice(1);
    let modelName = (' ' + name).slice(1);

    function load(id) {
        let that = this;
        return Api.get(modelURL + '/' + id)
            .then(function (result) {
                that.data = result;
                Object.freeze(that.data);
                that.publish('update');
                return that;
            });
    }

    function save() {
        let that = this;
        if (that.data.id)
            return Api.put(modelURL + '/' + this.data.id, this.data)
                .then(function (result) {
                    that.data = result;
                    Object.freeze(that.data);
                    that.publish('save');
                    return that;
                });
        else
            return Api.post(modelURL, this.data)
                .then(function (result) {
                    that.data = result;
                    Object.freeze(that.data);
                    that.publish('create');
                    return that;
                });
    }

    function remove() {
        let that = this;
        if (this.data.id)
            return Api.delete(modelURL + '/' + this.data.id)
                .then(function (result) {
                    that.publish('remove');
                    return null;
                });
    }

    function update(data) {
        this.data = {...this.data, ...data};
        Object.freeze(this.data);
        this.publish('update');
    }

    let model = function (data) {
        let c = Object.create(PSInstance());

        c.data = data || {};
        Object.freeze(c.data);

        c.load = load;
        c.save = save;
        c.remove = remove;
        c.update = update;

        return c;
    }

    Object.defineProperty(model, 'url', {
        get: () => modelURL
    });

    Object.defineProperty(model, 'name', {
        get: () => modelName
    });

    return model;
}

export default Model;
