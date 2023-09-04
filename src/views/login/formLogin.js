import m from "mithril";
import App from "../../models/App";

class FormLogin extends App {
    constructor() {
        super();
        App.title = "Inicia Sesión";
    }

    oncreate() {
        // this.loginMSA();
    }

    view() {
        return [
            m(
                "div.content.content-fixed.content-auth",
                m(
                    "div.container.animated.bounceInUp",
                    m(
                        "div.media.align-items-stretch.justify-content-center.ht-100p.pos-relative", [
                        m(
                            "div.mg-t-55.pd-50.media-body.align-items-center.d-none.d-lg-flex", [

                            m("div.card.card-help.mg-2", [
                                m("div.card-body", [
                                    m("div.tx-20.lh-0", {
                                        style: { 'color': "#325a98" }
                                    },
                                        m("i.fas.fa-first-aid")
                                    ),


                                ])

                            ]),

                            m("div.card.card-help.mg-2", [
                                m("div.card-body", [
                                    m("div.tx-20.lh-0", {
                                        style: { 'color': "#325a98" }
                                    },
                                        m("i.fas.fa-user-md")
                                    ),


                                ])

                            ]),
                            m("div.card.card-help.mg-2", [
                                m("div.card-body", [
                                    m("div.tx-20.lh-0", {
                                        style: { 'color': "#325a98" }
                                    },
                                        m("i.fas.fa-file-prescription")
                                    ),


                                ])

                            ]),
                            m("div.card.card-help.mg-2", [
                                m("div.card-body", [
                                    m("div.tx-20.lh-0", {
                                        style: { 'color': "#325a98" }
                                    },
                                        m("i.fas.fa-microscope")
                                    ),


                                ])

                            ]),
                            m("div.card.card-help.mg-2", [
                                m("div.card-body", [
                                    m("div.tx-20.lh-0", {
                                        style: { 'color': "#325a98" }
                                    },
                                        m("i.fas.fa-procedures")
                                    ),


                                ])

                            ]),
                            m("div.card.card-help.mg-2", [
                                m("div.card-body", [
                                    m("div.tx-20.lh-0", {
                                        style: { 'color': "#325a98" }
                                    },
                                        m("i.fas.fa-h-square")
                                    ),


                                ])

                            ]),
                            m("div.card.card-help.mg-2", [
                                m("div.card-body", [
                                    m("div.tx-20.lh-0", {
                                        style: { 'color': "#325a98" }
                                    },
                                        m("i.fas.fa-heartbeat")
                                    ),


                                ])

                            ]),
                            m("div.card.card-help.mg-2", [
                                m("div.card-body", [
                                    m("div.tx-20.lh-0", {
                                        style: { 'color': "#325a98" }
                                    },
                                        m("i.fas.fa-notes-medical")
                                    ),


                                ])

                            ]),
                            m("div.card.card-help.mg-2", [
                                m("div.card-body", [
                                    m("div.tx-20.lh-0", {
                                        style: { 'color': "#325a98" }
                                    },
                                        m("i.fas.fa-hospital")
                                    ),


                                ])

                            ]),





                        ]
                        ),

                        m(
                            "div.sign-wrapper.mg-lg-l-50.mg-xl-l-60.mg-t-10",
                            m("div.wd-100p", [
                                m('br'),
                                m("h3.tx-color-01.mg-t-100", App.name + App.version.substring(0, App.version.length - 2)),
                                m(
                                    "p.tx-color-03.tx-15.mg-t-10.mg-b-10",
                                    "¡Bienvenido! Por favor, inicia sesión para continuar."
                                ),
                                m(".tx-semibold.alert.alert-solid.alert-danger.d-none[role='alert']"),
                                m("div.form-group.d-none", [
                                    m("label", "Usuario:"),
                                    m("input.form-control[type='text'][placeholder='mpaez']", {
                                        //oninput: function (e) { Auth.setUsername(e.target.value) },
                                        //value: Auth.username,
                                    }),
                                ]),
                                m("div.form-group.d-none", [
                                    m("div.d-flex.justify-content-between.mg-b-5", [
                                        m("label.mg-b-0-f", "Contraseña:"),
                                    ]),
                                    m(
                                        "input.form-control[type='password'][placeholder='Contraseña']", {
                                        // oninput: function (e) { Auth.setPassword(e.target.value) },
                                        // value: Auth.password,
                                    }
                                    ),
                                ]),
                                m(
                                    "button.btn.btn-brand-02.btn-block.tx-semibold", {
                                    // disabled: !Auth.canSubmit(),
                                    // onclick: Auth.login
                                    onclick: () => {
                                        App.loginMSA();
                                    },
                                }, [
                                    m("img.mg-r-2[src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB2CAYAAAAdp2cRAAAABHNCSVQICAgIfAhkiAAAAZ5JREFUeJzt17FNHFEYRtE3qxUJkmtw5hBRASKhBMf04cA4cEwLWwfRVgCiA2qw5MCSvc85It0Z6eqc8J/ke7rRLL+/XT+M3e77qDqdflz+fHl4f358+To3WLOa3dYDOA9ho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4QFAIDl6unX/Rjzfush57McXu8+Hd5f/zx/Oa6/ZT37MefnZRk3Ww85lznn8eMvS/bNY/iPzRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2aj9OF4e5/3vcesjZ/Nu/fXTeLfN25SWr+g/+GiEp5JSeMAAAAABJRU5ErkJggg=='][alt='Microsoft'][width='5%'][height='5%']"),
                                    " Ingreso Seguro"
                                ]

                                ),
                                m("div.text-center.tx-gray-500.mg-t-20", App.name + App.version),
                                m(
                                    "div.text-center.tx-gray-500",
                                    "Created by Hospital Metropolitano"
                                ),
                                m("div.ht-80"),
                            ])
                        ),
                    ]
                    )
                )
            ),
        ];
    }
}

export default FormLogin;