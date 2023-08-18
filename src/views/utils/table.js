import m from "mithril";

class Table {
    idTable = '';
    dataTable = [];
    constructor(_data) {
        this.idTable = _data.attrs.idTable;
        this.dataTable = _data.attrs.dataTable;
    }
    oncreate() {
        $.fn.dataTable.ext.errMode = "none";
        let table = $("#" + this.idTable).DataTable({
            data: this.dataTable,
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
            columns: false,
            aoColumnDefs: [{
                mRender: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: false,
                aTargets: [0],
                orderable: true,
            },
            {
                mRender: function (data, type, full) {
                    return full.AT_MV;
                },
                visible: false,
                aTargets: [1],
                orderable: false,

            },
            {
                mRender: function (data, type, full) {
                    return full.CD_PACIENTE;

                },
                visible: false,
                aTargets: [2],
                orderable: false,

            }, {
                mRender: function (data, type, full) {
                    return full.NM_PACIENTE;

                },
                visible: false,
                aTargets: [3],
                orderable: false,

            }, {
                mRender: function (data, type, full) {
                    return full.MED_MV;

                },
                visible: false,
                aTargets: [4],
                orderable: false,

            }, {
                mRender: function (data, type, full) {
                    return "";

                },
                visible: true,
                aTargets: [5],
                orderable: false,

            },

            ],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                m.mount(nRow, {
                    oninit: function () {


                    },
                    view: () => {


                        return [
                            m("div.d-flex", {
                                /* oncreate: function() {
                                    formularioModelo.cargarListado(_i._aData.CD_PRE_MED);
                                }, */
                            }, [
                                m("div.pd-0.flex-grow-1",
                                    m("div.pd-2", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                        m('i.fas.fa-file-alt.tx-semibold.tx-15.pd-2.mg-r-5'),
                                        m('.d-inline.tx-15.mg-r-5', aData.CD_PRE_MED),
                                        m('i.fas.fa-hospital.tx-semibold.tx-12.pd-2'),
                                        m('.tx-semibold.d-inline.tx-12', " SECTOR: "),
                                        m('.d-inline.tx-12.mg-r-5', (aData.SECTOR !== null ? aData.SECTOR + " " + aData.UBICACION : 'No Disponible')),
                                        m('i.fas.fa-user-md.tx-semibold.tx-12.pd-2'),
                                        m('.tx-semibold.d-inline.tx-12', " MED: "),
                                        aData.MED_MV
                                    ),
                                ),
                                m("div.pd-2.tx-medium.mg-l-auto", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                    (aData.EDAD !== null ? aData.EDAD : '') + (aData.PESO !== null ? " - " + aData.PESO : '') + (aData.ALTURA !== null ? " - " + aData.ALTURA : '')
                                )
                            ]),
                            m("div.d-flex.mg-b-20", { "style": { "background-color": "rgb(234, 239, 245)" } }, [
                                m("div.pd-0.flex-grow-1",
                                    m("td.wd-1p.tx-white", { "style": { "background-color": (aData.SECTOR == 'EMERGENCIA' ? "#f10075" : "#0168fa") } },
                                        (aData.SECTOR == 'EMERGENCIA' ? "E" : "H")
                                    ),
                                    m("td.tx-10.tx-semibold", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                        "FECHA:"
                                    ),

                                    m("td", { "style": { "background-color": "rgb(234, 239, 245)" } },
                                        aData.FECHA_PEDIDO + " " + aData.HORA_PEDIDO
                                    ),
                                    m("td", { class: (aData.STS !== 0 ? 'bg-success' : 'bg-warning') },
                                        (aData.STS !== 0 ? 'En Revisión' : 'Sin Revisión')
                                    ),
                                    m("td.tx-10.tx-semibold", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                        "NHC:"
                                    ),
                                    m("td", { "style": { "background-color": "rgb(234, 239, 245)" } },
                                        aData.CD_PACIENTE
                                    ),
                                    m("td.tx-10.tx-semibold", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                        "N° AT.: "
                                    ),
                                    m("td", { "style": { "background-color": "rgb(234, 239, 245)" } },
                                        aData.AT_MV
                                    ),

                                    m("td.tx-10.tx-semibold", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                        "PTE: "
                                    ),
                                    m("td", { "style": { "background-color": "rgb(234, 239, 245)" } },
                                        aData.NM_PACIENTE
                                    ),
                                    // m("td.tx-10.tx-semibold", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                    //     "Estado: "
                                    // ),
                                    // m("td", { "style": { "background-color": "rgb(234, 239, 245)" } },
                                    // (formularioModelo.idRespuesta == aData.CD_PRE_MED ? "En Proceso" : "Pendiente"
                                    // /* && formularioModelo.listado.length > 0 */ )
                                    // ),
                                    /*m("td", { "style": { "background-color": "rgb(234, 239, 245)" } },
                                        formularioModelo.listado.length > 0 ? "En Proceso" : "Pendiente",
                                        
                                    ), */

                                    /* m.mount('p', {
                                        view: function() {
                                            return [
                                                m(EstadoTotal, { id: aData.CD_PRE_MED }),
                                            ]
                                        }
                                    }) */




                                ),

                                m("div.pd-0.mg-l-auto", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                    m("td.tx-10", {
                                        "style": { "background-color": "rgb(168, 190, 214)", "cursor": "pointer" },
                                    },

                                        m(m.route.Link, {
                                            class: "tx-dark",
                                            href: "/terapia-respiratoria/pedido/",
                                            target: "_blank",
                                            params: {
                                                numeroHistoriaClinica: aData.CD_PACIENTE,
                                                numeroAtencion: aData.AT_MV,
                                                numeroPedido: aData.CD_PRE_MED,
                                                track: "view",
                                            }
                                        }, m(".tx-normal",
                                            m("i.fas.fa-file-alt.pd-1.mg-r-2"),

                                            "Ver Pedido"
                                        ))



                                    ),
                                )
                            ]),


                        ]

                    },
                });
            },
        });

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity
        });

        $('#searchField').keyup(function (e) {

            table.search($('#searchField').val()).draw();
        });

        return table;
    }
    view() {
        if (this.dataTable.length !== 0) {
            return m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [
                m("table.table.table-sm.tx-11[width='100%']", {
                    id: this.idTable

                })
            ]);
        }

    }
}


export default Table;