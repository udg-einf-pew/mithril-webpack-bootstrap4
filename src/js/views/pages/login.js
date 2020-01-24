import m from "mithril";
import UserLogin from "../components/user/login";
import Errors from "../components/errors";

const Login = {
    view: () => m('div', [
        m(UserLogin, {loginTopic: 'view.login.request'}),
        m(Errors, { errorTopic: 'error'})
    ])
};

export default Login;
