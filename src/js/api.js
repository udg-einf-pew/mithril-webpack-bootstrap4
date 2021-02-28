import m from 'mithril';

const Api = {};

Api.post = (url, data) =>
    m.request({
            method: 'POST',
            url: url,
            body: data,
            background: true
        }
    );

Api.put = (url, data) =>
    m.request({
            method: 'PUT',
            url: url,
            body: data,
            background: true
        }
    );

Api.delete = (url) =>
    m.request({
            method: 'DELETE',
            url: url,
            background: true
        }
    );

Api.get = (url, params) =>
    m.request({
            method: 'GET',
            url: url,
            params,
            background: true
        }
    );

// Extra calls to non-REST API

Api.login = (data) => Api.post('/api/users/login', data);
Api.signup = (data) => Api.post('/api/users', data);
Api.checkActiveSession = () => Api.get('/api/users/self');


export default Api;
