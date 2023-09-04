import m from "mithril";
import App from "../../../models/App";
import HeaderPublic from "../../layout/headerPublic";
import P2PMessage from "../../../models/P2PMessage";

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
            m(
                "div.content.content-components",
                m(
                    "div.container", {
                    style: { "max-width": "100%" },
                }, [

                    m("div.d-flex", [
                        m(
                            "div.flex-grow-1",
                            m("h1.df-title.mg-t-20.mg-b-10", [
                                "Laboratorio: ",
                                m(
                                    "span.tx-40.badge.bg-litecoin.pd-10.tx-white.mg-r-10",
                                    Flebotomista.idToma
                                ),
                                m("i", {
                                    title: " Editar ",
                                    class: "fas fa-edit tx-40 tx-light",
                                    style: "cursor:pointer",
                                    onclick: () => {
                                        Flebotomista.showConfigToma = !Flebotomista.showConfigToma;
                                    },
                                }),
                            ])
                        ),

                        m(
                            "div.d-flex.mg-l-auto",

                            m("div[id='reloj'].df-title.mg-t-20.mg-b-10", {
                                oncreate: () => {
                                    return new Reloj("reloj");
                                },
                            }),
                            m("i", {
                                title: " Editar ",
                                class: "fas fa-clock mg-l-4 mg-t-30 tx-32 tx-light",
                            })
                        ),
                    ]),

                    m(
                        "div.mg-t-20.d.flex", {
                        class: Flebotomista.showConfigToma == undefined ||
                            Flebotomista.showConfigToma == false ?
                            "d-none" : "",
                    }, [
                        m("fieldset.form-fieldset", [
                            m("legend.pd-2", "MODIFICAR TOMA:"),
                            m("div.tx-30", [
                                m("div.custom-control.custom-radio", [
                                    m(
                                        "input.custom-control-input[type='radio'][id='customRadio1'][name='customRadio']", {
                                        checked: Flebotomista.idToma == "TOMA1" ? true : false,
                                        onchange: (event) => {
                                            if (Flebotomista.isConnect) {
                                                Flebotomista.peer.peer.destroy();
                                                Flebotomista.isConnect = !Flebotomista.isConnect;
                                            }
                                            Flebotomista.idToma = "TOMA1";
                                            localStorage.setItem("peerId", Flebotomista.idToma);
                                            Flebotomista.peer = new P2PMessage((id) => {
                                                Flebotomista.isConnect = !Flebotomista.isConnect;
                                                console.log("cc =>", id);
                                            });
                                        },
                                    }
                                    ),
                                    m(
                                        "label.custom-control-label[for='customRadio1']",
                                        "TOMA 1"
                                    ),
                                ]),
                                m("div.custom-control.custom-radio", [
                                    m(
                                        "input.custom-control-input[type='radio'][id='customRadio2'][name='customRadio']", {
                                        checked: Flebotomista.idToma == "TOMA2" ? true : false,
                                        onchange: (event) => {
                                            if (Flebotomista.isConnect) {
                                                Flebotomista.peer.peer.destroy();
                                                Flebotomista.isConnect = !Flebotomista.isConnect;
                                            }
                                            Flebotomista.idToma = "TOMA2";
                                            localStorage.setItem("peerId", Flebotomista.idToma);
                                            Flebotomista.peer = new P2PMessage((id) => {
                                                Flebotomista.isConnect = !Flebotomista.isConnect;
                                                console.log("cc =>", id);
                                            });
                                        },
                                    }
                                    ),
                                    m(
                                        "label.custom-control-label[for='customRadio2']",
                                        "TOMA  2"
                                    ),
                                ]),
                                m("div.custom-control.custom-radio", [
                                    m(
                                        "input.custom-control-input[type='radio'][id='customRadio3'][name='customRadio']", {
                                        checked: Flebotomista.idToma == "TOMA3" ? true : false,
                                        onchange: (event) => {
                                            if (Flebotomista.isConnect) {
                                                Flebotomista.peer.peer.destroy();
                                                Flebotomista.isConnect = !Flebotomista.isConnect;
                                            }
                                            Flebotomista.idToma = "TOMA3";
                                            localStorage.setItem("peerId", Flebotomista.idToma);
                                            Flebotomista.peer = new P2PMessage((id) => {
                                                Flebotomista.isConnect = !Flebotomista.isConnect;
                                                console.log("cc =>", id);
                                            });
                                        },
                                    }
                                    ),
                                    m(
                                        "label.custom-control-label[for='customRadio3']",
                                        "TOMA  3"
                                    ),
                                ]),
                                m("div.custom-control.custom-radio", [
                                    m(
                                        "input.custom-control-input[type='radio'][id='customRadio4'][name='customRadio']", {
                                        checked: Flebotomista.idToma == "TOMA4" ? true : false,
                                        onchange: (event) => {
                                            if (Flebotomista.isConnect) {
                                                Flebotomista.peer.peer.destroy();
                                                Flebotomista.isConnect = !Flebotomista.isConnect;
                                            }
                                            Flebotomista.idToma = "TOMA4";
                                            localStorage.setItem("peerId", Flebotomista.idToma);
                                            Flebotomista.peer = new P2PMessage((id) => {
                                                Flebotomista.isConnect = !Flebotomista.isConnect;
                                                console.log("cc =>", id);
                                            });
                                        },
                                    }
                                    ),
                                    m(
                                        "label.custom-control-label[for='customRadio4']",
                                        "TOMA  4"
                                    ),
                                ]),
                                m("div.custom-control.custom-radio", [
                                    m(
                                        "input.custom-control-input[type='radio'][id='customRadio5'][name='customRadio']", {
                                        checked: Flebotomista.idToma == "TOMA5" ? true : false,
                                        onchange: (event) => {
                                            if (Flebotomista.isConnect) {
                                                Flebotomista.peer.peer.destroy();
                                                Flebotomista.isConnect = !Flebotomista.isConnect;
                                            }
                                            Flebotomista.idToma = "TOMA5";
                                            localStorage.setItem("peerId", Flebotomista.idToma);
                                            Flebotomista.peer = new P2PMessage((id) => {
                                                Flebotomista.isConnect = !Flebotomista.isConnect;
                                                console.log("cc =>", id);
                                            });
                                        },
                                    }
                                    ),
                                    m(
                                        "label.custom-control-label[for='customRadio5']",
                                        "TOMA 5"
                                    ),
                                ]),
                            ]),
                        ]),
                    ]
                    ),

                    m(
                        "div.row.mg-t-20", {
                        class: Flebotomista.showConfigToma == undefined ||
                            Flebotomista.showConfigToma == false ?
                            "" : "d-none",
                    }, [
                        m(
                            "li", {
                            class: "list-item bg-success wd-100p",
                            style: { cursor: "pointer" },
                            onclick: () => {
                                m.route.set("/laboratorio/flebotomista");
                            },
                        }, [
                            m("div", { class: "media" }, [
                                m(
                                    "div.wd-60.tx-center", { class: "pd-10 bg-litecoin" },
                                    m("i", { class: "fas fa-flask tx-30 tx-white" })
                                ),
                                m("div", { class: "media-body mg-l-15" }, [
                                    m(
                                        "p", { class: "tx-40 mg-b-0 tx-white" },
                                        "Pendientes"
                                    ),
                                ]),
                            ]),
                        ]
                        ),
                        m(
                            "li", {
                            class: "list-item bg-white wd-100p",
                            style: { cursor: "pointer" },
                            onclick: () => {
                                m.route.set("/laboratorio/formularios");
                            },
                        }, [
                            m("div", { class: "media" }, [
                                m(
                                    "div.wd-60.tx-center", { class: "pd-10 bg-litecoin" },
                                    m("i", { class: "fas fa-file-alt tx-30 tx-white" })
                                ),
                                m("div", { class: "media-body mg-l-15" }, [
                                    m("p", { class: "tx-40 mg-b-0" }, "Gestionados"),
                                ]),
                            ]),
                        ]
                        ),

                        m(
                            "li", {
                            class: "list-item bg-white wd-100p",
                            style: { cursor: "pointer" },
                            onclick: () => {
                                m.route.set("/laboratorio/lisa/pedidos/ingresados");
                            },
                        }, [
                            m("div", { class: "media  wd-100p" }, [
                                m(
                                    "div.wd-60.tx-center", { class: "pd-10 bg-litecoin" },
                                    m("i", { class: "fas fa-user tx-30 tx-white" })
                                ),
                                m("div", { class: "media-body mg-l-15" }, [
                                    m("button.btn.btn-xs.btn-brand-02.btn-block.tx-semibold.mg-t-1.tx-18", {
                                        class: (localStorage.authTokenFlebotomista !== undefined ? 'd-none' : ''),
                                        onclick: () => {
                                            Flebotomista.autorizar();
                                        },
                                    }, [
                                        m("img.mg-r-2.pd-8[src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB2CAYAAAAdp2cRAAAABHNCSVQICAgIfAhkiAAAAZ5JREFUeJzt17FNHFEYRtE3qxUJkmtw5hBRASKhBMf04cA4cEwLWwfRVgCiA2qw5MCSvc85It0Z6eqc8J/ke7rRLL+/XT+M3e77qDqdflz+fHl4f358+To3WLOa3dYDOA9ho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4QFAIDl6unX/Rjzfush57McXu8+Hd5f/zx/Oa6/ZT37MefnZRk3Ww85lznn8eMvS/bNY/iPzRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2aj9OF4e5/3vcesjZ/Nu/fXTeLfN25SWr+g/+GiEp5JSeMAAAAABJRU5ErkJggg=='][alt='Microsoft'][width='5%'][height='5%']"),
                                        " Autorizar Usuario "
                                    ]),
                                    m('div.tx-40.mg-b-0', {
                                        class: (localStorage.authTokenFlebotomista == undefined ? 'd-none' : ''),
                                    }, [
                                        m('div.d-inline',
                                            "Usuario: " + (localStorage.authTokenFlebotomista !== undefined ? Flebotomista.getUsrToma() : ''),
                                        ),
                                        m("i", {
                                            title: " Editar ",
                                            class: "fas fa-edit tx-40 tx-light mg-l-15",
                                            style: "cursor:pointer",
                                            onclick: () => {
                                                localStorage.removeItem('authTokenFlebotomista');
                                                window.location.reload();
                                                // Flebotomista.showConfigToma = !Flebotomista.showConfigToma;
                                            },
                                        }),
                                    ])
                                ]),
                            ]),
                        ]
                        ),
                    ]
                    ),
                ]
                )
            ),
        ];
    }
}

