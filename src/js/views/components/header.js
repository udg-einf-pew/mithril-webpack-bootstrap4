import m from 'mithril';
import { ps } from '../../pubsub';
import { LocalStorage} from '../../state';

const Header = {
    oninit: function (vnode) {
        ps.subscribe('localstorage.set.user', (user) => {
            m.redraw();
        });

    },

    logout: function () {
        ps.publish('view.logout.request');
    },

    view: function () {
        let ordersButton = null;
        let  rightButtons = null;
        const userData = LocalStorage.getItem('user');
        if (userData && userData.username) {
            ordersButton =
                m("li[classname='nav-item']",
                    m(m.route.Link, { class: 'nav-link', href: '/orders'},
                        "Orders"
                    )
                );
            rightButtons =
                m("ul.navbar-nav.ml-auto", [
                        m("li[classname='nav-item']",
                            m(m.route.Link, { class: 'nav-link', href: '/profile'},
                                userData.username
                            )
                        ),
                        m("li[classname='nav-item']",
                            m('button.btn', { class: 'nav-link', onclick: this.logout},
                                "Logout"
                            ))
                    ]
                );

        }

        return m("nav.navbar.navbar-expand-lg.navbar-light.bg-light", [
                m(m.route.Link, {class: 'navbar-brand', href: '/'}, m("img.logo[src='/images/pew.png']")),
                m("button.navbar-toggler[type='button'][data-toggle='collapse'][data-target='#navbarSupportedContent'][aria-controls='navbarSupportedContent'][aria-expanded='false'][aria-label='Toggle navigation']", m("span.navbar-toggler-icon")),
                m(".collapse.navbar-collapse[id='navbarSupportedContent']", [
                        m("ul.navbar-nav.mr-auto", [
                                m("li.nav-item.active",
                                    m(m.route.Link, {class: 'nav-link', href: '/'}, [
                                            "Home ",
                                            m("span.sr-only", "(current)")
                                        ]
                                    )
                                )
                            ]
                        ),
                        rightButtons
                    ]
                )
            ]
        )


    }
};

export default Header;
