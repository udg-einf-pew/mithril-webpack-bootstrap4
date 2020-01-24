import m from 'mithril';
import { ps } from '../../pubsub';

let userData = {};

const Header = {
    oninit: function (vnode) {
        const view = this;
        ps.subscribe('localstorage.set.user', function (user) {
            view.setUserData(user);
            m.redraw();
        });

    },
    setUserData: function (user) {
        userData = user;
    },

    logout: function () {
        ps.publish('view.logout.request');
    },

    view: function () {
        var ordersButton = null;
        var rightButtons = null;
        if (this.userData && this.userData.username) {
            ordersButton =
                m("li[classname='nav-item']",
                    m("a[classname='nav-link'][href='#orders']",
                        "Orders"
                    )
                );
            rightButtons =
                m("ul.navbar-nav.ml-auto", [
                        m("li[classname='nav-item']",
                            m("a[classname='nav-link'][href='#profile']",
                                "{this.userData.user.username}"
                            )
                        ),
                        m("li[classname='nav-item']",
                            m("a[classname='nav-link logout']",
                                {
                                    onclick: this.logout
                                },
                                "Logout"
                            ))
                    ]
                );

        }

        return m("nav.navbar.navbar-expand-lg.navbar-light.bg-light", [
                m("a.navbar-brand[href='#']", m("img.logo[src='/images/pew.png']")),
                m("button.navbar-toggler[type='button'][data-toggle='collapse'][data-target='#navbarSupportedContent'][aria-controls='navbarSupportedContent'][aria-expanded='false'][aria-label='Toggle navigation']", m("span.navbar-toggler-icon")),
                m(".collapse.navbar-collapse[id='navbarSupportedContent']", [
                        m("ul.navbar-nav.mr-auto", [
                                m("li.nav-item.active",
                                    m("a.nav-link[href='#']", [
                                            "Home ",
                                            m("span.sr-only", "(current)")
                                        ]
                                    )
                                ),
                                ordersButton
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
