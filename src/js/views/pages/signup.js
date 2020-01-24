import m from "mithril";
import UserSignup from "../components/user/signup";
import Errors from "../components/errors";

const Signup = {
    view: () => m('div', [
        m(UserSignup, {signupTopic: 'view.signup.request'}),
        m(Errors, { errorTopic: 'error'})
    ])
};

export default Signup;
