import {psTransform} from '../pubsub';

const Auth = {};

psTransform('view.login.request', 'api.login.request');
psTransform('view.signup.request', 'api.signup.request');

export default Auth;
