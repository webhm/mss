import m from "mithril";
import App from "../../../models/App";
import HeaderPrivate from "../../layout/headerPrivate";
import SidebarAdmin from "../sidebarAdmin";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import Table from "../../utils/table";
import { Stopwatch } from "../../utils/stopWatch";

// Administración MV

class usrMPLUS extends App {
    usuarios = null;
    idFiltro = 3;
    constructor(_data) {
        super();
        this.title = "Usuarios MetroPlus";
        this.isAuthenticated();
        if (this.hasProfile('ADM_USUARIOS_METROPLUS')) {
            this.view = this.page;
        }
    }

    oncreate(_data) {
        if (_data.attrs.idFiltro !== undefined) {
            this.idFiltro = _data.attrs.idFiltro;
        }
        this.fetchData().then((_data) => {
            this.usuarios = _data;
        });
    }

    vHeader() {
        return m(HeaderPrivate, { userName: this.userName });
    }
    vMain() {
        return [
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/", }, [
                                "MetroPlus"
                            ]),
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/administracion", }, [
                                'Administración'
                            ]),
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            this.title
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        this.title + ":"
                    ),
                    m("div.table-content.col-12.pd-r-0.pd-l-0", [
                        m("div.d-flex.align-items-center.justify-content-between.mg-t-10", [
                            m("h5.mg-b-0",
                                "Todos los Usuarios:",
                                m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                    oncreate: (el) => {
                                        if (this.idFiltro == 1) {
                                            el.dom.innerHTML = 'Grp-radius-Medicos';
                                        }
                                        if (this.idFiltro == 2) {
                                            el.dom.innerHTML = 'Grp-radius-Residentes';
                                        }
                                    },
                                    onupdate: (el) => {
                                        if (this.idFiltro == 1) {
                                            el.dom.innerHTML = 'Grp-radius-Medicos';
                                        }
                                        if (this.idFiltro == 2) {
                                            el.dom.innerHTML = 'Grp-radius-Residentes';
                                        }
                                    }
                                }

                                )

                            )

                        ]),

                    ]),

                    m("div", [
                        (this.usuarios !== null && this.usuarios.status) ? [
                            this.vTableUsuarios('table-usr', this.usuarios.data, this.arqTable())
                        ] : (this.usuarios !== null && (!this.usuarios.status || this.usuarios.status == null)) ? [
                            m(Errors, { type: (!this.usuarios.status ? 1 : 0), error: this.usuarios })
                        ] : [
                            m(Loader)
                        ]
                    ]),

                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    this.title + ":"
                ),
                m("div.mg-t-10.bg-white", {

                },

                    m("div.mg-t-10.bg-white",
                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                "N° de Resultados:"
                            ),

                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h2.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    (this.usuarios !== null ? this.usuarios.data.length : 0)
                                ),
                                m("div.tx-14", [
                                    m("divv.lh-0.tx-gray-300", 'Resultado(s)')
                                ])
                            ]),

                        ])
                    ),
                    m("div.pd-20", [
                        m(Stopwatch)
                    ])
                ),

            ])
        ];
    }
    vMenu() {
        return m(SidebarAdmin, { page: 'administracion/metroplus' });
    }

    reloadData(idFiltro) {
        this.usuarios = null;
        this.idFiltro = idFiltro;
    }


    fetchData() {

        let _queryString = '?idFiltro=' + this.idFiltro;

        return m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/v2/medicos/auth2" + _queryString,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
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

    arqTable() {
        return {
            data: null,
            dom: 'ltp',
            language: {
                searchPlaceholder: "Buscar...",
                sSearch: "",
                lengthMenu: "Mostrar _MENU_ registros por página",
                sProcessing: "Procesando...",
                sZeroRecords: "Todavía no tienes resultados disponibles.",
                sEmptyTable: "Ningún dato disponible en esta tabla",
                sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
                sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                sInfoPostFix: "",
                sUrl: "",
                sInfoThousands: ",",
                sLoadingRecords: "Cargando...",
                oPaginate: {
                    sFirst: "Primero",
                    sLast: "Último",
                    sNext: "Siguiente",
                    sPrevious: "Anterior",
                },
                oAria: {
                    sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sSortDescending: ": Activar para ordenar la columna de manera descendente",
                },
            },
            cache: false,
            destroy: true,
            columns: [{
                title: "N° : ",
            },
            {
                title: "Usuario AD:",
            },
            {
                title: "Nombres:",
            },
            {
                title: "Apellidos:",
            },
            {
                title: "E-mail:",
            },
            {
                title: "Fecha Creación:",
            },
            {
                title: "Última Actualización:",
            },
            {
                title: "Cambio Contraseña:",
            },
            {
                title: "Último Acceso:",
            }
            ],
            aoColumnDefs: [{
                mRender: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: true,
                aTargets: [0],
                orderable: true,
            },
            {
                mRender: function (data, type, full) {
                    return full.samaccountname;
                },
                visible: true,
                aTargets: [1],
                orderable: true,

            },
            {
                mRender: function (data, type, full) {
                    return full.sn;

                },
                visible: true,
                aTargets: [2],
                orderable: true,

            }, {
                mRender: function (data, type, full) {
                    return full.cn;

                },
                visible: true,
                aTargets: [3],
                orderable: true,

            }, {
                mRender: function (data, type, full) {
                    return full.mail;

                },
                visible: true,
                aTargets: [4],
                orderable: true,

            }, {
                mRender: function (data, type, full) {
                    return full.whencreated

                },
                visible: true,
                aTargets: [5],
                orderable: true,

            }, {
                mRender: function (data, type, full) {
                    return full.whenchanged

                },
                visible: true,
                aTargets: [6],
                orderable: true,

            },
            {
                mRender: function (data, type, full) {
                    return full.pwdlastset

                },
                visible: true,
                aTargets: [7],
                orderable: true,

            },
            {
                mRender: function (data, type, full) {
                    return full.lastlogontimestamp

                },
                visible: true,
                aTargets: [8],
                orderable: true,

            }


            ],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {


            },
        };
    }

    vTableUsuarios(idTable, dataTable, arqTable) {
        return [
            m(Table, { idTable: idTable, dataTable: dataTable, arqTable: arqTable })
        ]
    }
    page() {
        return [
            this.vHeader(),
            this.vMenu(),
            this.vMain()
        ];
    }

}

export default usrMPLUS;