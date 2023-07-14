import m from "mithril";
import App from "../../models/App";
import HeaderPublic from "../layout/headerPublic";
import P2PMessage from "../../models/P2PMessage"



class Reloj {
    constructor(id) {
        // Guardar el elemento div en una propiedad de la clase
        this.div = document.getElementById(id);
        // Iniciar el intervalo que actualiza el reloj cada segundo
        this.intervalo = setInterval(() => this.actualizar(), 1000);
    }

    // El método actualizar obtiene la hora actual y la muestra en el div
    actualizar() {
        // Obtener la hora, los minutos y los segundos
        let hora = new Date().getHours();
        let minutos = new Date().getMinutes();
        let segundos = new Date().getSeconds();
        // Añadir un cero delante si son menores de 10
        if (hora < 10) hora = "0" + hora;
        if (minutos < 10) minutos = "0" + minutos;
        if (segundos < 10) segundos = "0" + segundos;
        // Formar el texto del reloj con el formato hh:mm:ss
        let texto = hora + ":" + minutos + ":" + segundos;
        // Mostrar el texto en el div
        this.div.textContent = texto;
    }

    // El método detener limpia el intervalo y detiene el reloj
    detener() {
        clearInterval(this.intervalo);
    }
}


class MenuFlebot {


    view() {

        return [
            m("div.content.content-components",
                m("div.container", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                "MetroPlus"
                            ])
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Laboratorio"
                        )
                    ]),
                    m("div.d-flex",
                        [
                            m("div.flex-grow-1",
                                m("h1.df-title.mg-t-20.mg-b-10", [
                                    "Laboratorio: ",
                                    m('span.tx-40.badge.bg-litecoin.pd-10.tx-white.mg-r-10', 'Toma 1'),
                                    m("i", {
                                        title: " Editar ",
                                        class: "fas fa-edit tx-40 tx-light"
                                    })

                                ],

                                ),
                            ),

                            m("div.d-flex.mg-l-auto",

                                m("div[id='reloj'].df-title.mg-t-20.mg-b-10", {
                                    oncreate: () => {
                                        return new Reloj("reloj");
                                    }
                                }),
                                m("i", {
                                    title: " Editar ",
                                    class: "fas fa-clock mg-l-4 mg-t-30 tx-32 tx-light"
                                }),
                            )
                        ]
                    ),

                    m('div.d.flex', [
                        m("fieldset.form-fieldset",
                            [
                                m("legend",
                                    "Personal Information"
                                ),
                                m("div",
                                    [
                                        m("div.form-check.tx-20",
                                            [
                                                m("input.form-check-input[type='radio'][name='flexRadioDefault'][id='flexRadioDefault1']"),
                                                m("label.form-check-label[for='flexRadioDefault1']",
                                                    " Default radio "
                                                )
                                            ]
                                        ),
                                        m("div.form-check",
                                            [
                                                m("input.form-check-input[type='radio'][name='flexRadioDefault'][id='flexRadioDefault2'][checked]"),
                                                m("label.form-check-label[for='flexRadioDefault2']",
                                                    " Default checked radio "
                                                )
                                            ]
                                        )
                                    ]
                                ),
                                m("div.form-group",
                                    [
                                        m("label.d-block",
                                            "MY Id"
                                        ),
                                        m("input.form-control[type='text'][placeholder='Enter your firstname']", {
                                            oncreate(el) {
                                                // Crear una instancia de la clase Chat, pasando una función que muestra el id del dispositivo en la consola
                                                Flebotomista.peer = new P2PMessage((id) => {
                                                    el.dom.value = id;
                                                });



                                            }
                                        })
                                    ]
                                ),
                                m("div.form-group",
                                    [
                                        m("label.d-block",
                                            "Otro Dispositivo"
                                        ),
                                        m("input.form-control[type='text'][placeholder='Enter your lastname']", {
                                            oninput: (el) => {
                                                Flebotomista.otherPeer = el.target.value;
                                            },
                                        })
                                    ]
                                ),
                                m("div.form-group",
                                    [
                                        m("label.d-block",
                                            "Mensaje"
                                        ),
                                        m("input.form-control[type='text']", {
                                            oninput: (el) => {
                                                Flebotomista.peerMessage = el.target.value;
                                            },

                                        }),

                                    ]
                                ),
                                m("div.form-group",
                                    [

                                        m("button.btn.btn-primary.mg-r-2", {
                                            onclick: () => {
                                                Flebotomista.peer.connectTo(Flebotomista.otherPeer);

                                            }
                                        },
                                            "Conectar Dispositivo"
                                        ),
                                        m("button.btn.btn-primary.mg-r-2", {
                                            onclick: () => {
                                                Flebotomista.peer.sendMessage(Flebotomista.peerMessage);

                                            }
                                        },
                                            "Enviar Mensaje"
                                        )
                                    ]
                                )
                            ]
                        )
                    ]),


                    m("div.row.mg-t-20", [

                        m("li", {
                            "class": "list-item bg-success wd-100p",
                            "style": { "cursor": "pointer" },
                            onclick: () => {
                                m.route.set("/laboratorio/flebotomista")
                            }
                        }, [
                            m("div", { "class": "media" }, [
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                    m("i", { "class": "fas fa-flask tx-30 tx-white" })
                                ),
                                m("div", { "class": "media-body mg-l-15" }, [

                                    m("p", { "class": "tx-40 mg-b-0 tx-white" },
                                        "Turnos Pendientes",
                                    ),

                                ])
                            ]),

                        ]),
                        m("li", {
                            "class": "list-item bg-white wd-100p",
                            "style": { "cursor": "pointer" },
                            onclick: () => {
                                m.route.set("/laboratorio/formularios")
                            }
                        }, [
                            m("div", { "class": "media" }, [
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                    m("i", { "class": "fas fa-file-alt tx-30 tx-white" })
                                ),
                                m("div", { "class": "media-body mg-l-15" }, [
                                    m("p", { "class": "tx-40 mg-b-0" },
                                        "Turnos Gestionados",
                                    )
                                ])
                            ]),

                        ]),

                        m("li", {
                            "class": "list-item bg-white wd-100p",
                            "style": { "cursor": "pointer" },
                            onclick: () => {
                                m.route.set("/laboratorio/lisa/pedidos/ingresados")
                            }
                        }, [
                            m("div", { "class": "media" }, [
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                    m("i", { "class": "fas fa-user tx-30 tx-white" })
                                ),
                                m("div", { "class": "media-body mg-l-15" }, [
                                    m("p", { "class": "tx-40 mg-b-0" },
                                        "Usuario: mchang",
                                    )
                                ])
                            ]),

                        ])






                    ]),

                ])
            ),

        ]

    }
}


// class Flebotomista extends App {
class Flebotomista extends App {

    peer;
    otherPeer;
    peerMessage;

    constructor() {
        super();
        this.title = "Inicio";
        this.getMenu().then(() => {
            this.view = this.page;
            m.redraw();
            console.log(1, this);

        });
    }



    getMenu() {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve("hello");
                // las para router
            }, 10);
        });
    }

    vHeader() {
        return m(HeaderPublic);
    }



    vMain() {
        return [
            m(MenuFlebot),



        ];
    }

    page() {
        return [this.vHeader(), this.vMain()];
    }
}

export default Flebotomista;