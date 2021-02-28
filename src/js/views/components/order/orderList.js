import m from 'mithril';

const OrderListView = {
    oninit: function (vnode) {
        let component = this;
        component.orders = vnode.attrs.orders;
        component.orders.subscribe('update', function () {
            m.redraw();
        });
    },

    delete: function () {
        let order = this.orders.pop();
        order.remove();
    },

    view: function (vnode) {
        let orders = this.orders.data.map(function (order) {
            return m("li.list-group-item",
                m("span",
                    "Id: " + order.id + ", description: " + order.description
                )
            )
        });
        return m("div.card.mx-auto",
            [
                m("div.card-header",
                    m("div.dropdown",
                        [
                            m("button.btn.btn-secondary.dropdown-toggle[type='button'][id='dropdownMenuButton'][data-toggle='dropdown'][aria-haspopup='true'][aria-expanded='false']",
                                " Actions "
                            ),
                            m("ul.dropdown-menu[aria-labelledby='dropdownMenuButton']",
                                [
                                    m("a.dropdown-item[href='#']", {
                                            onclick: this.delete.bind(this)
                                        },
                                        "Delete last element"
                                    ),
                                    m("a.dropdown-item[href='#']",
                                        "Option 2"
                                    ),
                                    m("a.dropdown-item[href='#']",
                                        "Option 3"
                                    )
                                ]
                            )
                        ]
                    )
                ),
                m("div.panel-body", m("ul.list-group.list-group-flush", orders)),
                m("div.card-footer",
                    m("h6",
                        [
                            "Total Count ",
                            m("span.label.label-info",
                                orders.length
                            )
                        ]
                    )
                )
            ]
        )
    }
};


export default OrderListView;
