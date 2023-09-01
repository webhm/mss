import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import ApiHTTP from "../../../models/ApiHTTP";
import HeaderPublic from "../../layout/headerPublic";

// VerPasaporte MV

class VerPasaporte extends App {
    usuarios = null;
    dataPasaporte = null;
    idPasaporte = null;
    idFiltro = 1;
    usrAsignado = null;
    formLoader = false;
    mascotas = false;
    visitas = false
    indicaciones = false;
    constructor(_data) {
        super();
        this.title = "Pasaporte de Paciente";
        this.view = this.page;
    }
    oncreate(_data) {
        let _this = this;
        if (_data.attrs.idPasaporte !== undefined) {
            _this.idPasaporte = _data.attrs.idPasaporte;
        }
        _this.fetchPasaporte().then((_data) => {
            _this.dataPasaporte = _data.data[0];
            if (_this.dataPasaporte.STATUS == 1) {
                _this.fetchAsignado();
            }
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
                    m(".df-title.mg-t-20.mg-b-10.tx-30.d-flexs",
                        this.title + ": ",
                        m("span.badge.badge-warning.tx-30",
                            (this.dataPasaporte !== null ? [
                                (this.dataPasaporte.STATUS == 0 ? "Pendiente" : ""),
                                (this.dataPasaporte.STATUS == 1 ? "Asignado a: " + (this.usrAsignado == null ? '' : this.usrAsignado.displayName) : ""),
                                (this.dataPasaporte.STATUS == 2 ? "Generado" : "")
                            ] : [])
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

                                    }, this.dataPasaporte.PTE),

                                ]),
                                m("tr", [
                                    m("th.wd-10p", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                        "HAB:"
                                    ),
                                    m("td", {
                                        style: { "background-color": "#eaeff5" }

                                    }, this.dataPasaporte.HAB),

                                ]),

                                m("tr", [
                                    m("th.wd-10p", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                        "MED:"
                                    ),
                                    m("td", {
                                        style: { "background-color": "#eaeff5" }

                                    }, this.dataPasaporte.MED),

                                ]),

                                m("tr", [
                                    m("th.wd-10p", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                        "ESP:"
                                    ),
                                    m("td", {
                                        style: { "background-color": "#eaeff5" }

                                    }, this.dataPasaporte.ESP),

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
                                            (this.dataPasaporte.STATUS == 0 ? [
                                                m("li.nav-item",
                                                    m("a.nav-link[id='home-asig'][data-toggle='tab'][href='#asig'][role='tab'][aria-controls='asig']", {
                                                        style: { "color": "#476ba3" }
                                                    },
                                                        m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                        " Asignar Encuesta  "
                                                    )
                                                ),

                                            ] : []),

                                            (this.dataPasaporte.STATUS == 1 ? [
                                                m("li.nav-item",
                                                    m("a.nav-link[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']", {
                                                        style: { "color": "#476ba3" }
                                                    },
                                                        m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                        " Realizar Encuesta "
                                                    )
                                                ), ,
                                                m("li.nav-item",
                                                    m("a.nav-link[id='home-asig'][data-toggle='tab'][href='#asig'][role='tab'][aria-controls='asig']", {
                                                        style: { "color": "#476ba3" }
                                                    },
                                                        m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                        " Reasignar Encuesta  "
                                                    )
                                                ),
                                            ] : []),
                                            (this.dataPasaporte.STATUS == 2 ? [
                                                m("li.nav-item",
                                                    m("a.nav-link[id='home-ver'][data-toggle='tab'][href='#ver'][role='tab'][aria-controls='ver']", {
                                                        style: { "color": "#476ba3" }
                                                    },
                                                        m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                        " Ver Encuesta  "
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
                                                m('.pd-20.bg-white', {
                                                    class: (this.formLoader ? '' : 'd-none'),
                                                }, [
                                                    m(Loader)
                                                ]),
                                                m("form", {
                                                    class: (this.formLoader ? 'd-none' : ''),
                                                    onsubmit: (el) => {
                                                        el.preventDefault();
                                                        let formData = new FormData(el.srcElement)
                                                        let _arr = [];
                                                        for (let pair of formData.entries()) {
                                                            _arr.push(pair)
                                                        }
                                                        this.fetchGenerarPasaporte(_arr);
                                                        console.log(_arr)
                                                    }
                                                }, [
                                                    m("div.form-row", [
                                                        m("div.form-group.col-md-12.text-center m-0", [
                                                            m('div.bg-secondary', [
                                                                m("label.pd-b-5.pd-t-5.m-0.tx-white.tx-semibold",
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
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq1'][name='rq1'][value='Por mi Nombre']"),
                                                                    m("label.custom-control-label[for='q1_rq1']",
                                                                        "Por mi Nombre"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_rq1'][name='rq1'][value='Por su Apellido']"),
                                                                    m("label.custom-control-label[for='q2_rq1']",
                                                                        "Por su Apellido"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q3_rq1'][name='rq1'][value='Me da igual']"),
                                                                    m("label.custom-control-label[for='q3_rq1']",
                                                                        "Por su Título Profesional"
                                                                    )
                                                                ]),
                                                                m("div", [
                                                                    m("label",
                                                                        "Especifique:"
                                                                    ),
                                                                    m("input.form-control[type='text'][placeholder='Especifique:'][name='rq1']")
                                                                ]),

                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),
                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                    "2.- ¿Qué tan importante es para usted la hora a la que se despierta en la mañana?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq2'][name='rq2'][value='Muy Importante']"),
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
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                    "3.- ¿Qué tan importante es para usted la hora a la que toma un baño?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq3'][name='rq3'][value='Muy Importante']"),
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
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                    "4.- ¿Qué tan importante es para usted el cuidado diario de su cabello?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq4'][name='rq4'][value='Muy Importante']"),
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
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                    "5.- ¿Qué tan importante es para usted la hora en la que duerme en la noche?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq5'][name='rq5'][value='Muy Importante']"),
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
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                    "6.- ¿Qué tan importante es para usted poder escoger su comida?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq6'][name='rq6'][value='Muy Importante']"),
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
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                    "7.- ¿Qué tan importante es para usted salir al aire libre cuando el clima es adecuado?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq7'][name='rq7'][value='Muy Importante']"),
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
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                    "8.- ¿Usted tiene mascotas? En caso afirmativo, ¿qué tan importante es para usted estar cerca de sus mascotas?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq8'][name='rq8'][value='Muy Importante']", {
                                                                        onclick: () => {
                                                                            this.mascotas = true;
                                                                        }
                                                                    }),
                                                                    m("label.custom-control-label[for='q1_rq8']",
                                                                        "Muy Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_rq8'][name='rq8'][value='Importante']", {
                                                                        onclick: () => {
                                                                            this.mascotas = true;
                                                                        }
                                                                    }),
                                                                    m("label.custom-control-label[for='q2_rq8']",
                                                                        "Importante"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q3_rq8'][name='rq8'][value='Me da igual']", {
                                                                        onclick: () => {
                                                                            this.mascotas = false;
                                                                        }
                                                                    }),
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
                                                        m("div.form-group.col-md-12.m-0", {
                                                            class: this.mascotas ? '' : 'd-none'
                                                        }, [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                    "8.1.- ¿Quiere conocer el procedimiento de ingreso de mascotas al hospital?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_1_rq8'][name='rq8_1'][value='Si']", {
                                                                        disabled: (!this.mascotas ? 'disabled' : '')
                                                                    }),
                                                                    m("label.custom-control-label[for='q1_1_rq8']",
                                                                        "Si"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_2_rq8'][name='rq8_1'][value='No']", {
                                                                        disabled: (!this.mascotas ? 'disabled' : '')

                                                                    }),
                                                                    m("label.custom-control-label[for='q2_2_rq8']",
                                                                        "No"
                                                                    )
                                                                ])

                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),
                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
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
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                    " 10.- ¿Estaría de acuerdo en interactuar con el personal de salud en la entrega recepción de turno?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq10'][name='rq10'][value='Si']", {
                                                                        onclick: () => {
                                                                            this.visitas = true;
                                                                        }
                                                                    }),
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
                                                        m("div.form-group.col-md-12.m-0", {
                                                            class: this.visitas ? '' : 'd-none'
                                                        }, [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                    "10.1.- ¿En que turno preferiría partidipar.?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_1_rq10_1'][name='rq10_1'][value='Si']", {
                                                                        disabled: (!this.visitas ? 'disabled' : '')
                                                                    }),
                                                                    m("label.custom-control-label[for='q1_1_rq10_1']",
                                                                        "Si"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_2_rq10_1'][name='rq10_1'][value='No']", {
                                                                        disabled: (!this.visitas ? 'disabled' : '')

                                                                    }),
                                                                    m("label.custom-control-label[for='q2_2_rq10_1']",
                                                                        "No"
                                                                    )
                                                                ])

                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),
                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
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
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                    "12.- ¿Durante su hospitalización y cuidados posteriores a la alta médica, usted desearía que capaciten a una persona de su confianza para que le brinde un cuidado y acompañamiento pertinente?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_rq12'][name='rq12'][value='Si']", {
                                                                        onclick: () => {
                                                                            this.indicaciones = true;
                                                                        }
                                                                    }),
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
                                                        m("div.form-group.col-md-12.m-0", {
                                                            class: this.indicaciones ? '' : 'd-none'
                                                        }, [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                    "12.1.- Especificar nombre de la persona que requiere capacitación:",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q1_1_rq12_1'][name='rq12_1'][value='Si']", {
                                                                        disabled: (!this.indicaciones ? 'disabled' : '')
                                                                    }),
                                                                    m("label.custom-control-label[for='q1_1_rq12_1']",
                                                                        "Si"
                                                                    )
                                                                ]),
                                                                m("div.custom-control.custom-radio", [
                                                                    m("input.custom-control-input[type='radio'][id='q2_2_rq12_1'][name='rq12_1'][value='No']", {
                                                                        disabled: (!this.indicaciones ? 'disabled' : '')

                                                                    }),
                                                                    m("label.custom-control-label[for='q2_2_rq12_1']",
                                                                        "No"
                                                                    )
                                                                ])

                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),


                                                    ]),


                                                    m("div.form-group.pd-25.bg-white",
                                                        m("button.btn.btn-primary.btn-xs.btn-block.tx-semibold[type='submit']",
                                                            "Enviar"
                                                        )
                                                    ),

                                                ]),





                                            ]),

                                            m(".tab-pane.fade[id='asig'][role='tabpanel'][aria-labelledby='home-asig']", [
                                                m('.pd-20.bg-white', {
                                                    class: (this.formLoader ? '' : 'd-none'),
                                                }, [
                                                    m(Loader)
                                                ]),
                                                m("form", {
                                                    class: (this.formLoader ? 'd-none' : ''),
                                                    onsubmit: (el) => {
                                                        el.preventDefault();
                                                        if (this.usrAsignado !== null) {
                                                            this.fetchAsignar();
                                                        }
                                                    }
                                                }, [
                                                    m("div.form-row", [
                                                        m("div.form-group.col-md-12.text-center m-0", [
                                                            m('div.bg-secondary', [
                                                                m("label.pd-b-5.pd-t-5.m-0.tx-white.tx-semibold",
                                                                    "Asignar Encuesta",
                                                                ),

                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),


                                                        ]),

                                                        m("div.form-group.col-md-12.m-0", [
                                                            m('div.bg-litecoin op-9', [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                    "1.- ¿A quién desea asignar esta encuesta?",
                                                                ),

                                                            ]),
                                                            m("div.pd-20.bg-white", [
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.text-justify",
                                                                    "- Seleccione el Grupo:",
                                                                ),
                                                                m("select.custom-select.mg-b-5", {
                                                                    value: (this.grupo !== null ? this.grupo : ''),
                                                                    onchange: (e) => {
                                                                        this.grupo = e.target.value;
                                                                        this.groupName = e.target.options[e.target.options.selectedIndex].dataset.gn;
                                                                        this.usrAsignado = null;
                                                                        this.fetchUsuarios();
                                                                    }
                                                                }, [
                                                                    m("option[value='']", {
                                                                        oncreate: (el) => {
                                                                            el.dom.selected = true;
                                                                        }
                                                                    },
                                                                        "Seleccione..."
                                                                    ),
                                                                    m("option[data-gn='PB'][value='b74c79e1-ae1c-43a4-a901-b6f582901244']",
                                                                        "HM-Grp-Encargadas-PB"
                                                                    ),
                                                                    m("option[data-gn='H1'][value='cf113897-f369-4a8d-a5d0-b721b0026f93']",
                                                                        "HM-Grp-Encargadas-H1"
                                                                    ),
                                                                    m("option[data-gn='H2'][value='c0f727ae-54b1-47c4-9371-99fdbb367283']",
                                                                        "HM-Grp-Encargadas-H2"
                                                                    ),
                                                                    m("option[data-gn='C2'][value='77617330-eee8-4fb2-9532-7f3e7519c78f']",
                                                                        "HM-Grp-Encargadas-C2"
                                                                    ),
                                                                    m("option[data-gn='COVID'][value='d5cb5f59-dcca-44a6-96fe-b4588b21abaa']",
                                                                        "HM-Grp-Encargadas-COVID"
                                                                    )
                                                                ]),
                                                                m("label.pd-l-10.pd-t-10.pd-r-10.text-justify", {
                                                                    class: (this.usuarios !== null ? '' : 'd-none'),


                                                                },
                                                                    "- Seleccione el Usuario:",
                                                                ),
                                                                m("select.custom-select.mg-b-5", {
                                                                    class: (this.usuarios !== null ? '' : 'd-none'),
                                                                    onchange: (e) => {

                                                                        this.usrAsignado = {
                                                                            nhc: this.idPasaporte,
                                                                            groupName: this.groupName,
                                                                            grupoId: this.grupo,
                                                                            idUsr: e.target.options[e.target.options.selectedIndex].id,
                                                                            displayName: e.target.options[e.target.options.selectedIndex].dataset.usr,
                                                                        };


                                                                    }
                                                                }, [

                                                                    (this.usuarios !== null ? [
                                                                        m("option[value='']", {
                                                                            oncreate: (el) => {
                                                                                el.dom.selected = true;
                                                                            }
                                                                        },
                                                                            "Seleccione..."
                                                                        ),
                                                                        this.usuarios.map(x =>
                                                                            m('option', {
                                                                                'id': x.id,
                                                                                'value': x.id,
                                                                                'data-usr': x.displayName,
                                                                            }, x.displayName)
                                                                        )
                                                                    ] : [])
                                                                ]),

                                                            ]),
                                                            m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                        ]),

                                                    ]),
                                                    m("div.form-group.pd-25.bg-white",
                                                        m("button.btn.btn-primary.btn-xs.btn-block.tx-semibold[type='submit']",
                                                            "Asignar"
                                                        )
                                                    ),





                                                ]),

                                            ]),

                                            m(".tab-pane.fade[id='ver'][role='tabpanel'][aria-labelledby='home-ver']", [
                                                (this.dataPasaporte !== null && this.dataPasaporte.STATUS == 2 ? [
                                                    m("form", [
                                                        m("div.form-row", [
                                                            m("div.form-group.col-md-12.text-center m-0", [
                                                                m('div.bg-secondary', [
                                                                    m("label.pd-b-5.pd-t-5.m-0.tx-white.tx-semibold",
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
                                                                    this.dataPasaporte.ENCUESTA.rq1
                                                                ]),
                                                                m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                            ]),
                                                            m("div.form-group.col-md-12.m-0", [
                                                                m('div.bg-litecoin op-9', [
                                                                    m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                        "2.- ¿Qué tan importante es para usted la hora a la que se despierta en la mañana?",
                                                                    ),

                                                                ]),
                                                                m("div.pd-20.bg-white", [
                                                                    this.dataPasaporte.ENCUESTA.rq2

                                                                ]),
                                                                m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                            ]),
                                                            m("div.form-group.col-md-12.m-0", [
                                                                m('div.bg-litecoin op-9', [
                                                                    m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                        "3.- ¿Qué tan importante es para usted la hora a la que toma un baño?",
                                                                    ),

                                                                ]),
                                                                m("div.pd-20.bg-white", [
                                                                    this.dataPasaporte.ENCUESTA.rq3

                                                                ]),
                                                                m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                            ]),
                                                            m("div.form-group.col-md-12.m-0", [
                                                                m('div.bg-litecoin op-9', [
                                                                    m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                        "4.- ¿Qué tan importante es para usted el cuidado diario de su cabello?",
                                                                    ),

                                                                ]),
                                                                m("div.pd-20.bg-white", [
                                                                    this.dataPasaporte.ENCUESTA.rq4

                                                                ]),
                                                                m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                            ]),
                                                            m("div.form-group.col-md-12.m-0", [
                                                                m('div.bg-litecoin op-9', [
                                                                    m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                        "5.- ¿Qué tan importante es para usted la hora en la que duerme en la noche?",
                                                                    ),

                                                                ]),
                                                                m("div.pd-20.bg-white", [
                                                                    this.dataPasaporte.ENCUESTA.rq5

                                                                ]),
                                                                m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                            ]),
                                                            m("div.form-group.col-md-12.m-0", [
                                                                m('div.bg-litecoin op-9', [
                                                                    m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                        "6.- ¿Qué tan importante es para usted poder escoger su comida?",
                                                                    ),

                                                                ]),
                                                                m("div.pd-20.bg-white", [
                                                                    this.dataPasaporte.ENCUESTA.rq6

                                                                ]),
                                                                m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                            ]),
                                                            m("div.form-group.col-md-12.m-0", [
                                                                m('div.bg-litecoin op-9', [
                                                                    m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                        "7.- ¿Qué tan importante es para usted salir al aire libre cuando el clima es adecuado?",
                                                                    ),

                                                                ]),
                                                                m("div.pd-20.bg-white", [
                                                                    this.dataPasaporte.ENCUESTA.rq7

                                                                ]),
                                                                m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                            ]),
                                                            m("div.form-group.col-md-12.m-0", [
                                                                m('div.bg-litecoin op-9', [
                                                                    m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                        "8.- ¿Usted tiene mascotas? En caso afirmativo, ¿qué tan importante es para usted estar cerca de sus mascotas?",
                                                                    ),

                                                                ]),
                                                                m("div.pd-20.bg-white", [
                                                                    this.dataPasaporte.ENCUESTA.rq8

                                                                ]),
                                                                m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                            ]),
                                                            m("div.form-group.col-md-12.m-0", [
                                                                m('div.bg-litecoin op-9', [
                                                                    m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                        "9.- ¿Qué tan importante es para usted tener libros/revistas a su disposición para leer?",
                                                                    ),

                                                                ]),
                                                                m("div.pd-20.bg-white", [
                                                                    this.dataPasaporte.ENCUESTA.rq9

                                                                ]),
                                                                m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                            ]),
                                                            m("div.form-group.col-md-12.m-0", [
                                                                m('div.bg-litecoin op-9', [
                                                                    m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                        " 10.- ¿Estaría de acuerdo en interactuar con el personal de salud en la entrega recepción de turno?",
                                                                    ),

                                                                ]),
                                                                m("div.pd-20.bg-white", [
                                                                    this.dataPasaporte.ENCUESTA.rq10

                                                                ]),
                                                                m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                            ]),
                                                            m("div.form-group.col-md-12.m-0", [
                                                                m('div.bg-litecoin op-9', [
                                                                    m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                        "11.- ¿Desea restringir totalmente sus vistas?",
                                                                    ),

                                                                ]),
                                                                m("div.pd-20.bg-white", [
                                                                    this.dataPasaporte.ENCUESTA.rq11

                                                                ]),
                                                                m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                            ]),

                                                            m("div.form-group.col-md-12.m-0", [
                                                                m('div.bg-litecoin op-9', [
                                                                    m("label.pd-l-10.pd-t-10.pd-r-10.tx-white.text-justify",
                                                                        "12.- ¿Durante su hospitalización y cuidados posteriores a la alta médica, usted desearía que capaciten a una persona de su confianza para que le brinde un cuidado y acompañamiento pertinente?",
                                                                    ),

                                                                ]),
                                                                m("div.pd-20.bg-white", [
                                                                    this.dataPasaporte.ENCUESTA.rq12

                                                                ]),
                                                                m("hr.wd-100p.mg-t-5.mg-b-5"),
                                                            ]),


                                                        ]),



                                                    ]),
                                                ] : [])

                                            ]),

                                        ])
                                    ),


                                ])


                            ])
                        ])
                    ] : [
                        m(Loader)
                    ]),





                ])
            ),
        ];
    }

    fetchUsuarios() {

        let _this = this;

        _this.formLoader = !_this.formLoader;

        return m.request({
            method: "POST",
            url: "https://prod-86.westus.logic.azure.com:443/workflows/6ae81d0303a0473cac689c25bb466253/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mG7JHMfylqEd193lR_ROizpE6E--wTLs7VbFGbf7BYY",
            body: {
                grupo: _this.grupo
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {
                _this.formLoader = !_this.formLoader;
                _this.usuarios = result.value;

            })
            .catch(function (e) {
                return {
                    'status': null,
                    'message': e
                };
            });

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

    fetchAsignar() {

        let _this = this;

        _this.formLoader = true;

        return m.request({
            method: "POST",
            url: ApiHTTP.apiUrl + "/v2/pacientes/nueva-asignacion",
            body: {
                usr: _this.usrAsignado,
                pte: _this.dataPasaporte
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': localStorage.getItem('userToken')
            },
        })
            .then(function (result) {
                if (result.status) {
                    _this.formLoader = false;
                    window.location.reload();
                } else {
                    alert(result.message)
                }
            })
            .catch(function (e) {
                return {
                    'status': null,
                    'message': e
                };
            });

    }

    fetchGenerarPasaporte(encuesta) {

        let _this = this;

        _this.formLoader = true;

        return m.request({
            method: "POST",
            url: ApiHTTP.apiUrl + "/v2/pacientes/nuevo-pasaporte",
            body: {
                encuesta: encuesta,
                pte: _this.dataPasaporte
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': localStorage.getItem('userToken')
            },
        })
            .then(function (result) {
                if (result.status) {
                    _this.formLoader = false;
                    window.location.reload();
                } else {
                    alert(result.message)
                }
            })
            .catch(function (e) {
                return {
                    'status': null,
                    'message': e
                };
            });

    }

    fetchAsignado() {

        let _this = this;

        return m.request({
            method: "GET",
            url: ApiHTTP.apiUrl + "/v2/pacientes/historial-asignaciones?nhc=" + _this.idPasaporte,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': localStorage.getItem('userToken')
            },
        })
            .then(function (result) {
                if (result.status) {
                    _this.usrAsignado = result.data;
                }

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