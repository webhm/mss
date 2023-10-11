import m from "mithril";
import App from "../../../models/App";
import Sidebar from "./sidebar";
import Loader from "../../utils/loader";
import HeaderCalendar from "../../layout/headerCalendar";
import Errors from "../../utils/errors";

class AlertCalendar {

    view() {

        if (Calendario.typeAlert !== null) {
            return [
                m("div.pos-absolute.t-70.r-10", {
                    style: { "z-index": "999999;" }
                },
                    m(".toast.animated.bounceInRight[role='alert'][aria-live='assertive'][aria-atomic='true'][data-delay='8000']", [
                        m("div.toast-header.tx-white." + Calendario.typeAlert,

                            [
                                m("h6.tx-white.tx-14.mg-b-0.mg-r-auto.",
                                    " Anuncio "
                                ),
                                m("button.ml-2.mb-1.close[type='button'][data-dismiss='toast'][aria-label='Cerrar']",
                                    m("span..tx-white[aria-hidden='true']",
                                        m.trust("&times;")
                                    )
                                )
                            ]
                        ),
                        m("div.toast-body.tx-semibold",
                            Calendario.messageAlert
                        )
                    ])
                )
            ]
        }

    }
}

class OptionSelect {

    view() {
        if (Calendario.calendarios.length !== 0) {
            return Calendario.calendarios.map(function (_v, _i, _contentData) {

                return [

                    m("option.tx-10[value='" + _v.IDCALENDAR + "']", {
                        oncreate: (el) => {

                            if (Calendario.idCalendar.search(_v.IDCALENDAR) != -1) {
                                el.dom.selected = true;
                            }

                        }
                    },

                        _v.CALENDAR
                    ),



                ]

            })
        }


    }
}

class BuscadorItems {
    static searchField = '';
    static data = [];
    static loader = false;
    static loadItems() {

        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-items").DataTable({
            data: BuscadorItems.data,
            dom: 'ltp',
            responsive: true,
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
            order: [
                [2, "Asc"]
            ],
            destroy: true,
            columns: [{
                title: "N°:",
            },
            {
                title: "Código:",
            },
            {
                title: "Item:",
            },

            {
                title: "Duración:",
            },

            {
                title: "Opciones:",
            },


            ],
            aoColumnDefs: [{
                mRender: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: true,
                aTargets: [0],
            },
            {
                mRender: function (data, type, full) {
                    return full.CD_ITEM_AGENDAMENTO;
                },
                visible: true,
                aTargets: [1],

            },
            {
                mRender: function (data, type, full) {
                    return full.DS_ITEM_AGENDAMENTO;
                },
                visible: true,
                aTargets: [2],
            },

            {
                mRender: function (data, type, full) {
                    return '<b class="tx-14 tx-semibold tx-danger">' + full.DURACION + ' Min. </b>';
                },
                visible: true,
                aTargets: [3],
            },

            {
                mRender: function (data, type, full) {
                    return 'OPCIONES';

                },
                visible: true,
                aTargets: [4],
            },


            ],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
            drawCallback: function (settings) {


                settings.aoData.map(function (_i) {

                    m.mount(_i.anCells[4], {
                        view: function () {
                            return [
                                m("button.btn.btn-sm.btn-block.btn-primary[type='button']", {

                                    onclick: () => {


                                        let fecha1 = moment(Cita.data.pn_inicio, 'DD/MM/YYYY HH:mm');
                                        let _duracion = moment(_i._aData.DURACION, 'HH:mm').minutes();
                                        let _suma = fecha1.add(_duracion, 'minutes');

                                        Cita.data.end = moment(_suma).format('dddd, DD-MM-YYYY HH:mm');
                                        Cita.data.pn_fin = moment(_suma).format('DD/MM/YYYY HH:mm');
                                        Cita.data.hashCita = moment(Cita.data.pn_inicio, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm') + '.' + moment(_suma).format('YYYY-MM-DD HH:mm');

                                        Cita.data.codItem = _i._aData.CD_ITEM_AGENDAMENTO;
                                        Cita.data.estudio = _i._aData.DS_ITEM_AGENDAMENTO;
                                        Cita.data.pn_item_agendamento = _i._aData.CD_ITEM_AGENDAMENTO;
                                        Cita.buscarItems = !Cita.buscarItems;
                                        Calendario.validarAgendamiento();
                                    }
                                },
                                    "Seleccionar"
                                )

                            ]


                        }
                    });

                })

            },
        });

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity
        });



        return table;

    }
    static fetchSearch() {

        BuscadorItems.loader = true;
        BuscadorItems.data = [];

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/items",
            body: {
                searchField: BuscadorItems.searchField
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (res) {
                BuscadorItems.loader = false;
                BuscadorItems.data = res.data;
                BuscadorItems.loadItems();
            })
            .catch(function (e) { });

    }
    view() {

        return [
            m("div.mg-t-10.pd-10.wd-100p", {
                class: (BuscadorItems.loader ? '' : 'd-none')
            },
                m("div.placeholder-paragraph", [
                    m("div.line"),
                    m("div.line")
                ])
            ),
            m("div.mg-t-10.pd-10.wd-100p", {
                class: (BuscadorItems.loader ? 'd-none' : '')
            },
                m("table.table.table-sm.tx-11[id='table-items'][width='100%']"),
            )
        ];




    }
}

