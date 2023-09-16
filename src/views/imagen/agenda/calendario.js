import m from "mithril";
import App from "../../../models/App";
import HeaderPrivate from "../../layout/headerPrivate";
import Sidebar from "./sidebarAgendas";
import Menu from "./menuAgenda";

class MainCalendario {
    view() {

        return Menu.modulos.map(function (_v, _i, _contentData) {

            if (App.hasProfile(_v.profile)) {
                return [
                    m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                        m("a", {
                            style: { 'color': "#325a98" },
                            href: '/' + _v.page
                        }, [
                            m("div.card.card-help", [
                                m("div.card-body.tx-13", [
                                    m("div.tx-60.lh-0.mg-b-15", {
                                        style: { 'color': "#325a98" }
                                    },
                                        m("i.fas", {
                                            class: _v.icon
                                        })
                                    ),

                                    m("p.tx-color-03.mg-b-0.tx-semibold",
                                        _v.label
                                    )
                                ])

                            ])
                        ])
                    )
                ]
            }



        })

    }
}


// Calendario

class Calendario extends App {

    constructor() {
        super();
        if (App.isAuthenticated()) {
            App.setTitle("Agenda Centralizada");
            this.view = this.page;
        }
    }

    vHeader() {
        return m(HeaderPrivate, { userName: App.userName });
    }

    vMain() {
        return [

            m("div.calendar-wrapper", [
                m("div.calendar-sidebar", [
                    m("div.calendar-sidebar-header", [
                        m("i[data-feather='search']"),
                        m("div.search-form", [
                            m("input.form-control[type='search'][placeholder='Buscar por Apellidos y Nombres']")
                        ]),
                        m("a.btn btn-sm btn-primary btn-icon calendar-add", [
                            m("div[data-toggle='tooltip']", [
                                m("i.tx-white[data-feather='plus']")
                            ])
                        ])
                    ]),
                    m("div.calendar-sidebar-body[id='calendarSidebarBody']", [
                        m("div.calendar-inline", [
                            m("div[id='calendarInline']")
                        ]),
                        m("div.pd-t-0.pd-l-20.pd-r-20",
                            [
                                m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03.mg-b-15",
                                    "Filtro Calendarios: "
                                ),
                                m("div.schedule-group",
                                    m("select.form-control.select2-limit[multiple='multiple']", {
                                        oncreate: () => {
                                            setTimeout(() => {
                                                $('.select2-limit').select2({
                                                    placeholder: 'Seleccione...',
                                                    searchInputPlaceholder: 'Buscar'

                                                });
                                            }, 2000);


                                        }
                                    },
                                        [
                                            m("option[label='Choose one']"),
                                            m("option[value='Firefox']",
                                                "Firefox"
                                            ),
                                            m("option[value='Chrome']",
                                                "Chrome"
                                            ),
                                            m("option[value='Safari']",
                                                "Safari"
                                            ),
                                            m("option[value='Opera']",
                                                "Opera"
                                            ),
                                            m("option[value='Internet Explorer']",
                                                "Internet Explorer"
                                            )
                                        ]
                                    )

                                )
                            ]
                        ),
                        m("div.pd-t-20.pd-l-20.pd-r-20",
                            [
                                m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03.mg-b-15",
                                    "Ultimos agendamientos:"
                                ),
                                m("div.schedule-group",
                                    [



                                    ]
                                )
                            ]
                        )
                    ])
                ]),
                m("div.calendar-content", [

                    m("div.calendar-content-body[id='calendar']",),
                ]),




            ]),

        ];
    }

    vMenu() {
        return m(Sidebar);
    }

    page() {
        return [
            this.vHeader(),
            this.vMain()
        ];
    }



}

export default Calendario;