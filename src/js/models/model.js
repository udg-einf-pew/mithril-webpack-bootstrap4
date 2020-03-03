import Api from '../controllers/api/base';

const proto = {
    get: function(params) { return Api.get(this.url); },
    getById: function(id) { return Api.get(this.url + '/' + id); },
    create: function(data) { return Api.post(this.url, data); },
    delete: function(id) { return Api.delete(this.url + '/' + id); }
}

function Model(url, name) {
    let model = Object.create(proto);
    model.url = url;
    model.name = name;
    return model;
}

export default Model;
