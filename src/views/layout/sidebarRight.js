import m from 'mithril';

class SidebarRight {

    view(_data) {
        console.log(_data)
        return [
            m("div.navbar-right", [

                m('div.dropdown.dropdown-profile', [
                    m("a.dropdown-link.tx-semibold[href='/salir'][title='Salir']",
                        m("div.avatar.avatar-sm",
                            m("i[data-feather='log-out']"),
                        )
                    )
                ]),

                m("div.dropdown.dropdown-profile", [

                    m("a.dropdown-link[href=''][data-toggle='dropdown'][data-display='static']",


                        m("div.d-inline.tx-color-03.tx-14.tx-semibold.mg-b-0",
                            _data.attrs.userName
                        ),
                        m("div.avatar.avatar-sm.pd-5",
                            m("i.fas.fa-user.fa-lg.tx-color-03")
                        ),
                    ),
                    m("div.dropdown-menu.dropdown-menu-right.tx-13", [
                        m("div.tx-18.tx-semibold.mg-b-0",
                            _data.attrs.userName
                        ),
                        m("p.mg-b-25.tx-12.tx-color-03", [
                            'Usuario'
                        ]),
                        m("div.dropdown-divider"),
                        m('button', {
                            class: "dropdown-item tx-16 ",
                            onclick: (e) => {
                                m.route.set('/salir');
                            }
                        }, [


                            m("i.fas.fa-sign-out-alt.tx-color-03.tx-20.pd-8"),
                            " Salir ",
                        ]),




                    ])
                ])
            ])

        ];
    }
};


export default SidebarRight;