import m from "mithril";
import App from "../../../models/App";
import SidebarHospital from "../sidebarHospital";
import Loader from "../../utils/loader";
import ApiHTTP from "../../../models/ApiHTTP";
import HeaderPublic from "../../layout/headerPublic";

// VerPasaporte MV

class VerPasaporte extends App {
    pasaportes = null;
    dataPasaporte = null;
    idPasaporte = null;
    idFiltro = 1;
    constructor(_data) {
        super();
        this.title = "Pasaporte de Paciente";
        this.view = this.page;
    }
    oncreate(_data) {
        if (_data.attrs.idPasaporte !== undefined) {
            this.idPasaporte = _data.attrs.idPasaporte;
        }
        this.fetchPasaporte().then((_data) => {
            this.dataPasaporte = _data.data[0];
        });
    }

    vHeader() {
        return m(HeaderPublic);
    }

    vMainProfile() {
        return [
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", [
                    m("ol.breadcrumb.df-breadcrumbs", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/", }, [
                                "MetroPlus"
                            ]),
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/hospitalizacion", }, [
                                'Hospitalización'
                            ]),
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            this.title
                        )
                    ]),
                    m(".df-title.mg-t-20.mg-b-10.tx-30",
                        this.title + ": ",
                        m("span.badge.badge-warning.tx-30",
                            "Pendiente"
                        )
                    ),
                    (this.dataPasaporte !== null ? [
                        m("table.table.table-bordered.table-sm.tx-14", [
                            m("thead",

                                m("tr.bg-litecoin.op-9.tx-white.tx-uppercase", [
                                    m("th[scope='col'][colspan='6']",
                                        "DATOS DEL PACIENTE:"
                                    ),

                                ])
                            ),

                            m("tbody", [
                                m("tr", [
                                    m("th.wd-10p", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                        "NHC:"
                                    ),
                                    m("td", {
                                        style: { "background-color": "#eaeff5" }

                                    }, this.dataPasaporte.NHC),

                                ]),
                                m("tr", [
                                    m("th.wd-10p", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                        "PTE:"
                                    ),
                                    m("td", {
                                        style: { "background-color": "#eaeff5" }

                                    }, this.dataPasaporte.NHC),

                                ]),
                                m("tr", [
                                    m("th.wd-10p", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                        "HAB:"
                                    ),
                                    m("td", {
                                        style: { "background-color": "#eaeff5" }

                                    }, this.dataPasaporte.NHC),

                                ]),

                                m("tr", [
                                    m("th.wd-10p", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                        "MED:"
                                    ),
                                    m("td", {
                                        style: { "background-color": "#eaeff5" }

                                    }, this.dataPasaporte.NHC),

                                ]),

                                m("tr", [
                                    m("th.wd-10p", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                        "ESP:"
                                    ),
                                    m("td", {
                                        style: { "background-color": "#eaeff5" }

                                    }, this.dataPasaporte.NHC),

                                ]),
                                m("tr.d-print-none.bg-litecoin.op-9.tx-white.", [
                                    m("th[scope='col'][colspan='6']",
                                        "OPCIONES DISPONIBLES:"
                                    ),

                                ]),
                                m("tr.d-print-none", [

                                    m("td[colspan='6']", {
                                        style: { "background-color": "#eaeff5" }

                                    },
                                        m("ul.nav.nav-tabs[id='myTab'][role='tablist']", [
                                            (this.dataPasaporte.STATUS == 1 ? [
                                                m("li.nav-item",
                                                    m("a.nav-link[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']", {
                                                        style: { "color": "#476ba3" }
                                                    },
                                                        m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                        " Realizar Encuesta "
                                                    )
                                                ),
                                            ] : []),

                                            (this.dataPasaporte.STATUS == 2 ? [
                                                m("li.nav-item",
                                                    m("a.nav-link[id='home-asig'][data-toggle='tab'][href='#asig'][role='tab'][aria-controls='asig']", {
                                                        style: { "color": "#476ba3" }
                                                    },
                                                        m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                        " Asignar Encuesta  "
                                                    )
                                                )
                                            ] : []),





                                        ]),
                                    ),


                                ]),
                                m("tr", [

                                    m("td[colspan='6']",
                                        m(".tab-content.bd.bd-gray-300.bd-t-0.wd-100p[id='myTab']", [
                                            m(".tab-pane.fade[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [
                                                m("form", {
                                                    onsubmit: (el) => {
                                                        el.preventDefault();
                                                        let formData = new FormData(el.srcElement)
                                                        for (let pair of formData.entries()) {
                                                            console.log(pair)
                                                        }
                                                    }
                                                }, [
                                                    m("div.form-row", [
                                                        m("div.form-group.col-md-12.text-center m-0", [
                                                            m('div.bg-secondary', [
                                                                m("label.pd-b-5.pd-t-5.m-0.tx-white.tx-semibold[for='inputEmail4']",
                                                                    "Preferencias del Paciente",
                                                                ),

                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),


                                                        ])
                                                    ]),
                                                    m("div.form-row", [
                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                    "1.- ¿Còmo prefiere que lo llamemos?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq1'][name='rq1'][value='Muy Importante'][checked]"),
                                                                    m("label.custom-control-label[for='q1_rq1']",
                                                                        "Muy Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_rq1'][name='rq1'][value='Importante']"),
                                                                    m("label.custom-control-label[for='q2_rq1']",
                                                                        "Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q3_rq1'][name='rq1'][value='Me da igual']"),
                                                                    m("label.custom-control-label[for='q3_rq1']",
                                                                        "Me da igual"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q4_rq1'][name='rq1'][value='No muy importante']"),
                                                                    m("label.custom-control-label[for='q4_rq1']",
                                                                        "No muy importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q5_rq1'][name='rq1'][value='No es nada importante']"),
                                                                    m("label.custom-control-label[for='q5_rq1']",
                                                                        "No es nada importante"
                                                                    )
                                                                ])
                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),
                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify[for='inputEmail4']",
                                                                    "2.- ¿Qué tan importante es para usted la hora a la que se despierta en la mañana?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq2'][name='rq2'][checked][value='Muy Importante']"),
                                                                    m("label.custom-control-label[for='q1_rq2']",
                                                                        "Muy Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_rq2'][name='rq2'][value='Importante']"),
                                                                    m("label.custom-control-label[for='q2_rq2']",
                                                                        "Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q3_rq2'][name='rq2'][value='Me da igual']"),
                                                                    m("label.custom-control-label[for='q3_rq2']",
                                                                        "Me da igual"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q4_rq2'][name='rq2'][value='No muy importante']"),
                                                                    m("label.custom-control-label[for='q4_rq2']",
                                                                        "No muy importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q5_rq2'][name='rq2'][value='No es nada importante']"),
                                                                    m("label.custom-control-label[for='q5_rq2']",
                                                                        "No es nada importante"
                                                                    )
                                                                ])
                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),
                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify[for='inputEmail4']",
                                                                    "3.- ¿Qué tan importante es para usted la hora a la que toma un baño?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq3'][name='rq3'][value='Muy Importante'][checked]"),
                                                                    m("label.custom-control-label[for='q1_rq3']",
                                                                        "Muy Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_rq3'][name='rq3'][value='Importante']"),
                                                                    m("label.custom-control-label[for='q2_rq3']",
                                                                        "Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q3_rq3'][name='rq3'][value='Me da igual']"),
                                                                    m("label.custom-control-label[for='q3_rq3']",
                                                                        "Me da igual"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q4_rq3'][name='rq3'][value='No muy importante']"),
                                                                    m("label.custom-control-label[for='q4_rq3']",
                                                                        "No muy importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q5_rq3'][name='rq3'][value='No es nada importante']"),
                                                                    m("label.custom-control-label[for='q5_rq3']",
                                                                        "No es nada importante"
                                                                    )
                                                                ])
                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),
                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify[for='inputEmail4']",
                                                                    "4.- ¿Qué tan importante es para usted el cuidado diario de su cabello?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq4'][name='rq4'][value='Muy Importante'][checked]"),
                                                                    m("label.custom-control-label[for='q1_rq4']",
                                                                        "Muy Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_rq4'][name='rq4'][value='Importante']"),
                                                                    m("label.custom-control-label[for='q2_rq4']",
                                                                        "Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q3_rq4'][name='rq4'][value='Me da igual']"),
                                                                    m("label.custom-control-label[for='q3_rq4']",
                                                                        "Me da igual"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q4_rq4'][name='rq4'][value='No muy importante']"),
                                                                    m("label.custom-control-label[for='q4_rq4']",
                                                                        "No muy importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q5_rq4'][name='rq4'][value='No es nada importante']"),
                                                                    m("label.custom-control-label[for='q5_rq4']",
                                                                        "No es nada importante"
                                                                    )
                                                                ])
                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),
                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify[for='inputEmail4']",
                                                                    "5.- ¿Qué tan importante es para usted la hora en la que duerme en la noche?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq5'][name='rq5'][value='Muy Importante'][checked]"),
                                                                    m("label.custom-control-label[for='q1_rq5']",
                                                                        "Muy Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_rq5'][name='rq5'][value='Importante']"),
                                                                    m("label.custom-control-label[for='q2_rq5']",
                                                                        "Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q3_rq5'][name='rq5'][value='Me da igual']"),
                                                                    m("label.custom-control-label[for='q3_rq5']",
                                                                        "Me da igual"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q4_rq5'][name='rq5'][value='No muy importante']"),
                                                                    m("label.custom-control-label[for='q4_rq5']",
                                                                        "No muy importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q5_rq5'][name='rq5'][value='No es nada importante']"),
                                                                    m("label.custom-control-label[for='q5_rq5']",
                                                                        "No es nada importante"
                                                                    )
                                                                ])
                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),
                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify[for='inputEmail4']",
                                                                    "6.- ¿Qué tan importante es para usted poder escoger su comida?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq6'][name='rq6'][value='Muy Importante'][checked]"),
                                                                    m("label.custom-control-label[for='q1_rq6']",
                                                                        "Muy Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_rq6'][name='rq6'][value='Importante']"),
                                                                    m("label.custom-control-label[for='q2_rq6']",
                                                                        "Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q3_rq6'][name='rq6'][value='Me da igual']"),
                                                                    m("label.custom-control-label[for='q3_rq6']",
                                                                        "Me da igual"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q4_rq6'][name='rq6'][value='No muy importante']"),
                                                                    m("label.custom-control-label[for='q4_rq6']",
                                                                        "No muy importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q5_rq6'][name='rq6'][value='No es nada importante']"),
                                                                    m("label.custom-control-label[for='q5_rq6']",
                                                                        "No es nada importante"
                                                                    )
                                                                ])
                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),
                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify[for='inputEmail4']",
                                                                    "7.- ¿Qué tan importante es para usted salir al aire libre cuando el clima es adecuado?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq7'][name='rq7'][value='Muy Importante'][checked]"),
                                                                    m("label.custom-control-label[for='q1_rq7']",
                                                                        "Muy Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_rq7'][name='rq7'][value='Importante']"),
                                                                    m("label.custom-control-label[for='q2_rq7']",
                                                                        "Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q3_rq7'][name='rq7'][value='Me da igual']"),
                                                                    m("label.custom-control-label[for='q3_rq7']",
                                                                        "Me da igual"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q4_rq7'][name='rq7'][value='No muy importante']"),
                                                                    m("label.custom-control-label[for='q4_rq7']",
                                                                        "No muy importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q5_rq7'][name='rq7'][value='No es nada importante']"),
                                                                    m("label.custom-control-label[for='q5_rq7']",
                                                                        "No es nada importante"
                                                                    )
                                                                ])
                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),
                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify[for='inputEmail4']",
                                                                    "8.- ¿Usted tiene mascotas? En caso afirmativo, ¿qué tan importante es para usted estar cerca de sus mascotas?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq8'][name='rq8'][value='Muy Importante'][checked]"),
                                                                    m("label.custom-control-label[for='q1_rq8']",
                                                                        "Muy Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_rq8'][name='rq8'][value='Importante']"),
                                                                    m("label.custom-control-label[for='q2_rq8']",
                                                                        "Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q3_rq8'][name='rq8'][value='Me da igual']"),
                                                                    m("label.custom-control-label[for='q3_rq8']",
                                                                        "Me da igual"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q4_rq8'][name='rq8'][value='No muy importante']"),
                                                                    m("label.custom-control-label[for='q4_rq8']",
                                                                        "No muy importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q5_rq8'][name='rq8'][value='No es nada importante']"),
                                                                    m("label.custom-control-label[for='q5_rq8']",
                                                                        "No es nada importante"
                                                                    )
                                                                ])
                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),
                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify[for='inputEmail4']",
                                                                    "9.- ¿Qué tan importante es para usted tener libros/revistas a su disposición para leer?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq9'][name='rq9'][value='Muy Importante']"),
                                                                    m("label.custom-control-label[for='q1_rq9']",
                                                                        "Muy Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_rq9'][name='rq9'][value='Importante']"),
                                                                    m("label.custom-control-label[for='q2_rq9']",
                                                                        "Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q3_rq9'][name='rq9'][value='Me da igual']"),
                                                                    m("label.custom-control-label[for='q3_rq9']",
                                                                        "Me da igual"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q4_rq9'][name='rq9'][value='No muy importante']"),
                                                                    m("label.custom-control-label[for='q4_rq9']",
                                                                        "No muy importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q5_rq9'][name='rq9'][value='No es nada importante']"),
                                                                    m("label.custom-control-label[for='q5_rq9']",
                                                                        "No es nada importante"
                                                                    )
                                                                ])
                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),
                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify[for='inputEmail4']",
                                                                    " 10.- ¿Estaría de acuerdo en interactuar con el personal de salud en la entrega recepción de turno?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq10'][name='rq10'][value='Si']"),
                                                                    m("label.custom-control-label[for='q1_rq10']",
                                                                        "Si"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_rq10'][name='rq10'][value='No']"),
                                                                    m("label.custom-control-label[for='q2_rq10']",
                                                                        "No"
                                                                    )
                                                                ]),
                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),
                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify[for='inputEmail4']",
                                                                    "11.- ¿Desea restringir totalmente sus vistas?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq11'][name='rq11'][value='Si']"),
                                                                    m("label.custom-control-label[for='q1_rq11']",
                                                                        "Si"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_rq11'][name='rq11'][value='No']"),
                                                                    m("label.custom-control-label[for='q2_rq11']",
                                                                        "No"
                                                                    )
                                                                ]),
                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),

                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify[for='inputEmail4']",
                                                                    "12.- ¿Durante su hospitalización y cuidados posteriores a la alta médica, usted desearía que capaciten a una persona de su confianza para que le brinde un cuidado y acompañamiento pertinente?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq12'][name='rq12'][value='Si']"),
                                                                    m("label.custom-control-label[for='q1_rq12']",
                                                                        "Si"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_rq12'][name='rq12'][value='No']"),
                                                                    m("label.custom-control-label[for='q2_rq12']",
                                                                        "No"
                                                                    )
                                                                ]),
                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),


                                                    ]),

                                                    m("div.form-group",
                                                        m("button.btn.btn-primary.btn-xs.btn-block.tx-semibold[type='submit']",
                                                            "Enviar"
                                                        )
                                                    ),

                                                ]),





                                            ]),

                                            m(".tab-pane.fade[id='asig'][role='tabpanel'][aria-labelledby='home-asig']", [
                                                m("div.mg-5.tx-left", [
                                                    m("span.badge.badge-light.tx-14",
                                                        "Observaciones",
                                                    ),
                                                    m("textarea.form-control.mg-t-5[rows='5'][placeholder='Observaciones']", {
                                                        //oninput: function (e) { Observaciones.observaciones = e.target.value; },
                                                        // value: Observaciones.observaciones,
                                                    }),
                                                    m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                ])

                                            ]),

                                        ])
                                    ),


                                ])


                            ])
                        ])
                    ] : [
                        m(Loader)
                    ]),

                    m('.row.d-none', [
                        m('.col-12.bg-white.bd.pd-20.pd-lg-30', [
                            (this.dataPasaporte !== null ? [
                                m("table.table.table-bordered.table-sm.tx-14", [

                                    m("tbody", [

                                        m("tr", [

                                            m("td[colspan='6']",
                                                m(".tab-content.bd.bd-gray-300.bd-t-0.wd-100p[id='myTab']", [
                                                    m(".tab-pane.fade[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [


                                                        m("p.mg-5", [
                                                            m("span.badge.badge-light.tx-14.text-left.pd-5",
                                                            ),
                                                            m("div.pd-20", [



                                                            ]),
                                                            m("hr.mg-t-5.mg-b-5"),
                                                        ]),

                                                    ]),

                                                    m(".tab-pane.fade[id='asig'][role='tabpanel'][aria-labelledby='home-asig']", [
                                                        m("div.mg-5.tx-left", [
                                                            m("span.badge.badge-light.tx-14",
                                                                "Observaciones",
                                                            ),
                                                            m("textarea.form-control.mg-t-5[rows='5'][placeholder='Observaciones']", {
                                                                //oninput: function (e) { Observaciones.observaciones = e.target.value; },
                                                                // value: Observaciones.observaciones,
                                                            }),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ])

                                                    ]),

                                                ])
                                            ),


                                        ])


                                    ])
                                ])
                            ] : [
                                m(Loader)
                            ])
                        ])
                    ])



                ])
            ),
        ];
    }

    fetchPasaporte() {

        let _queryString = '?nhc=' + this.idPasaporte;

        return m.request({
            method: "GET",
            url: ApiHTTP.apiUrl + "/v2/pacientes/pasaportes" + _queryString,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': localStorage.getItem('userToken')
            },
        })
            .then(function (result) {
                return result;
            })
            .catch(function (e) {
                return {
                    'status': null,
                    'message': e
                };
            });

    }

    page() {
        return [
            this.vHeader(),
            this.vMainProfile()
        ];
    }
}


export default VerPasaporte;