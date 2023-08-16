import m from "mithril";


class MenuSidebar {
    view() {

        return [
            m(m.route.Link, { href: "/administracion/metrovirtual", class: ((SidebarAdmin.page == "/administracion/metrovirtual") ? "active" : "") }, [
                'MetroVirtual'
            ])

        ]



    }

};




class SidebarAdmin {
    page = "";
    setPage(page) {
        SidebarAdmin.page = page;
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

export default SidebarAdmin;