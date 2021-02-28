import m from 'mithril';
import Header from '../components/header';
import Errors from '../components/errors';
import OrderListView from '../components/order/orderList';
import { LocalState } from '../../state';
import {ps} from '../../pubsub';

const Home = {};

Home.oninit = () => LocalState.orders.load().catch(function(e) {
    ps.publish('error.' + LocalState.orders.id, {
        show: true,
        data: new Error('Could not load order list')
    });
});

Home.view = function () {
    return m('div', [
        m(Header),
        m(OrderListView, { orders: LocalState.orders}),
        m(Errors, { errorTopic: 'error'})
    ]);
};

export default Home;