// class Flebotomista extends App {
class Flebotomista extends App {

    isConnect = false;
    peer = null;
    otherPeer;
    peerMessage;
    showConfigToma = false;
    idToma = "";
    usrToma = "";

    constructor() {
        super();
        App.title = "Flebotomia";
        this.view = this.page;

        /*
       
        this.getConnectRTC()
            .then((success) => {
                console.log(success);
            })
            .catch((error) => {
                alert("Toma ya en uso seleccione otra, por favor.");
                console.log(error);
            });
        this.getMenu().then(() => {
            this.view = this.page;
            m.redraw();
        });
        */
    }

    static autorizar() {
        App.autorizarMSA('Flebotomista');
    }

    static getUsrToma() {
        if (localStorage.authTokenFlebotomista !== undefined) {
            let _usr = JSON.parse(localStorage.authTokenFlebotomista);
            let frg = _usr.usr.split("@");
            let result = frg[0];
            return result;
        } else {
            return '';

        }
    }


    getConnectRTC() {
        return new Promise(function (resolve, reject) {


            Flebotomista.idToma =
                localStorage.getItem("peerId") !== undefined ?
                    localStorage.getItem("peerId") :
                    Flebotomista.idToma;

            Flebotomista.peer = new P2PMessage((id) => {

                Flebotomista.peer.peer.onError((error) => {
                    console.log(' ee ', error)
                });

            });

        });
    }

    vHeader() {
        return m(HeaderPublic);
    }

    vMain() {
        return [m(MenuFlebot)];
    }

    page() {
        return [
            this.vHeader(),
            this.vMain()
        ];
    }
}

export default Flebotomista;