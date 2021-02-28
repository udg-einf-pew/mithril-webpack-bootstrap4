import m from 'mithril';
import {ps, psTransform} from '../pubsub';
import {LocalStorage} from '../state';
import Api from '../api';


ps.subscribe('api.login.request', function (msg, data) {
    Api.login({username: data.username, password: data.password})
        .then(ps.publish.bind(ps, 'api.login.successful'))
        .catch((e) => ps.publish('error.api.login', {
            data: new Error(e.response ? e.response.error.message : "Error connecting to server"),
            show: true
        }))
});

ps.subscribe('api.login.successful', function (msg, data) {
    LocalStorage.setItem('user', data);
    m.route.set('/');
});

// Signup

ps.subscribe('api.signup.request', function (msg, data) {
    Api.signup(data)
        .then((data) => ps.publish('api.signup.successful', data))
        .catch(function (error) {
            ps.publish('error.api.signup', error)
        })
});

ps.subscribe('api.signup.successful', () => m.route.set('/login'));

psTransform('view.login.request', 'api.login.request');
psTransform('view.signup.request', 'api.signup.request');
