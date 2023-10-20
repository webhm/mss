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

        return [



            m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",
                m("a[href='/bco-sangre']", {
                    style: { 'color': "#325a98" }
                }, [
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-15", {
                                style: { 'color': "#325a98" }
                            },
                                m("i.fas.fa-burn.tx-55")
                            ),

                            m("p.tx-color-03.mg-b-0.tx-semibold",
                                "Banco de Sangre"
                            )
                        ])

                    ])
                ])

            ),
            m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",
                m("a[href='/administracion']", {
                    style: { 'color': "#325a98" }
                }, [
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-15", {
                                style: { 'color': "#325a98" }
                            },
                                m("i.fas.fa-cog")
                            ),

                            m("p.tx-color-03.mg-b-0.tx-semibold",
                                "Administraciòn"
                            )
                        ])

                    ])
                ])
            ),
            m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                m("a[href='/terapia-respiratoria']", {
                    style: { 'color': "#325a98" }
                }, [
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-15", {
                                style: { 'color': "#325a98" }
                            },
                                m("i.fas.fa-user-md")
                            ),

                            m("p.tx-color-03.mg-b-0.tx-semibold",
                                "Terapia Respiratoria"
                            )
                        ])

                    ])
                ])
            ),

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
                            m("div.tx-60.lh-0.mg-b-15",
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
                            m("div.tx-60.lh-0.mg-b-15",
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
                            m("div.tx-60.lh-0.mg-b-15",
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
                            m("div.tx-60.lh-0.mg-b-15",
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
        App.setTitle("Inicio");
        this.view = this.page;
    }

    page() {

        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [

                m("div.navbar-brand",
                    m(m.route.Link, { href: "/", class: "df-logo" }, [
                        "Metro",
                        m("span",
                            "Servicios"
                        ),

                    ]),


                ),
                m(".navbar-menu-wrapper[id='navbarMenu']", [
                    m("div.navbar-menu-header", [
                        m(m.route.Link, { href: "/", class: "df-logo" }, [
                            "Metro",
                            m("span",
                                "Servicios"
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
                m("div.navbar-right", [


                    m('div', [
                        m("img", { src: "/assets/favicon.ico", width: '80%', height: '80%' })

                    ]),
                ])

            ]),

            m("div.content.content-components", {

            },
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/", }, [
                                "MetroServicios"

                            ]),

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            App.title
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Hospital:"
                    ),
                    m('hr'),
                    m("div.row.tx-14", [
                        m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                            m("a[href='/admisiones']", {
                                style: { 'color': "#325a98" }
                            }, [
                                m("div.card.card-help", [
                                    m("div.card-body.tx-13", [
                                        m("div.tx-60.lh-0.mg-b-15", {
                                            style: { 'color': "#325a98" }
                                        },
                                            m("i.fas.fa-user-nurse")
                                        ),

                                        m("p.tx-color-03.mg-b-0.tx-semibold",
                                            "Triaje (MV SACR)"
                                        )
                                    ])

                                ])
                            ])
                        ),
                        m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                            m("a[href='/admisiones']", {
                                style: { 'color': "#325a98" }
                            }, [
                                m("div.card.card-help", [
                                    m("div.card-body.tx-13", [
                                        m("div.tx-60.lh-0.mg-b-15", {
                                            style: { 'color': "#325a98" }
                                        },
                                            m("i.fas.fa-hospital")
                                        ),

                                        m("p.tx-color-03.mg-b-0.tx-semibold",
                                            "HIS (MV SOUL)"
                                        )
                                    ])

                                ])
                            ])
                        ),
                        m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                            m("a[href='/admisiones']", {
                                style: { 'color': "#325a98" }
                            }, [
                                m("div.card.card-help", [
                                    m("div.card-body.tx-13", [
                                        m("div.tx-60.lh-0.mg-b-15", {
                                            style: { 'color': "#325a98" }
                                        },
                                            m("i.fas.fa-file-alt")
                                        ),

                                        m("p.tx-color-03.mg-b-0.tx-semibold",
                                            "Historia Clínica (MV PEP)"
                                        )
                                    ])

                                ])
                            ])
                        ),
                        m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                            m("a[href='/admisiones']", {
                                style: { 'color': "#325a98" }
                            }, [
                                m("div.card.card-help", [
                                    m("div.card-body.tx-13", [
                                        m("div.tx-60.lh-0.mg-b-15", {
                                            style: { 'color': "#325a98" }
                                        },
                                            m("i.fas.fa-flask.mg-r-5"),
                                            m("i.fas.fa-file-prescription.mg-r-5")
                                        ),

                                        m("p.tx-color-03.mg-b-0.tx-semibold",
                                            "Resultados de Laboratorio e Imagen"
                                        )
                                    ])

                                ])
                            ])
                        ),
                        m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                            m("a[href='/admisiones']", {
                                style: { 'color': "#325a98" }
                            }, [
                                m("div.card.card-help", [
                                    m("div.card-body.tx-13", [
                                        m("div.tx-60.lh-0.mg-b-15", {
                                            style: { 'color': "#325a98" }
                                        },
                                            m("i.fas.fa-plus-square")
                                        ),

                                        m("p.tx-color-03.mg-b-0.tx-semibold",
                                            "MetroPlus v2.0"
                                        )
                                    ])

                                ])
                            ])
                        ),
                        m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                            m("a[href='https://lisa.hospitalmetropolitano.org']", {
                                style: { 'color': "#325a98" }
                            }, [
                                m("div.card.card-help", [
                                    m("div.card-body.tx-13", [
                                        m("div.tx-60.lh-0.mg-b-15", {
                                            style: { 'color': "#325a98" }
                                        },
                                            m("i.fas.fa-microscope")
                                        ),

                                        m("p.tx-color-03.mg-b-0.tx-semibold",
                                            "LISA v2.0"
                                        )
                                    ])

                                ])
                            ])
                        ),
                        m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                            m("a[href='https://lisa.hospitalmetropolitano.org']", {
                                style: { 'color': "#325a98" }
                            }, [
                                m("div.card.card-help", [
                                    m("div.card-body.tx-13", [
                                        m("div.tx-60.lh-0.mg-b-15", {
                                            style: { 'color': "#325a98" }
                                        },
                                            m("i.fas.fa-unlock-alt")
                                        ),

                                        m("p.tx-color-03.mg-b-0.tx-semibold",
                                            "Cambio de contraseña (MV)"
                                        )
                                    ])

                                ])
                            ])
                        ),
                        m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                            m("a[href='https://lisa.hospitalmetropolitano.org']", {
                                style: { 'color': "#325a98" }
                            }, [
                                m("div.card.card-help", [
                                    m("div.card-body.tx-13", [
                                        m("div.tx-60.lh-0.mg-b-15", {
                                            style: { 'color': "#325a98" }
                                        },
                                            m("i.fas.fa-file")
                                        ),

                                        m("p.tx-color-03.mg-b-0.tx-semibold",
                                            "Manual de cambio de contraseña"
                                        )
                                    ])

                                ])
                            ])
                        ),



                    ]),
                    m('hr'),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Administrativo:"
                    ),
                    m('hr'),
                    m("div.row.tx-14", [
                        m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                            m("a[href='/admisiones']", {
                                style: { 'color': "#325a98" }
                            }, [
                                m("div.card.card-help", [
                                    m("div.card-body.tx-13", [
                                        m("div.tx-60.lh-0.mg-b-15", {
                                            style: { 'color': "#325a98" }
                                        },
                                            m("i.fas.fa-folder-open")
                                        ),

                                        m("p.tx-color-03.mg-b-0.tx-semibold",
                                            "Admisiones"
                                        )
                                    ])

                                ])
                            ])
                        ),

                        m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                            m("a[href='https://lisa.hospitalmetropolitano.org']", {
                                style: { 'color': "#325a98" }
                            }, [
                                m("div.card.card-help", [
                                    m("div.card-body.tx-13", [
                                        m("div.tx-60.lh-0.mg-b-15", {
                                            style: { 'color': "#325a98" }
                                        },
                                            m("i.fas.fa-book ")
                                        ),

                                        m("p.tx-color-03.mg-b-0.tx-semibold",
                                            "Contabilidad"
                                        )
                                    ])

                                ])
                            ])
                        )

                    ]),
                    m('hr'),

                ])
            ),
            m("footer.footer", [
                m("div", [
                    m("span", [
                        m.trust("&copy;"),
                        " Hospital Metropolitano - Todos los derechos reservados. "
                    ]),
                    m("span", [
                        "Created by ",
                        m("a[href='https://www.hospitalmetropolitano.org']",
                            "HMETRO"
                        )
                    ])
                ]),
                m("div",
                    m("nav.nav", [
                        m("a.nav-link[href='/']",
                            "MetroServicios v1.0.0"
                        ),

                        m("a.nav-link.text-danger.tx-semibold[href='https://discordapp.com/invite/RYqkVuw']",
                            "Ayuda Ext.2020 CONCAS"
                        )
                    ])
                )
            ])
        ];

    }
}


export default Inicio;