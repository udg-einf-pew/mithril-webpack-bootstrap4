import Api from '../controllers/api/base';

function Model(url, name) {
    return {
        name: name,
        get: (params) => Api.get(url),
        getById: (id) => Api.get(url + '/' + id),
        create: (data) => Api.post(url, data),
        delete: (id) => Api.delete(url + '/' + id),
    }
}

export default Model;