class BuscadorPacientes {
    static searchField = '';
    static data = [];
    static loader = false;
    static loadPacientes() {

        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-pacientes").DataTable({
            data: BuscadorPacientes.data,
            dom: 'ltp',
            responsive: true,
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
            order: [
                [2, "Asc"]
            ],
            destroy: true,
            columns: [{
                title: "N°:",
            },
            {
                title: "NHC:",
            },
            {
                title: "Paciente:",
            },
            {
                title: "Edad:",
            },
            {
                title: "Sexo:",
            },
            {
                title: "F. Nacimiento:",
            },
            {
                title: "Opciones:",
            },


            ],
            aoColumnDefs: [{
                mRender: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: true,
                aTargets: [0],
            },
            {
                mRender: function (data, type, full) {
                    return full.CD_PACIENTE;
                },
                visible: true,
                aTargets: [1],

            },
            {
                mRender: function (data, type, full) {
                    return full.NM_PACIENTE;
                },
                visible: true,
                aTargets: [2],
                width: '60%'
            },
            {
                mRender: function (data, type, full) {
                    return full.EDAD;
                },
                visible: true,
                aTargets: [3],
            }, {
                mRender: function (data, type, full) {
                    return full.TP_SEXO;

                },
                visible: true,
                aTargets: [4],
            },
            {
                mRender: function (data, type, full) {
                    return full.DT_NASCIMENTO;

                },
                visible: true,
                aTargets: [5],
            },
            {
                mRender: function (data, type, full) {
                    return 'OPCIONES';

                },
                visible: true,
                aTargets: [6],
            },


            ],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
            drawCallback: function (settings) {


                settings.aoData.map(function (_i) {

                    m.mount(_i.anCells[6], {
                        view: function () {

                            return [
                                m("button.btn.btn-sm.btn-block.btn-primary[type='button']", {
                                    onclick: () => {

                                        Cita.data.nhc = _i._aData.CD_PACIENTE;
                                        Cita.data.patientId = _i._aData.CD_PACIENTE;
                                        Cita.data.paciente = _i._aData.NM_PACIENTE;
                                        Cita.data.patientName = _i._aData.NM_PACIENTE;
                                        Cita.data.phoneNumber = '0998785402';
                                        Cita.data.sexType = _i._aData.TP_SEXO;
                                        Cita.data.dateBirth = moment(_i._aData.DT_NASCIMENTO, 'DD-MM-YYYY').format('DD/MM/YYYY');
                                        Cita.data.email = 'mchangcnt@gmail.com';

                                        // Cita HTTP
                                        Cita.data.pn_paciente = Cita.data.nhc;
                                        Cita.data.pc_nm_paciente = Cita.data.patientName;
                                        Cita.data.pc_telefono = Cita.data.phoneNumber;
                                        Cita.data.pc_email = Cita.data.email;
                                        Cita.data.pc_fecha_nacimiento = Cita.data.dateBirth;
                                        Cita.buscarPacientes = !Cita.buscarPacientes;
                                    }
                                },
                                    "Seleccionar"
                                )

                            ]


                        }
                    });

                })

            },
        });

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity
        });



        return table;

    }
    static fetchSearch() {

        BuscadorPacientes.loader = true;
        BuscadorPacientes.data = [];

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/pacientes",
            body: {
                searchField: BuscadorPacientes.searchField
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (res) {
                BuscadorPacientes.loader = false;
                BuscadorPacientes.data = res.data;
                BuscadorPacientes.loadPacientes();
            })
            .catch(function (e) { });

    }
    view() {
        return [
            m("div.mg-t-10.pd-10.wd-100p", {
                class: (BuscadorPacientes.loader ? '' : 'd-none')
            },
                m("div.placeholder-paragraph", [
                    m("div.line"),
                    m("div.line")
                ])
            ),
            m("div.mg-t-10.pd-10.wd-100p", {
                class: (BuscadorPacientes.loader ? 'd-none' : '')
            },
                m("table.table.table-sm.tx-11[id='table-pacientes'][width='100%']"),
            )
        ];

    }
}

// Cita
class Cita {
    static buscarPacientes = false;
    static buscarItems = false;
    static loader = false;
    static data = {};

    static verCita(calEvent) {

        Cita.data.id = calEvent.id;
        Cita.data.hashCita = calEvent.id;
        Cita.data.idCalendar = calEvent.idCalendar;
        Cita.data.start = calEvent.start;
        Cita.data.end = calEvent.end;
        Cita.data.paciente = calEvent.title;
        Cita.data.estudio = calEvent.estudio;
        Cita.data.prestador = calEvent.prestador;
        Cita.data.editable = calEvent.editable;
        Cita.data.comentarios = calEvent.comentarios;

        let modal = $('#modalCalendarEvent');
        modal.modal('show');
        modal.find('.event-title').text(Cita.data.paciente);
        modal.find('.event-start-date').text(moment(calEvent.start).format('LLL'));
        modal.find('.event-end-date').text(moment(calEvent.end).format('LLL'));
        modal.find('.modal-header').css('backgroundColor', (calEvent.borderColor) ? calEvent.borderColor : calEvent.borderColor);

        m.redraw();

    }

    static verUpdate(calEvent) {

        let modal = $('#modalUpdateEvent');
        modal.modal('show');
        modal.find('.modal-header').css('backgroundColor', (calEvent.borderColor) ? calEvent.borderColor : calEvent.borderColor);
        m.redraw();

    }

    static crearCita(startDate, endDate) {
        this.data.hashCita = startDate.format('YYYY-MM-DD HH:mm') + '.' + endDate.format('YYYY-MM-DD HH:mm')
        this.data.start = startDate.format('dddd, DD-MM-YYYY HH:mm');
        this.data.end = endDate.format('dddd, DD-MM-YYYY HH:mm');
        this.data.pn_inicio = startDate.format('DD/MM/YYYY HH:mm');
        this.data.pn_fin = endDate.format('DD/MM/YYYY HH:mm');
        $('#modalCreateEvent').modal('show');
        $('#eventStartDate').val(moment(startDate).format('LLL'));
        $('#eventEndDate').val(moment(endDate).format('LLL'));
        $('#eventStartTime').val(moment(startDate).format('LT')).trigger('change');
        $('#eventEndTime').val(moment(endDate).format('LT')).trigger('change');
        m.redraw();
    }

    static agendarCitaHttp() {

        Cita.loader = true;
        Cita.data.idCalendar = Calendario.idCalendar;
        Cita.data.calendarios = Calendario.calendarios;

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/call",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (res) {
                Cita.loader = false;
                if (res.status) {
                    Cita.agendarCita();
                } else {
                    Calendario.showAlertCalendar('bg-danger', res.message);
                }
            })
            .catch(function (e) {
                Calendario.showAlertCalendar('bg-danger', e);
            });

    }

    static trackReAgendar() {

        Cita.loader = true;

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/reagendar",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (res) {

                Cita.loader = false;


                if (res.status) {
                    Calendario.reloadFetchAgenda();
                    Calendario.showAlertCalendar('bg-primary', 'Ahora puede reagendar este Cita.');
                } else {
                    Calendario.showAlertCalendar('bg-primary', res.message);
                }

            })
            .catch(function (e) {
                Calendario.showAlertCalendar('bg-danger', e);


            });

    }

    static trackCancelReAgendar() {

        Cita.loader = true;

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/reagendar/cancel",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (res) {

                Cita.loader = false;
                if (res.status) {
                    Calendario.reloadFetchAgenda();
                    Calendario.showAlertCalendar('bg-danger', 'El reagendamiento se canceló.');
                } else {
                    Calendario.showAlertCalendar('bg-danger', res.message);
                }

            })
            .catch(function (e) {
                Calendario.showAlertCalendar('bg-danger', e);

            });

    }

    static agendarCita() {

        Cita.loader = true;
        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/nueva",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (res) {
                Cita.loader = false;
                if (res.status) {
                    Calendario.showAlertCalendar('bg-success', res.message);
                    $('#modalCreateEvent').modal('hide');
                    Calendario.reloadFetchAgenda();
                    Cita.data = {};
                } else {
                    Calendario.showAlertCalendar('bg-danger', res.message);
                }

            })
            .catch(function (e) {
                Calendario.showAlertCalendar('bg-danger', e);
            });

    }

    static reAgendarCita() {


        Calendario.validarAgendamiento();

        Cita.loader = true;
        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/update",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (res) {

                Cita.loader = false;

                console.log(res)

                if (res.status) {

                    Calendario.showAlertCalendar('bg-success', res.message);
                    $('#modalUpdateEvent').modal('hide');
                    Calendario.reloadFetchAgenda();

                } else {
                    Calendario.showAlertCalendar('bg-danger', res.message);
                }

            })
            .catch(function (e) {
                Calendario.showAlertCalendar('bg-danger', e);

            });

    }
    static cancelarCita() {

        Cita.loader = true;

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/delete",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (res) {

                Cita.loader = false;

                console.log(res)

                if (res.status) {
                    Calendario.showAlertCalendar('bg-success', res.message);
                    $('#modalCalendarEvent').modal('hide');
                    Calendario.reloadFetchAgenda();
                    Cita.data = {};
                } else {
                    Calendario.showAlertCalendar('bg-danger', res.message);
                }

            })
            .catch(function (e) {
                Calendario.showAlertCalendar('bg-danger', e);
            });

    }


}

