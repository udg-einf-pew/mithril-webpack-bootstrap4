import 'bootstrap';
import m from 'mithril';
// This is imported only for initialization purposes
import Controllers from './controllers/controllers';
import PageNotFound from "./views/pages/PageNotFound";
import Auth from "./controllers/api/auth";
import {LocalStorage} from "./state";
import Home from './views/pages/home';
import Login from './views/pages/login';
import Signup from './views/pages/signup';


Auth.checkActiveSession()
    .then(function (user) {
        LocalStorage.setItem('user', user);
    })
    .catch(function (e) {
        LocalStorage.removeItem('user');
    })
    .finally(initRouting);

function initRouting() {
    m.route.prefix ='';
    m.route(document.getElementById('content'), '/',
        {
            '/': {
                onmatch: function () {
                    if (!LocalStorage.hasItem('user')) m.route.set('/login');
                    else return Home;
                }
            },
            '/login': {
                onmatch: function () {
                    if (LocalStorage.hasItem('user')) m.route.set('/');
                    else return Login;
                }
            },
            '/signup': {
                onmatch: function () {
                    if (LocalStorage.hasItem('user')) m.route.set('/');
                    else return Signup;
                }
            },
            '/:404...': PageNotFound
        }
    );
}



