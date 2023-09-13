import m from "mithril";

class MenuAdmin {
    static modulos = [{
        page: 'imagen/pedidos',
        label: 'Recepción de Pedidos',
    }, {
        page: 'imagen/agendas',
        label: 'Agenda MV',
    }];
}


class MenuSidebar {
    view() {
        if (MenuAdmin.modulos.length !== 0) {
            return [
                MenuAdmin.modulos.map(function (_v, _i, _contentData) {
                    return [
                        m(m.route.Link, { href: "/" + _v.page, class: ((SidebarImagen.page == _v.page) ? "active" : "") }, [
                            _v.label
                        ])

                    ]

                })
            ]
        }

    }

};




class SidebarImagen {
    oninit(_data) {
        SidebarImagen.page = _data.attrs.page;
    }
    view() {
        return [
            m(".sidebar.sidebar-fixed.sidebar-components[id='sidebarMenu']", [
                m("div.sidebar-header", [
                    m("a[href=''][id='mainMenuOpen']",
                        m("i[data-feather='menu']")
                    ),
                    m("h5",
                        "Menu"
                    ),
                    m("a[href=''][id='sidebarMenuClose']",
                        m("i[data-feather='x']")
                    )
                ]),
                m("div.sidebar-body",
                    m("ul.sidebar-nav", [
                        m("li.nav-label.mg-b-15",
                            "Administración"
                        ),
                        m("li.nav-item.show", [

                            m(m.route.Link, { href: "/administracion", class: "nav-link with-sub" }, [
                                m("i[data-feather='layout']"),
                                " Administración"
                            ]),
                            m("nav.nav", [

                                m(MenuSidebar)

                            ])
                        ]),

                    ])
                )
            ])
        ];
    }

};

export default SidebarImagen;