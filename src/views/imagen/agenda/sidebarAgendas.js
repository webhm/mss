import m from "mithril";
import Menu from "./menuAgenda";
import App from "../../../models/App";



class MenuSidebar {
    view() {
        if (Menu.modulos.length !== 0) {
            return [
                Menu.modulos.map(function (_v, _i, _contentData) {

                    if (App.hasProfile(_v.profile)) {
                        return [
                            m(m.route.Link, { href: "/" + _v.page, class: ((SidebarAgendas.page == _v.page) ? "active" : "") }, [
                                _v.label
                            ])
                        ]

                    }


                })
            ]
        }

    }

};




class SidebarAgendas {
    oninit(_data) {
        SidebarAgendas.page = _data.attrs.page;
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
                            "Imagen"
                        ),
                        m("li.nav-item.show", [

                            m(m.route.Link, { href: "/imagen/agendas", class: "nav-link with-sub" }, [
                                m("i[data-feather='layout']"),
                                " Agenda MV "
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

export default SidebarAgendas;