// Calendario
class Calendario extends App {

    static loader = false;
    static cita = null;
    static citas = null;
    static idCalendar = null;
    static calendarios = [];
    static typeAlert = null;
    static messageAlert = null;

    constructor() {
        super();
        if (App.isAuthenticated() && App.hasProfile('PERFIL_AG_GEST_ENDOSCOPIA')) {
            App.setTitle("Agenda Centralizada Endoscopía");
            this.view = Calendario.page;
        }

    }


    static vHeader() {
        return m(HeaderCalendar, { userName: App.userName });
    }

    static setSidebar() {




        // Sidebar calendar
        $('#calendarInline').datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            dateFormat: "yy-mm-dd",
            onSelect: function (dateText, inst) {
                console.log(dateText)
                $('#calendar').fullCalendar('gotoDate', dateText);
            },
            beforeShowDay: function (date) {

                // add leading zero to single digit date
                var day = date.getDate();
                console.log(day);

                if (day < 10) {
                    return [
                        true,
                        'zero  tx-danger '
                    ];
                } else {
                    return [
                        true,
                        ' tx-danger'
                    ];
                }



            }
        });





        setTimeout(function () {
            // Initialize scrollbar for sidebar
            new PerfectScrollbar('#calendarSidebarBody', { suppressScrollX: true });
        }, 100);



        $('#calendarSidebarShow').on('click', function (e) {
            e.preventDefault()
            $('body').toggleClass('calendar-sidebar-show');

            $(this).addClass('d-none');
            $('#mainMenuOpen').removeClass('d-none');
        })

        $(document).on('click touchstart', function (e) {
            e.stopPropagation();

            // closing of sidebar menu when clicking outside of it
            if (!$(e.target).closest('.burger-menu').length) {
                var sb = $(e.target).closest('.calendar-sidebar').length;
                if (!sb) {
                    $('body').removeClass('calendar-sidebar-show');
                    $('#mainMenuOpen').addClass('d-none');
                    $('#calendarSidebarShow').removeClass('d-none');
                }
            }
        });

        // Initialize tooltip
        $('[data-toggle="tooltip"]').tooltip();







        //     });
        //   $('.slider').slider();
        //




    }

    static setCalendar() {

        // Initialize fullCalendar
        $('#calendar').fullCalendar({
            height: 'parent',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            },
            navLinks: true,
            selectable: true,
            defaultDate: moment().format('YYYY-MM-DD'),
            selectLongPressDelay: 100,
            nowIndicator: true,
            editable: false,
            defaultView: 'listWeek',
            minTime: '07:00:00',
            maxTime: '17:55:00',
            slotDuration: '00:10:00',
            slotLabelInterval: 10,
            slotLabelFormat: 'HH:mma',
            slotMinutes: 10,
            timeFormat: 'HH:mma',
            views: {
                agenda: {
                    columnHeaderHtml: function (mom) {
                        return '<span>' + mom.format('ddd') + '</span>' +
                            '<span>' + mom.format('DD') + '</span>';
                    }
                },
                day: { columnHeader: false },
                listMonth: {
                    listDayFormat: 'ddd DD',
                    listDayAltFormat: false
                },
                listWeek: {
                    listDayFormat: 'ddd DD',
                    listDayAltFormat: false
                },
                agendaThreeDay: {
                    type: 'agenda',
                    duration: { days: 3 },
                    titleFormat: 'MMMM YYYY'
                }
            },
            eventSources: [Calendario.citas.data],
            eventAfterAllRender: function (view) {
                if (view.name === 'listMonth' || view.name === 'listWeek') {
                    var dates = view.el.find('.fc-list-heading-main');
                    dates.each(function () {
                        var text = $(this).text().split(' ');
                        var now = moment().format('DD');

                        $(this).html(text[0] + '<span>' + text[1] + '</span>');
                        if (now === text[1]) { $(this).addClass('now'); }
                    });
                }

                console.log(view.el);
            },
            eventRender: function (event, element) {

                if (event.description) {
                    element.find('.fc-list-item-title').append('<span class="fc-desc">' + event.description + '</span>');
                    element.find('.fc-content').append('<span class="fc-desc">' + event.description + '</span>');
                }

                var eBorderColor = (event.borderColor) ? event.borderColor : event.borderColor;

                if (event.editable) {

                    element.find('.fc-content').css({
                        'background-color': '#dc3545',
                        'color': '#fff'
                    });

                    element.find('.fc-title').css({
                        'background-color': '#dc3545',
                        'color': '#fff'
                    });


                } else {

                    element.find('.fc-list-item-time').css({
                        color: eBorderColor,
                        borderColor: eBorderColor
                    });

                    element.find('.fc-list-item-title').css({
                        borderColor: eBorderColor
                    });

                    element.css('borderLeftColor', eBorderColor);

                }
            },
            eventDrop: function (calEvent) {

                Cita.data.id = calEvent.id;
                Cita.data.start = calEvent.start.format('dddd, DD-MM-YYYY HH:mm');
                Cita.data.end = calEvent.end.format('dddd, DD-MM-YYYY HH:mm');
                Cita.data.paciente = calEvent.paciente;
                Cita.data.prestador = calEvent.prestador;
                Cita.data.nhc = calEvent.nhc;
                Cita.data.codMedico = calEvent.codMedico;
                Cita.data.codItem = calEvent.codItem;
                Cita.data.estudio = calEvent.estudio;
                Cita.data.comentarios = calEvent.comentarios;
                Cita.data.idCalendar = calEvent.idCalendar;
                Cita.data.ubicacion = calEvent.ubicacion;
                Cita.data.tipo = 1;
                Cita.data.hashCita = calEvent.hashCita;
                Cita.data.newHashCita = calEvent.start.format('YYYY-MM-DD HH:mm') + '.' + calEvent.end.format('YYYY-MM-DD HH:mm')
                Cita.verUpdate(calEvent);
                Calendario.validarAgendamiento();

            },
            eventResize: function (calEvent) {


                Cita.data.id = calEvent.id;
                Cita.data.start = calEvent.start.format('dddd, DD-MM-YYYY HH:mm');
                Cita.data.end = calEvent.end.format('dddd, DD-MM-YYYY HH:mm');
                Cita.data.paciente = calEvent.paciente;
                Cita.data.prestador = calEvent.prestador;
                Cita.data.nhc = calEvent.nhc;
                Cita.data.codMedico = calEvent.codMedico;
                Cita.data.codItem = calEvent.codItem;
                Cita.data.estudio = calEvent.estudio;
                Cita.data.comentarios = calEvent.comentarios;
                Cita.data.idCalendar = calEvent.idCalendar;
                Cita.data.ubicacion = calEvent.ubicacion;
                Cita.data.tipo = 1;
                Cita.data.hashCita = calEvent.hashCita;
                Cita.data.newHashCita = calEvent.start.format('YYYY-MM-DD HH:mm') + '.' + calEvent.end.format('YYYY-MM-DD HH:mm')
                Cita.verUpdate(calEvent);
                Calendario.validarAgendamiento();



            }
        });

        var calendar = $('#calendar').fullCalendar('getCalendar');

        // change view to week when in tablet
        if (window.matchMedia('(min-width: 576px)').matches) {
            calendar.changeView('agendaWeek');
        }

        // change view to month when in desktop
        if (window.matchMedia('(min-width: 992px)').matches) {
            calendar.changeView('agendaWeek');
        }

        // change view based in viewport width when resize is detected
        calendar.option('windowResize', function (view) {
            if (view.name === 'listWeek') {
                if (window.matchMedia('(min-width: 992px)').matches) {
                    calendar.changeView('month');
                } else {
                    calendar.changeView('listWeek');
                }
            }
        });

        // Display calendar event modal
        calendar.on('eventClick', function (calEvent, jsEvent, view) {

            Cita.verCita(calEvent);





        });

        // display current date
        var dateNow = calendar.getDate();
        calendar.option('select', function (startDate, endDate) {
            Cita.data.tipo = 1;
            Cita.crearCita(startDate, endDate);
        });

        $('.select2-modal').select2({
            minimumResultsForSearch: Infinity,
            dropdownCssClass: 'select2-dropdown-modal',
        });

        $('.calendar-add').on('click', function (e) {
            e.preventDefault()
            $('#modalCreateEvent').modal('show');
        });





    }

    static setColor(id) {

        id = Number(id);
        let _obj = null;
        _obj = Calendario.citas.colorsCalendar[id];
        return (_obj !== undefined ? _obj.borderColor : 'bg-light');


    }

    static vMain() {
        return [

            m("div.calendar-wrapper", [
                m("div.calendar-sidebar", [

                    m("div.calendar-sidebar-header", [

                        m("i[data-feather='search']"),
                        m("div.search-form", [
                            m("input.form-control[type='search'][placeholder='Buscar por NHC o Apellidos y Nombres'][title='Buscar por NHC o Apellidos y Nombres']")
                        ]),
                        m("a.btn btn-sm btn-primary btn-icon calendar-add", [
                            m("div[data-toggle='tooltip']", [
                                m("i.tx-white[data-feather='plus']")
                            ])
                        ])
                    ]),
                    m("div.calendar-sidebar-body[id='calendarSidebarBody']", {

                    }, [

                        m("div.calendar-inline", [
                            m("div[id='calendarInline']"),

                        ]),
                        m("div.pd-t-0.pd-l-20.pd-r-20", [
                            m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03.mg-b-15",
                                "Filtro Calendarios: "
                            ),
                            m("div.schedule-group",
                                m("select.tx-5.form-control.select2-limit[multiple='multiple'][id='agendas']", {

                                    oncreate: (el) => {

                                        console.log(el)

                                        setTimeout(() => {
                                            $('.select2-limit').select2({
                                                templateSelection: function (data, container) {

                                                    container[0].style.backgroundColor = Calendario.setColor(data.id);
                                                    return data.text;
                                                },

                                                placeholder: 'Seleccione...',
                                                searchInputPlaceholder: 'Buscar',
                                            }).on("change", function (e) {

                                                let idCalendar = '';
                                                let tree = $(this).val();
                                                // Using the each() method
                                                $.each(tree, function (index, value) {
                                                    idCalendar += value + ",";
                                                });

                                                idCalendar = idCalendar.substring(0, idCalendar.length - 1);

                                                Calendario.idCalendar = idCalendar;

                                                if (tree.length > 0) {
                                                    m.route.set("/endoscopia/agendas/calendario/", {
                                                        idCalendar: encodeURIComponent(Calendario.idCalendar)
                                                    })

                                                } else {

                                                    m.route.set("/endoscopia/agendas/calendario");

                                                }

                                                window.location.reload();







                                            });
                                        }, 1500);


                                    }
                                }, [
                                    m(OptionSelect)

                                ])

                            )
                        ]),
                        m("div.pd-t-20.pd-l-20.pd-r-20", [
                            m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03.mg-b-15",
                                "Ultimos agendamientos:"
                            ),
                            m("div.schedule-group", [



                            ])
                        ]),

                    ])
                ]),
                m("div.calendar-content", [

                    (!Calendario.loader && Calendario.citas.status && Calendario.citas.data.length !== 0) ? [
                        m("div.calendar-content-body[id='calendar']", {}),
                    ] : (!Calendario.loader && Calendario.citas !== null && (!Calendario.citas.status || Calendario.citas.status == null)) ? [
                        m('div.pd-20', [
                            m(Errors, { type: (!Calendario.citas.status ? 1 : 0), error: Calendario.citas })
                        ])
                    ] : [
                        m('div.pd-20', [
                            m(Loader)
                        ])
                    ]
                ]),



            ]),

            m(".modal.calendar-modal-create[id='modalCreateEvent'][role='dialog'][aria-hidden='true']",
                m(".modal-dialog.modal-dialog-centered.modal-xl[role='document']",
                    m("div.modal-content", [
                        m("div.modal-header.tx-white.mg-0", {
                            style: { 'background-color': 'rgb(50, 90, 152)' }
                        }, [
                            m(".d-inline.tx-semibold.tx-18.event-title.tx-white.mg-0",
                                "Nueva Cita"
                            ),
                            m("nav.nav.nav-modal-event", [
                                m(".tx-14.d-inline.mg-0.tx-white",
                                    "Agenda Centralizada MV v1.0"
                                )

                            ])

                        ]),
                        m("div.modal-body.pd-20.pd-sm-30", [
                            m("div.mg-t-10.pd-10.wd-100p", {
                                class: (Cita.loader ? '' : 'd-none')
                            },
                                m("div.placeholder-paragraph", [
                                    m("div.line"),
                                    m("div.line")
                                ])
                            ),

                            m('div', {
                                class: (Cita.loader ? 'd-none' : ''),

                            }, [
                                m("div", {
                                    class: (!Cita.buscarPacientes ? 'd-none' : '')
                                }, [
                                    m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                        "Buscar Pacientes:"
                                    ),
                                    m("div.form-group",
                                        m('form', {
                                            onsubmit: (e) => {
                                                e.preventDefault();
                                                if (BuscadorPacientes.searchField.length !== 0) {
                                                    BuscadorPacientes.fetchSearch();
                                                } else {
                                                    alert('Ingrese Apellidos y Nombres para continuar.')
                                                }
                                            }
                                        }, [
                                            m("div.input-group", [
                                                m("input.form-control[type='text'][placeholder='Apellidos y Nombres']", {
                                                    oninput: (e) => {
                                                        BuscadorPacientes.searchField = e.target.value;
                                                    }
                                                }),
                                                m("div.input-group-append",
                                                    m("button.btn.btn-outline-light[type='button']", {
                                                        onclick: (e) => {
                                                            if (BuscadorPacientes.searchField.length !== 0) {
                                                                BuscadorPacientes.fetchSearch();
                                                            } else {
                                                                alert('Ingrese Apellidos y Nombres para continuar.')
                                                            }
                                                        }
                                                    },
                                                        "Buscar"
                                                    ),
                                                    m("button.btn.btn-outline-light[type='button']", {
                                                        onclick: (e) => {
                                                            Cita.buscarPacientes = !Cita.buscarPacientes;
                                                        }
                                                    },
                                                        m("i.fas.fa-times-circle"),
                                                    )
                                                )
                                            ])
                                        ]),

                                        m("div.row", [
                                            m("div.col-12",
                                                m(BuscadorPacientes)
                                            ),

                                        ])

                                    ),


                                ]),

                                m("div", {
                                    class: (!Cita.buscarItems ? 'd-none' : '')
                                }, [
                                    m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                        "Buscar Items:"
                                    ),
                                    m("div.form-group",
                                        m('form', {
                                            onsubmit: (e) => {
                                                e.preventDefault();
                                                if (BuscadorItems.searchField.length !== 0) {
                                                    BuscadorItems.fetchSearch();
                                                } else {
                                                    alert('Ingrese algún valor para continuar.')
                                                }
                                            }
                                        }, [
                                            m("div.input-group", [
                                                m("input.form-control[type='text'][placeholder='Buscar Items']", {
                                                    oninput: (e) => {
                                                        BuscadorItems.searchField = e.target.value;
                                                    },

                                                }),
                                                m("div.input-group-append",
                                                    m("button.btn.btn-outline-light[type='button']", {
                                                        onclick: (e) => {
                                                            if (BuscadorItems.searchField.length !== 0) {
                                                                BuscadorItems.fetchSearch();
                                                            } else {
                                                                alert('Ingrese algún valor para continuar.')
                                                            }
                                                        }
                                                    },
                                                        "Buscar"
                                                    ),
                                                    m("button.btn.btn-outline-light[type='button']", {
                                                        onclick: (e) => {
                                                            Cita.buscarItems = !Cita.buscarItems;
                                                        }
                                                    },
                                                        m("i.fas.fa-times-circle"),
                                                    )
                                                )
                                            ])
                                        ]),

                                        m("div.row", [
                                            m("div.col-12",
                                                m(BuscadorItems)
                                            ),

                                        ])

                                    ),


                                ]),

                                m("div", {
                                    class: (Cita.buscarPacientes || Cita.buscarItems ? 'd-none' : '')
                                }, [
                                    m("div.form-group.d-none",
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Agendas:"
                                        ),

                                    ),
                                    m("div.form-group",
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Tipo:"
                                        ),
                                        m("div.input-group", [
                                            m("div.custom-control.custom-radio", [
                                                m("input.custom-control-input[type='radio'][id='tipoCita1'][name='tipoCita']", {
                                                    onclick: (e) => {
                                                        Cita.data.tipo = 1;
                                                        console.log(Cita.data)

                                                    },
                                                    oncreate: (el) => {
                                                        el.dom.checked = true;
                                                    }
                                                }),
                                                m("label.custom-control-label[for='tipoCita1']",
                                                    "Cita Médica"
                                                )
                                            ]),
                                            m("div.custom-control.custom-radio.mg-l-20", [
                                                m("input.custom-control-input[type='radio'][id='tipoCita2'][name='tipoCita']", {
                                                    onclick: (e) => {
                                                        Cita.data.tipo = 2;
                                                        console.log(Cita.data)

                                                    }
                                                }),
                                                m("label.custom-control-label[for='tipoCita2']",
                                                    "Evento"
                                                )
                                            ]),
                                            m("div.custom-control.custom-radio.mg-l-20", [
                                                m("input.custom-control-input[type='radio'][id='tipoCita3'][name='tipoCita']", {
                                                    onclick: (e) => {
                                                        Cita.data.tipo = 3;
                                                        console.log(Cita.data)

                                                    }
                                                }),
                                                m("label.custom-control-label[for='tipoCita3']",
                                                    "Nota"
                                                )
                                            ])

                                        ])
                                    ),

                                    (Cita.data.tipo == 2 || Cita.data.codItem !== undefined ? [
                                        m("div.form-group", [
                                            m("div.row.row-xs", [
                                                m("div.col-6",
                                                    m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                        "Fecha y Hora de Inicio:"
                                                    ),
                                                    m("input.form-control[id='eventStartDate'][type='text'][disabled='disabled']", {
                                                        value: Cita.data.start
                                                    })
                                                ),
                                                m("div.col-6",
                                                    m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                        "Fecha y Hora de Fin"
                                                    ),
                                                    m("input.form-control[type='text'][id='eventEndDate'][disabled='disabled']", {
                                                        value: Cita.data.end

                                                    })
                                                ),

                                            ]),


                                        ])
                                    ] : []),

                                    m("div.form-group", {
                                        class: (Cita.data.tipo == 2 ? '' : 'd-none')
                                    },
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Nombre Evento:"
                                        ),
                                        m("div.input-group", [
                                            m("input.form-control[type='text'][placeholder='Nombre Evento']", {


                                            }),
                                        ]),

                                    ),


                                    m("div.form-group", {
                                        class: (Cita.data.tipo == 1 ? '' : 'd-none')
                                    },
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Estudio:"
                                        ),
                                        m("div.input-group", [
                                            m("input.form-control[type='text'][placeholder='Items/Estudio']", {
                                                value: (Cita.data.codItem !== undefined ? Cita.data.codItem + ' - ' + Cita.data.estudio : ''),
                                                oninput: (e) => {
                                                    e.preventDefault();
                                                },
                                                disabled: (Cita.data.codItem !== undefined ? 'disabled' : '')

                                            }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-primary[type='button']", {
                                                    onclick: (e) => {
                                                        Cita.buscarItems = !Cita.buscarItems;
                                                    }
                                                }, [
                                                    m("i.fas.fa-search.mg-r-2"),
                                                    " Buscar Estudios"

                                                ]

                                                )
                                            )
                                        ]),

                                    ),


                                    m("div.form-group", {
                                        class: (Cita.data.tipo == 1 ? '' : 'd-none')
                                    },
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Historia Clínica Paciente: ",
                                            m('div.d-inline.tx.semibold.tx-danger', {
                                                style: { "cursor": "pointer" },
                                                onclick: () => {
                                                    Cita.data.sinDatos = !Cita.data.sinDatos;
                                                }
                                            }, ' *Sin Historia Clínica ')
                                        ),
                                        m("div.input-group", {
                                            class: (Cita.data.sinDatos ? 'd-none' : '')
                                        }, [
                                            m("input.form-control[type='text'][placeholder='Numero de Historia Clínica'][autofocus]", {
                                                value: (Cita.data.paciente !== undefined ? Cita.data.nhc + ' - ' + Cita.data.paciente : ''),
                                                oninput: (e) => {
                                                    e.preventDefault();
                                                },
                                                disabled: (Cita.data.paciente !== undefined ? 'disabled' : '')
                                            }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-primary[type='button']", {
                                                    onclick: (e) => {
                                                        Cita.buscarPacientes = !Cita.buscarPacientes;
                                                    }
                                                }, [
                                                    m("i.fas.fa-search.mg-r-2"),
                                                    " Buscar Pacientes "
                                                ])
                                            )
                                        ]),
                                        m("div.input-group", {
                                            class: (Cita.data.sinDatos ? '' : 'd-none')
                                        }, [
                                            m('div.col-12.mg-b-10', [
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                    "Apellidos y Nombres del Paciente:"
                                                ),
                                                m("input.form-control[type='text'][placeholder='Apellidos y Nombres del Paciente'][autofocus]", {
                                                    value: (Cita.data.paciente !== undefined ? Cita.data.paciente : ''),
                                                    oninput: (e) => {
                                                        Cita.data.paciente = e.target.value;
                                                        Cita.data.pn_paciente = Cita.data.paciente;
                                                    },
                                                }),

                                            ])

                                        ]),
                                        m("div.input-group", {
                                            class: (Cita.data.sinDatos ? '' : 'd-none')
                                        }, [

                                            m('div.col-12.mg-b-10', [
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                    "Fecha de Nacimiento:"
                                                ),
                                                m("input.form-control[type='date'][placeholder='Fecha Nacimiento']", {
                                                    oninput: (e) => {
                                                        Cita.data.dateBirth = e.target.value;
                                                        console.log(Cita.dateBirth)
                                                    },
                                                }),
                                            ])


                                        ]),
                                        m("div.input-group", {
                                            class: (Cita.data.sinDatos ? '' : 'd-none')
                                        }, [

                                            m('div.col-12.mg-b-10', [
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                    "Sexo:"
                                                ),
                                                m('select.tx-semibold', {
                                                    onchange: (e) => {
                                                        Cita.data.sexType = e.target.value;
                                                    },
                                                    class: "custom-select"
                                                },
                                                    m('option', 'Seleccione...'),
                                                    m('option[value="M"]', 'Masculino'),
                                                    m('option[value="F"]', 'Femenino')
                                                )
                                            ]),


                                        ]),
                                        m("div.input-group", {
                                            class: (Cita.data.sinDatos ? '' : 'd-none')
                                        }, [

                                            m('div.col-12.mg-b-10', [
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                    "Correo electrónico:"
                                                ),
                                                m("input.form-control[type='text'][placeholder='Correo electrónico'][autofocus]", {
                                                    value: (Cita.data.pc_email !== undefined ? Cita.data.pc_email : ''),
                                                    oninput: (e) => {
                                                        Cita.data.email = e.target.value;
                                                        Cita.data.pc_email = e.target.value;
                                                    },
                                                }),
                                            ]),


                                        ]),
                                        m("div.input-group", {
                                            class: (Cita.data.sinDatos ? '' : 'd-none')
                                        }, [

                                            m('div.col-12.mg-b-10', [
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                    "Celular:"
                                                ),
                                                m("input.form-control[type='text'][placeholder='Correo electrónico'][autofocus]", {
                                                    value: (Cita.data.pc_telefono !== undefined ? Cita.data.pc_telefono : ''),
                                                    oninput: (e) => {
                                                        Cita.data.pc_telefono = e.target.value;
                                                    },
                                                }),
                                            ]),


                                        ])
                                    ),



                                    m("div.form-group",

                                        [
                                            m("ul.nav.nav-tabs[id='myTab'][role='tablist']", [
                                                m("li.nav-item",
                                                    m("a.nav-link.active[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']",
                                                        "Comentarios"
                                                    )
                                                ),
                                                m("li.nav-item.d-none",
                                                    m("a.nav-link[id='profile-tab'][data-toggle='tab'][href='#profile'][role='tab'][aria-controls='profile'][aria-selected='false']",
                                                        "Notificación al Correo"
                                                    )
                                                ),
                                                m("li.nav-item.d-none",
                                                    m("a.nav-link[id='contact-tab'][data-toggle='tab'][href='#contact'][role='tab'][aria-controls='contact'][aria-selected='false']",
                                                        "Archivos Adjuntos"
                                                    )
                                                )
                                            ]),
                                            m(".tab-content.bd.bd-gray-300.bd-t-0.pd-20[id='myTabContent']", [
                                                m(".tab-pane.fade.show.active[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [

                                                    m("textarea.form-control[rows='2'][placeholder='Comentarios']", {


                                                        oninput: (e) => {
                                                            Cita.data.comentarios = e.target.value;


                                                        }
                                                    })
                                                ]),
                                                m(".tab-pane.fade[id='profile'][role='tabpanel'][aria-labelledby='profile-tab']", [
                                                    m("h6",
                                                        "Profile"
                                                    ),
                                                    m("p",
                                                        "..."
                                                    )
                                                ]),
                                                m(".tab-pane.fade[id='contact'][role='tabpanel'][aria-labelledby='contact-tab']", [
                                                    m("h6",
                                                        "Contact"
                                                    ),
                                                    m("p",
                                                        "..."
                                                    )
                                                ])
                                            ])
                                        ],

                                    )
                                ])

                            ])



                        ]),
                        m("div.modal-footer", [
                            m("button.btn.btn-primary.mg-r-5", {
                                onclick: () => {

                                    Cita.agendarCitaHttp();
                                }
                            },
                                "Agendar Cita"
                            ),
                            m("a.btn.btn-secondary[href=''][data-dismiss='modal']",
                                "Cerrar"
                            )
                        ])
                    ])
                )
            ),
            m(".modal.calendar-modal-event[id='modalCalendarEvent'][role='dialog'][aria-hidden='true']",
                m(".modal-dialog.modal-dialog-centered.modal-xl[role='document']",
                    m("div.modal-content", [
                        m("div.modal-header", [
                            m("h6.event-title"),
                            m("nav.nav.nav-modal-event", [
                                m(".tx-14.d-inline.mg-0.tx-white",
                                    "Agenda Centralizada MV v1.0"
                                )

                            ])
                        ]),
                        m("div.modal-body", [
                            m("div.row.row-sm", [
                                m("div.col-sm-6", [
                                    m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03",
                                        "Fecha Inicio"
                                    ),
                                    m("p.event-start-date")
                                ]),
                                m("div.col-sm-6", [
                                    m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03",
                                        "Fecha Final"
                                    ),
                                    m("p.event-end-date")
                                ])
                            ]),
                            m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03",
                                "Descripción:"
                            ),
                            m("p.mg-b-40", [
                                Cita.data.paciente,
                                m('br'),
                                Cita.data.estudio,
                                m('br'),
                                Cita.data.prestador,
                                m('br'),
                            ]),
                            m("p.event-desc.tx-gray-900.mg-b-40"),
                            (!Cita.data.editable ? [
                                m("button.btn.btn-primary.mg-r-5[data-dismiss='modal']", {
                                    onclick: () => {
                                        Cita.trackReAgendar();
                                    }
                                },
                                    "Reagendar Cita"
                                ),
                            ] : [
                                m("button.btn.btn-primary.mg-r-5[data-dismiss='modal']", {
                                    onclick: () => {
                                        Cita.trackCancelReAgendar();
                                    }
                                },
                                    "Cancelar Reagendamiento"
                                ),
                            ]),

                            m("button.btn.btn-danger.mg-r-5", {
                                onclick: () => {
                                    Cita.cancelarCita();
                                }
                            },
                                "Cancelar Cita"
                            ),
                            m("a.btn.btn-secondary.pd-x-20[href=''][data-dismiss='modal']",
                                "Cerrar"
                            )
                        ])
                    ])
                )
            ),
            m(".modal.calendar-modal-create[id='modalUpdateEvent'][role='dialog'][aria-hidden='true']",
                m(".modal-dialog.modal-dialog-centered.modal-xl[role='document']",
                    m("div.modal-content", [
                        m("div.modal-header.tx-white.bg-primary", [
                            m("h5.event-title.tx-white",
                                "Reagendar Cita"
                            ),
                            m("nav.nav.nav-modal-event", [
                                m(".tx-14.d-inline.mg-0.tx-white",
                                    "Agenda Centralizada MV v1.0"
                                )

                            ])

                        ]),
                        m("div.modal-body.pd-20.pd-sm-30", [
                            m("div.mg-t-10.pd-10.wd-100p", {
                                class: (Cita.loader ? '' : 'd-none')
                            },
                                m("div.placeholder-paragraph", [
                                    m("div.line"),
                                    m("div.line")
                                ])
                            ),

                            m('div', {
                                class: (Cita.loader ? 'd-none' : '')
                            }, [
                                m("div", {
                                    class: (!Cita.buscarPacientes ? 'd-none' : '')
                                }, [
                                    m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                        "Buscar Pacientes:"
                                    ),
                                    m("div.form-group",
                                        m('form', {
                                            onsubmit: (e) => {
                                                e.preventDefault();
                                                if (BuscadorPacientes.searchField.length !== 0) {
                                                    BuscadorPacientes.fetchSearch();
                                                } else {
                                                    alert('Ingrese Apellidos y Nombres para continuar.')
                                                }
                                            }
                                        }, [
                                            m("div.input-group", [
                                                m("input.form-control[type='text'][placeholder='Apellidos y Nombres']", {
                                                    oninput: (e) => {
                                                        BuscadorPacientes.searchField = e.target.value;
                                                    }
                                                }),
                                                m("div.input-group-append",
                                                    m("button.btn.btn-outline-light[type='button']", {
                                                        onclick: (e) => {
                                                            if (BuscadorPacientes.searchField.length !== 0) {
                                                                BuscadorPacientes.fetchSearch();
                                                            } else {
                                                                alert('Ingrese Apellidos y Nombres para continuar.')
                                                            }
                                                        }
                                                    },
                                                        "Buscar"
                                                    ),
                                                    m("button.btn.btn-outline-light[type='button']", {
                                                        onclick: (e) => {
                                                            Cita.buscarPacientes = !Cita.buscarPacientes;
                                                        }
                                                    },
                                                        m("i.fas.fa-times-circle"),
                                                    )
                                                )
                                            ])
                                        ]),

                                        m("div.row", [
                                            m("div.col-12",
                                                m(BuscadorPacientes)
                                            ),

                                        ])

                                    ),


                                ]),

                                m("div", {
                                    class: (!Cita.buscarItems ? 'd-none' : '')
                                }, [
                                    m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                        "Buscar Items:"
                                    ),
                                    m("div.form-group",
                                        m('form', {
                                            onsubmit: (e) => {
                                                e.preventDefault();
                                                if (BuscadorItems.searchField.length !== 0) {
                                                    BuscadorItems.fetchSearch();
                                                } else {
                                                    alert('Ingrese algún valor para continuar.')
                                                }
                                            }
                                        }, [
                                            m("div.input-group", [
                                                m("input.form-control[type='text'][placeholder='Buscar Items']", {
                                                    oninput: (e) => {
                                                        BuscadorItems.searchField = e.target.value;
                                                    },

                                                }),
                                                m("div.input-group-append",
                                                    m("button.btn.btn-outline-light[type='button']", {
                                                        onclick: (e) => {
                                                            if (BuscadorItems.searchField.length !== 0) {
                                                                BuscadorItems.fetchSearch();
                                                            } else {
                                                                alert('Ingrese algún valor para continuar.')
                                                            }
                                                        }
                                                    },
                                                        "Buscar"
                                                    ),
                                                    m("button.btn.btn-outline-light[type='button']", {
                                                        onclick: (e) => {
                                                            Cita.buscarItems = !Cita.buscarItems;
                                                        }
                                                    },
                                                        m("i.fas.fa-times-circle"),
                                                    )
                                                )
                                            ])
                                        ]),

                                        m("div.row", [
                                            m("div.col-12",
                                                m(BuscadorItems)
                                            ),

                                        ])

                                    ),


                                ]),
                                m("div", {
                                    class: (Cita.buscarPacientes || Cita.buscarItems ? 'd-none' : '')
                                }, [
                                    m("div.form-group.d-none",
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Tipo:"
                                        ),
                                        m("div.input-group", [
                                            m("div.custom-control.custom-radio", [
                                                m("input.custom-control-input[type='radio'][id='tipoCitaUpdate1'][name='tipoCitaUpdate']", {
                                                    onclick: (e) => {
                                                        Cita.data.tipo = 1;
                                                    },
                                                    onupdate: (el) => {
                                                        if (Cita.data.tipo == 1) {
                                                            el.dom.checked = true;
                                                        }
                                                    }
                                                }),
                                                m("label.custom-control-label[for='tipoCitaUpdate1']",
                                                    "Cita Médica"
                                                )
                                            ]),
                                            m("div.custom-control.custom-radio.mg-l-20", [
                                                m("input.custom-control-input[type='radio'][id='tipoCitaUpdate2'][name='tipoCitaUpdate']", {
                                                    onclick: (e) => {
                                                        Cita.data.tipo = 2;
                                                    },
                                                    onupdate: (el) => {
                                                        if (Cita.data.tipo == 2) {
                                                            el.dom.checked = true;
                                                        }
                                                    }
                                                }),
                                                m("label.custom-control-label[for='tipoCitaUpdate2']",
                                                    "Evento"
                                                )
                                            ])

                                        ])
                                    ),
                                    m("div.form-group", [

                                        m("div.row.row-xs", [
                                            m("div.col-6",
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                    "Fecha y Hora de Inicio:"
                                                ),
                                                m("input.form-control[id='eventStartDate'][type='text'][disabled='disabled']", {
                                                    value: Cita.data.start
                                                })
                                            ),
                                            m("div.col-6",
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                    "Fecha y Hora de Fin"
                                                ),
                                                m("input.form-control[type='text'][value=''][disabled='disabled']", {
                                                    value: Cita.data.end

                                                })
                                            ),

                                        ]),


                                    ]),



                                    m("div.form-group",
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Historia Clínica Paciente:"
                                        ),
                                        m("div.input-group", [

                                            m("input.form-control[type='text'][placeholder='Numero de Historia Clínica'][autofocus]", {
                                                value: (Cita.data.paciente !== undefined ? Cita.data.nhc + ' - ' + Cita.data.paciente : ''),
                                                oninput: (e) => {
                                                    e.preventDefault();
                                                },
                                                disabled: (Cita.data.paciente !== undefined ? 'disabled' : '')
                                            }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-primary[type='button']", {
                                                    onclick: (e) => {
                                                        Cita.buscarPacientes = !Cita.buscarPacientes;
                                                    }
                                                }, [
                                                    m("i.fas.fa-search.mg-r-2"),
                                                    " Buscar Pacientes "
                                                ])
                                            )
                                        ])
                                    ),



                                    m("div.form-group",
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Estudio:"
                                        ),
                                        m("div.input-group", [
                                            m("input.form-control[type='text'][placeholder='Items/Estudio']", {
                                                value: (Cita.data.codItem !== undefined ? Cita.data.codItem + ' - ' + Cita.data.estudio : ''),
                                                oninput: (e) => {
                                                    e.preventDefault();
                                                },
                                                disabled: (Cita.data.codItem !== undefined ? 'disabled' : '')

                                            }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-primary[type='button']", {
                                                    onclick: (e) => {
                                                        Cita.buscarItems = !Cita.buscarItems;
                                                    }
                                                }, [
                                                    m("i.fas.fa-search.mg-r-2"),
                                                    " Buscar Estudios "

                                                ]

                                                )
                                            )
                                        ]),

                                    ),


                                    m("div.form-group",
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Comentarios:"
                                        ),
                                        m("textarea.form-control[rows='2'][placeholder='Comentarios']", {
                                            value: Cita.data.comentarios,
                                            oninput: (e) => {
                                                Cita.data.comentarios = e.target.value;
                                            }
                                        })
                                    )
                                ])

                            ])



                        ]),
                        m("div.modal-footer", [
                            m("button.btn.btn-primary.mg-r-5", {
                                onclick: () => {

                                    Cita.reAgendarCita();

                                }
                            },
                                "Reagendar Cita"
                            ),
                            m("a.btn.btn-secondary[href=''][data-dismiss='modal']",
                                "Cerrar"
                            )
                        ])
                    ])
                )
            ),



        ];
    }

    static vMenu() {
        return m(Sidebar);
    }

    static fetchAgendas() {

        if (Calendario.idCalendar !== null) {

            Calendario.loader = true;
            m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/v2/date/citas/agendadas",
                params: {
                    idCalendar: Calendario.idCalendar
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
                .then(function (res) {

                    Calendario.loader = false;
                    Calendario.citas = {
                        status: res.status,
                        data: res.citasAgendadas,
                        colorsCalendar: res.colorsCalendar
                    };
                    setTimeout(function () {
                        Calendario.setCalendar();
                    }, 80);
                    setTimeout(function () {
                        Calendario.setSidebar();
                    }, 160);


                })
                .catch(function (e) {
                    Calendario.loader = false;
                    Calendario.citas = {
                        status: null,
                        message: e
                    };
                });

        }


    }

    static reloadFetchAgenda() {

        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/agendadas",
            params: {
                idCalendar: Calendario.idCalendar
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (res) {
                Calendario.citas = {
                    status: res.status,
                    data: res.citasAgendadas,
                    colorsCalendar: res.colorsCalendar
                };
                $('#calendar').fullCalendar('removeEvents');
                $('#calendar').fullCalendar('addEventSource', Calendario.citas.data);
                $('#calendar').fullCalendar('rerenderEvents');


            })
            .catch(function (e) { });
    }

    static fetchPerfilAgenda(_data) {

        try {


            Calendario.loader = true;
            m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/v2/date/citas/perfil",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.userToken
                },
            })
                .then(function (res) {

                    if (res.status) {

                        Calendario.calendarios = res.data.calendarios;

                        if (Calendario.idCalendar == null) {
                            Calendario.idCalendar = res.data.agendas
                        }

                        m.route.set('/endoscopia/agendas/calendario/', {
                            idCalendar: encodeURIComponent(Calendario.idCalendar)
                        });
                        Calendario.fetchAgendas();


                    } else {
                        Calendario.loader = false;
                        Calendario.citas = {
                            status: res.status,
                            message: res.message
                        };
                    }
                })
                .catch(function (e) {

                    Calendario.loader = false;
                    Calendario.citas = {
                        status: null,
                        message: e
                    };

                });


        } catch (error) {
            Calendario.loader = false;
            Calendario.citas = {
                status: null,
                message: e
            };
        }


    }



    static showAlertCalendar(type, message) {
        Calendario.typeAlert = type;
        Calendario.messageAlert = message;
        $('.toast').toast('show');
        m.redraw();
    }

    static validarAgendamiento() {

        let _track = true;
        let _timeInicio = '';
        let _timeFin = '';

        Calendario.citas.data.events.map((_val, _index) => {
            if (moment(_val.start).format('DD-MM-YYYY HH:mm') == moment(Cita.data.start, 'dddd, DD-MM-YYYY HH:mm').format('DD-MM-YYYY HH:mm')) {
                _track = false;
                _timeInicio = moment(_val.start).format('DD-MM-YYYY HH:mm');
                _timeFin = moment(_val.end).format('DD-MM-YYYY HH:mm');
            }

            if (moment(_val.end).format('DD-MM-YYYY HH:mm') == moment(Cita.data.end, 'dddd, DD-MM-YYYY HH:mm').format('DD-MM-YYYY HH:mm')) {
                _track = false;
                _timeInicio = moment(_val.start).format('DD-MM-YYYY HH:mm');
                _timeFin = moment(_val.end).format('DD-MM-YYYY HH:mm');
            }
        })

        if (!_track) {
            $('#modalCreateEvent').modal('hide');
            Calendario.showAlertCalendar('bg-danger', 'No se puede reagendar. Ya existe una cita agendada desde: ' + _timeInicio + ' hasta: ' + _timeFin)
            throw 'custom error'
        }

    }


    oninit(_data) {

        if (_data.attrs.idCalendar !== undefined) {
            Calendario.idCalendar = decodeURIComponent(_data.attrs.idCalendar);
            Calendario.fetchPerfilAgenda();
        } else {
            Calendario.idCalendar = null;
            Calendario.fetchPerfilAgenda();
        }


    }

    oncreate() {
        document.body.classList.add('app-calendar');
    }

    onupdate(_data) {
        if (_data.attrs.idCalendar == undefined) {
            Calendario.showAlertCalendar('bg-danger', 'Es necesario un perfil de agendamiento válido. Un momento por favor.');
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        }
    }



    static page() {
        return [
            Calendario.vHeader(),
            Calendario.vMain(),
            m(AlertCalendar)
        ];
    }



}

class CalendarioEndo extends Calendario {
    constructor() {
        super();
    };
};

export default CalendarioEndo;