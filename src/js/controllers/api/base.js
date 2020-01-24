import m from 'mithril';
import ps from 'pubsub-js';
import Auth from './auth';

const Api = {Auth};

Api.post = (url, data) =>
    m.request({
            method: 'POST',
            url: url,
            body: data,
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

export default Api;
