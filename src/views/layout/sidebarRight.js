import m from 'mithril';

class SidebarRight {
    view(_data) {
        return [
            m("div.navbar-right", [
                m("div.dropdown.dropdown-profile", [
                    m("a.dropdown-link[href=''][data-toggle='dropdown'][data-display='static']",


                        m("div.d-inline.tx-color-03.tx-14.tx-semibold.mg-b-0.mg-r-6",
                            _data.attrs.userName
                        ),
                        m("div.avatar.avatar-sm.tx-color-03",
                            m("i[data-feather='user']"),
                        )
                    ),
                    m("div.dropdown-menu.dropdown-menu-right.tx-13", [
                        m("div.tx-18.tx-semibold.mg-b-0",
                            _data.attrs.userName
                        ),
                        m("p.mg-b-25.tx-12.tx-color-03", [
                            'Usuario'
                        ]),
                        m("div.dropdown-divider"),
                        m('button.btn.btn-xs.btn-block.btn-light.tx-inverse', {
                            onclick: (e) => {
                                m.route.set('/salir');
                            }
                        }, [
                            m("i[data-feather='log-out']"),
                            " Salir ",
                        ]),





                    ])
                ]),
                m('div', [
                    m("a.tx-color-03.tx-semibold[href='/salir'][title='Salir']",
                        m("div.avatar.avatar-sm",
                            m("i[data-feather='log-out']"),
                        )
                    )
                ]),
            ])

        ];
    }
};


export default SidebarRight;