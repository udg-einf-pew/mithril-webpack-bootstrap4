import m from 'mithril';
import { ps } from '../../pubsub';
import { LocalStorage } from '../../state';
import Api from './base';

const Auth = {};

Auth.login = (data) => Api.post('/api/users/login', data);
Auth.signup = (data) => Api.post('/api/users', data);
Auth.checkActiveSession = () => Api.get('/api/users/self');

ps.subscribe('api.login.request', function (msg, data) {
    Auth.login({username: data.username, password: data.password})
        .then(ps.publish.bind(ps, 'api.login.successful'))
        .catch((e) => ps.publish('error.api.login', { data: e.response.error, show: true} ))
});

ps.subscribe('api.login.successful', function (msg, data) {
    LocalStorage.setItem('user', data.user);
    m.route.set('/');
});

// Signup

ps.subscribe('api.signup.request', function (msg, data) {
    Auth.signup(data)
        .then((data) => ps.publish('api.signup.successful', data))
        .catch(function(error) {
            ps.publish('error.api.signup', error)
        })
});

ps.subscribe('api.signup.successful', () => m.route.set('/login'));

export default Auth;
