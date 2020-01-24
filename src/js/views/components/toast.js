import m from 'mithril';
import {ps} from '../../pubsub';

const Toast = {
    oninit: function (vnode) {
        this.removeToast = vnode.attrs.removeToast;
        this.toastId = vnode.attrs.toastId;
        this.message = vnode.attrs.message;
        this.intervalId = setTimeout(this.remove.bind(this), 3000)
    },

    remove: function () {
        clearTimeout(this.intervalId);
        this.removeToast(this.toastId)
    },

    view: function (vnode) {
        let component = this;
        return m(".card.mx-auto", {"style": {"margin": "1rem"}},
            [
                m("span.card-header",
                    "Error",
                    m("button.ml-2.mb-1.close[type='button'][aria-label='Close']",
                        {
                            onclick: () => component.remove()
                        },
                        m("span[aria-hidden='true']",
                            m.trust("&times;")
                        )
                    )
                ),
                m("div.card-body",
                    [
                        m("label",
                            this.message
                        )
                    ]
                )
            ]
        )
    }
};

export default Toast;
