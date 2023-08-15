import m from 'mithril';
import App from '../../models/App';
import SidebarRight from '../layout/sidebarRight';

class MenuInicio {

    isContent = false;
    view() {
        return [
            m("li.bg-primary.wd-100p.nav-item.d-none",

                m(m.route.Link, { href: "/inicio", class: "nav-link" }, [
                    m("i[data-feather='layout']"),
                    " Inicio "
                ])


            ),

        ]
    }
}

class ModulesAccess {

    view(_data) {

        console.log(_data)

        return [

            (_data.attrs.profiles.includes('ADMISIONES_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-25",
                                m("i.fas.fa-folder-open.tx-55")
                            ),
                            m("h5",
                                m("a.link-01[href='/admisiones']",
                                    "Admisiones"
                                )
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Admisiones"
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "Ir a Admisiones"
                            ),
                            m("a.tx-18.lh-0[href='/admisiones']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('EMERGENCIA_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-25",
                                m("i.fas.fa-first-aid.tx-55")
                            ),
                            m("h5",
                                m("a.link-01[href='/emergencia']",
                                    "Emergencia"
                                )
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Emergencia"
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "Ir a Emergencia"
                            ),
                            m("a.tx-18.lh-0[href='/emergencia']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('FARMACIA_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-25",
                                m("i.fas.fa-pills.tx-55")
                            ),
                            m("h5",
                                m("a.link-01[href='/farmacia']",
                                    "Farmacia"
                                )
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Farmacia"
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "Ir a Farmacia"
                            ),
                            m("a.tx-18.lh-0[href='/farmacia']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('IMAGEN_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-25",
                                m("i.fas.fa-file-prescription.tx-55")
                            ),
                            m("h5",
                                m("a.link-01[href='/imagen']",
                                    "Imagen"
                                )
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Imagen"
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "Ir a Imagen"
                            ),
                            m("a.tx-18.lh-0[href='/imagen']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('LABORATORIO_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-25",
                                m("i.fas.fa-microscope.tx-55")
                            ),
                            m("h5",
                                m("a.link-01[href='/laboratorio']",
                                    "Laboratorio"
                                )
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Laboratorio"
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "Ir a Laboratorio"
                            ),
                            m("a.tx-18.lh-0[href='/laboratorio']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('HOSPITALIZACION_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-25",
                                m("i.fas.fa-procedures.tx-55")
                            ),
                            m("h5",
                                m("a.link-01[href='/hospitalizacion']",
                                    "Hospitalizacion"
                                )
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Hospitalizacion"
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "Ir a Hospitalizacion"
                            ),
                            m("a.tx-18.lh-0[href='/hospitalizacion']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('TR_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-25",
                                m("i.fas.fa-user-md.tx-55")
                            ),
                            m("h5",
                                m("a.link-01[href='/terapia-respiratoria']",
                                    "Terapia Respiratoria"
                                )
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Terapia Respiratoria"
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "Ir a Terapia Respiratoria"
                            ),
                            m("a.tx-18.lh-0[href='/terapia-respiratoria']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('BCO_SANGRE_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-25",
                                m("i.fas.fa-burn.tx-55")
                            ),
                            m("h5",
                                m("a.link-01[href='/bco-sangre']",
                                    "Banco de Sangre"
                                )
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Banco de Sangre"
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "Ir a Banco de Sangre"
                            ),
                            m("a.tx-18.lh-0[href='/bco-sangre']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('ADM_USUARIOS_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-25",
                                m("i.fas.fa-cog")
                            ),
                            m("h5",
                                m("a.link-01[href='/administracion']",
                                    "Administraciòn"
                                )
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Control de Acceso"
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "Ir a Administración"
                            ),
                            m("a.tx-18.lh-0[href='/administracion']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                ),
            ] : []),

        ];


    }


}

class iMdodule {
    view() {
        return [
            m("div.row", [
                m("div.col-sm-6.col-lg-3",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-25",
                                m("i.icon.ion-ios-cog")
                            ),
                            m("h5",
                                m("a.link-01[href='']",
                                    "Integrations"
                                )
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molesti..."
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "18 Topics"
                            ),
                            m("a.tx-18.lh-0[href='']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                ),
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-0",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-25",
                                m("i.icon.ion-ios-laptop")
                            ),
                            m("h5",
                                m("a.link-01[href='']",
                                    "Supported Devices"
                                )
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molesti..."
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "22 Topics"
                            ),
                            m("a.tx-18.lh-0[href='']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                ),
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-25",
                                m("i.icon.ion-ios-cart")
                            ),
                            m("h5",
                                m("a.link-01[href='']", [
                                    "Pricing ",
                                    m.trust("&amp;"),
                                    " Billing"
                                ])
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molesti..."
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "11 Topics"
                            ),
                            m("a.tx-18.lh-0[href='']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                ),
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-25",
                                m("i.icon.ion-ios-filing")
                            ),
                            m("h5",
                                m("a.link-01[href='']",
                                    "Features"
                                )
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molesti..."
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "15 Topics"
                            ),
                            m("a.tx-18.lh-0[href='']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                )
            ])

        ]
    }
};


class Inicio extends App {
    constructor() {
        super();
        this.title = "Inicio";
        this.isAuthenticated();
    }
    view() {
        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [

                m("div.navbar-brand",
                    m(m.route.Link, { href: "/", class: "df-logo" }, [
                        "Metro",
                        m("span",
                            "Plus+"
                        ),

                    ]),


                ),
                m(".navbar-menu-wrapper[id='navbarMenu']", [
                    m("div.navbar-menu-header", [
                        m(m.route.Link, { href: "/", class: "df-logo" }, [
                            "Metro",
                            m("span",
                                "Plus+"
                            ),

                        ]),
                        m("a[id='mainMenuClose'][href='']",
                            m("i[data-feather='x']")
                        )
                    ]),
                    m("ul.nav.navbar-menu", [
                        m("li.nav-label.pd-l-20.pd-lg-l-25.d-lg-none",
                            "Menu"
                        ),
                        m(MenuInicio),

                    ])
                ]),
                m(SidebarRight, { userName: this.userName })
            ]),
            m("div.content.content-components", {

            },
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/", }, [
                                "MetroPlus"

                            ]),

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            this.title
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        this.title + ":"
                    ),

                    m("div.row.tx-14", [
                        m(ModulesAccess, { profiles: this.auth.user.profile }),
                    ]),

                ])
            ),
        ];

    }
}


export default Inicio;