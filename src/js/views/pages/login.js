import m from "mithril";
import UserLogin from "../components/user/login";
import Errors from "../components/errors";
import Header from '../components/header';

const Login = {
    view: () => m('div', [
        m(Header),
        m(UserLogin, {loginTopic: 'view.login.request'}),
        m(Errors, { errorTopic: 'error'})
    ])
};

export default Login;
