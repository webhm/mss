import m from "mithril";
import App from "../../../models/App";
import Sidebar from "./sidebar";
import Loader from "../../utils/loader";
import HeaderCalendar from "../../layout/headerCalendar";
import Errors from "../../utils/errors";

// Cita
class Cita {
    loader = false;
    data = null;
    constructor() {

    }
    static crearCita() {


        $('#modalCreateEvent').modal('show');
    }
}

// Calendario
class Calendario extends App {

    loader = false;
    citas = null;
    idCalendar = null;
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
            beforeShowDay: function (date) {

                // add leading zero to single digit date
                var day = date.getDate();
                console.log(day);
                return [true, (day < 10 ? 'zero' : '')];
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
            defaultDate: "2023-04-24",
            selectLongPressDelay: 100,
            nowIndicator: true,
            editable: false,
            defaultView: 'listWeek',
            minTime: '06:00:00',
            maxTime: '21:00:00',
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

                var eBorderColor = (event.source.borderColor) ? event.source.borderColor : event.borderColor;
                element.find('.fc-list-item-time').css({
                    color: eBorderColor,
                    borderColor: eBorderColor
                });

                element.find('.fc-list-item-title').css({
                    borderColor: eBorderColor
                });

                element.css('borderLeftColor', eBorderColor);
            },
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


            if (calEvent.stAgendar == 1) {


                /*

                Calendario.cita = calEvent;
                Calendario.cita.horaInicio = moment(calEvent.start).format('dddd, DD-MM-YYYY HH:mm');
                Calendario.cita.horaFin = moment(calEvent.end).format('dddd, DD-MM-YYYY HH:mm');
                Calendario.loadDetalle = true;

                m.route.set('/imagen/agendamiento/cita/', {
                    id: Calendario.cita.id,
                });


                var modal = $('#modalCalendarEvent');

                modal.modal('show');
                modal.find('.event-title').text(calEvent.title);

                if (calEvent.description) {
                    modal.find('.event-desc').text(calEvent.description);
                    modal.find('.event-desc').prev().removeClass('d-none');
                } else {
                    modal.find('.event-desc').text('');
                    modal.find('.event-desc').prev().addClass('d-none');
                }

                modal.find('.event-start-date').text(moment(calEvent.start).format('LLL'));
                modal.find('.event-end-date').text(moment(calEvent.end).format('LLL'));

                //styling
                modal.find('.modal-header').css('backgroundColor', (calEvent.source.borderColor) ? calEvent.source.borderColor : calEvent.borderColor);

                */

            } else {


                /*

                Calendario.cita = calEvent;
                Calendario.cita.horaInicio = moment(calEvent.start).format('dddd, DD-MM-YYYY HH:mm');
                Calendario.cita.horaFin = moment(calEvent.end).format('dddd, DD-MM-YYYY HH:mm');
                m.route.set('/imagen/agendamiento/nueva-cita/', {
                    id: Calendario.cita.id,
                });



                
                $('#modalCreateEvent').modal('show');
                $('#eventStartDate').val(moment(calEvent.start).format('LLL'));
                $('#eventEndDate').val(moment(calEvent.end).format('LLL'));

                $('#eventStartTime').val(moment(calEvent.start).format('LT')).trigger('change');
                $('#eventEndTime').val(moment(calEvent.end).format('LT')).trigger('change');

                */


            }


        });

        // display current date
        var dateNow = calendar.getDate();
        calendar.option('select', function (startDate, endDate) {

            alert("Seleccione una cita disponible.");

            throw "Seleccione una cita disponible."
            /*

            $('#modalCreateEvent').modal('show');
            $('#eventStartDate').val(startDate.format('LL'));
            $('#eventEndDate').val(endDate.format('LL'));

            $('#eventStartTime').val(startDate.format('LT')).trigger('change');
            $('#eventEndTime').val(endDate.format('LT')).trigger('change');
            */
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

    static vMain() {
        return [

            m("div.calendar-wrapper", [
                m("div.calendar-sidebar", [

                    m("div.calendar-sidebar-header", [

                        m("i[data-feather='search']"),
                        m("div.search-form", [
                            m("input.form-control[type='search'][placeholder='Buscar por NHC o Apellidos y Nombres'][title='Buscar por NHC o Apellidos y Nombres']")
                        ]),
                        m("a.btn btn-sm btn-primary btn-icon calendar-add", {
                            onclick: Cita.crearCita
                        }, [
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
                                m("select.form-control.select2-limit[multiple='multiple']", {
                                    oncreate: () => {
                                        $('.select2-limit').select2({
                                            placeholder: 'Seleccione...',
                                            searchInputPlaceholder: 'Buscar'

                                        });


                                    }
                                }, [
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
                                ])

                            )
                        ]),
                        m("div.pd-t-20.pd-l-20.pd-r-20", [
                            m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03.mg-b-15",
                                "Ultimos agendamientos:"
                            ),
                            m("div.schedule-group", [



                            ])
                        ])
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
                                class: (Cita.loader ? 'd-none' : '')
                            }, [
                                m("div", {
                                    class: (!Calendario.buscarPacientes ? 'd-none' : '')
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
                                                            Calendario.buscarPacientes = !Calendario.buscarPacientes;
                                                        }
                                                    },
                                                        m("i.fas.fa-times-circle"),
                                                    )
                                                )
                                            ])
                                        ]),

                                        m("div.row", [
                                            m("div.col-12",
                                                // m(BuscadorPacientes)
                                            ),

                                        ])

                                    ),


                                ]),
                                m("div", {
                                    class: (!Calendario.buscarMedicos ? 'd-none' : '')
                                }, [
                                    m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                        "Buscar Médicos:"
                                    ),
                                    m("div.form-group",

                                        m('form', {
                                            onsubmit: (e) => {
                                                e.preventDefault();
                                                if (BuscadorMedicos.searchField.length !== 0) {
                                                    BuscadorMedicos.fetchSearch();
                                                } else {
                                                    alert('Ingrese Apellidos y Nombres para continuar.')
                                                }
                                            }
                                        }, [

                                            m("div.input-group", [
                                                m("input.form-control[type='text'][placeholder='Apellidos y Nombres']", {
                                                    oninput: (e) => {
                                                        BuscadorMedicos.searchField = e.target.value;
                                                    },

                                                }),
                                                m("div.input-group-append",
                                                    m("button.btn.btn-outline-light[type='button']", {
                                                        onclick: (e) => {
                                                            if (BuscadorMedicos.searchField.length !== 0) {
                                                                BuscadorMedicos.fetchSearch();
                                                            } else {
                                                                alert('Ingrese Apellidos y Nombres para continuar.')
                                                            }
                                                        }
                                                    },
                                                        "Buscar"
                                                    ),
                                                    m("button.btn.btn-outline-light[type='button']", {
                                                        onclick: (e) => {
                                                            Calendario.buscarMedicos = !Calendario.buscarMedicos;
                                                        }
                                                    },
                                                        m("i.fas.fa-times-circle"),
                                                    )
                                                )
                                            ]),

                                        ]),




                                        m("div.row", [
                                            m("div.col-12",
                                                //  m(BuscadorMedicos)
                                            ),

                                        ])

                                    ),


                                ]),
                                m("div", {
                                    class: (!Calendario.buscarItems ? 'd-none' : '')
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
                                                            Calendario.buscarItems = !Calendario.buscarItems;
                                                        }
                                                    },
                                                        m("i.fas.fa-times-circle"),
                                                    )
                                                )
                                            ])
                                        ]),

                                        m("div.row", [
                                            m("div.col-12",
                                                //  m(BuscadorItems)
                                            ),

                                        ])

                                    ),


                                ]),
                                m("div", {
                                    class: (Calendario.buscarPacientes || Calendario.buscarMedicos || Calendario.buscarItems ? 'd-none' : '')
                                }, [
                                    m("div.form-group",
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Tipo:"
                                        ),
                                        m("div.input-group", [
                                            m("div.custom-control.custom-radio", [
                                                m("input.custom-control-input[type='radio'][id='tipoCita1'][name='tipoCita']", {
                                                    onclick: (e) => {
                                                        Cita.tipoCita = 1;
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
                                                        Cita.tipoCita = 2;
                                                    }
                                                }),
                                                m("label.custom-control-label[for='tipoCita2']",
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
                                                    value: Cita.start
                                                })
                                            ),
                                            m("div.col-6",
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                    "Fecha y Hora de Fin"
                                                ),
                                                m("input.form-control[type='text'][value=''][disabled='disabled']", {
                                                    value: Cita.end

                                                })
                                            ),

                                        ]),


                                    ]),

                                    m("div.form-group",
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Estudio:"
                                        ),
                                        m("div.input-group", [
                                            m("input.form-control[type='text'][placeholder='Items/Estudio']", {
                                                value: (Cita.codItem !== undefined ? Cita.codItem + ' - ' + Cita.estudio : ''),
                                                oninput: (e) => {
                                                    e.preventDefault();
                                                },
                                                disabled: (Cita.codItem !== undefined ? 'disabled' : '')

                                            }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-primary[type='button']", {
                                                    onclick: (e) => {
                                                        Calendario.buscarItems = !Calendario.buscarItems;
                                                    }
                                                }, [
                                                    m("i.fas.fa-search.mg-r-2"),
                                                    " Buscar Estudios"

                                                ]

                                                )
                                            )
                                        ]),

                                    ),


                                    m("div.form-group",
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Historia Clínica Paciente: ",
                                            m('div.d-inline.tx.semibold.tx-danger', {
                                                style: { "cursor": "pointer" },
                                                onclick: () => {
                                                    Calendario.sinDatos = !Calendario.sinDatos;
                                                }
                                            }, ' *Sin Historia Clínica ')
                                        ),
                                        m("div.input-group", {
                                            class: (Calendario.sinDatos ? 'd-none' : '')
                                        }, [
                                            m("input.form-control[type='text'][placeholder='Numero de Historia Clínica'][autofocus]", {
                                                value: (Cita.paciente !== undefined ? Cita.nhc + ' - ' + Cita.paciente : ''),
                                                oninput: (e) => {
                                                    e.preventDefault();
                                                },
                                                disabled: (Cita.paciente !== undefined ? 'disabled' : '')
                                            }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-primary[type='button']", {
                                                    onclick: (e) => {
                                                        Calendario.buscarPacientes = !Calendario.buscarPacientes;
                                                    }
                                                }, [
                                                    m("i.fas.fa-search.mg-r-2"),
                                                    " Buscar Pacientes "
                                                ])
                                            )
                                        ]),
                                        m("div.input-group", {
                                            class: (Calendario.sinDatos ? '' : 'd-none')
                                        }, [
                                            m('div.col-12.mg-b-10', [
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                    "Apellidos y Nombres del Paciente:"
                                                ),
                                                m("input.form-control[type='text'][placeholder='Apellidos y Nombres del Paciente'][autofocus]", {
                                                    value: (Cita.paciente !== undefined ? Cita.paciente : ''),
                                                    oninput: (e) => {
                                                        Cita.paciente = e.target.value;
                                                        Cita.pn_paciente = Cita.paciente;
                                                    },
                                                }),

                                            ])

                                        ]),
                                        m("div.input-group", {
                                            class: (Calendario.sinDatos ? '' : 'd-none')
                                        }, [

                                            m('div.col-12.mg-b-10', [
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                    "Fecha de Nacimiento:"
                                                ),
                                                m("input.form-control[type='date'][placeholder='Fecha Nacimiento']", {
                                                    oninput: (e) => {
                                                        Cita.dateBirth = e.target.value;
                                                        console.log(Cita.dateBirth)
                                                    },
                                                }),
                                            ])


                                        ]),
                                        m("div.input-group", {
                                            class: (Calendario.sinDatos ? '' : 'd-none')
                                        }, [

                                            m('div.col-12.mg-b-10', [
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                    "Sexo:"
                                                ),
                                                m('select.tx-semibold', {
                                                    onchange: (e) => {
                                                        Cita.sexType = e.target.value;
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
                                            class: (Calendario.sinDatos ? '' : 'd-none')
                                        }, [

                                            m('div.col-12.mg-b-10', [
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                    "Correo electrónico:"
                                                ),
                                                m("input.form-control[type='text'][placeholder='Correo electrónico'][autofocus]", {
                                                    value: (Cita.pc_email !== undefined ? Cita.pc_email : ''),
                                                    oninput: (e) => {
                                                        Cita.email = e.target.value;
                                                        Cita.pc_email = e.target.value;
                                                    },
                                                }),
                                            ]),


                                        ]),
                                        m("div.input-group", {
                                            class: (Calendario.sinDatos ? '' : 'd-none')
                                        }, [

                                            m('div.col-12.mg-b-10', [
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                    "Celular:"
                                                ),
                                                m("input.form-control[type='text'][placeholder='Correo electrónico'][autofocus]", {
                                                    value: (Cita.pc_telefono !== undefined ? Cita.pc_telefono : ''),
                                                    oninput: (e) => {
                                                        Cita.pc_telefono = e.target.value;
                                                    },
                                                }),
                                            ]),


                                        ])
                                    ),


                                    m("div.form-group.d-none",
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Médico:"
                                        ),
                                        m("div.input-group", [
                                            m("input.form-control[type='text'][placeholder='Prestador']", {
                                                value: (Cita.prestador !== undefined ? Cita.codMedico + ' - ' + Cita.prestador : ''),
                                                oninput: (e) => {
                                                    e.preventDefault();
                                                },
                                                disabled: (Cita.prestador !== undefined ? 'disabled' : '')

                                            }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-primary[type='button']", {
                                                    onclick: (e) => {
                                                        Calendario.buscarMedicos = !Calendario.buscarMedicos;
                                                    }
                                                }, [
                                                    m("i.fas.fa-search.mg-r-2"),
                                                    " Buscar Médicos "
                                                ])
                                            )
                                        ]),

                                    ),



                                    m("div.form-group",
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Comentarios:"
                                        ),
                                        m("textarea.form-control[rows='2'][placeholder='Comentarios']", {


                                            oninput: (e) => {
                                                Cita.comentarios = e.target.value;


                                            }
                                        })
                                    )
                                ])

                            ])



                        ]),
                        m("div.modal-footer", [
                            m("button.btn.btn-primary.mg-r-5", {
                                onclick: () => {

                                    Calendario.agendarCita();
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
            m(".modal.calendar-modal-create[id='modalUpdateEvent'][role='dialog'][aria-hidden='true']",
                m(".modal-dialog.modal-dialog-centered.modal-xl[role='document']",
                    m("div.modal-content", [
                        m("div.modal-header.tx-white", {
                            style: { 'background-color': 'rgb(50, 90, 152)' }
                        }, [
                            m("h5.event-title.tx-white",
                                "Reagendar Cita"
                            ),

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
                                    class: (!Calendario.buscarPacientes ? 'd-none' : '')
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
                                                            Calendario.buscarPacientes = !Calendario.buscarPacientes;
                                                        }
                                                    },
                                                        m("i.fas.fa-times-circle"),
                                                    )
                                                )
                                            ])
                                        ]),

                                        m("div.row", [
                                            m("div.col-12",
                                                //  m(BuscadorPacientes)
                                            ),

                                        ])

                                    ),


                                ]),
                                m("div", {
                                    class: (!Calendario.buscarMedicos ? 'd-none' : '')
                                }, [
                                    m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                        "Buscar Médicos:"
                                    ),
                                    m("div.form-group",

                                        m('form', {
                                            onsubmit: (e) => {
                                                e.preventDefault();
                                                if (BuscadorMedicos.searchField.length !== 0) {
                                                    BuscadorMedicos.fetchSearch();
                                                } else {
                                                    alert('Ingrese Apellidos y Nombres para continuar.')
                                                }
                                            }
                                        }, [

                                            m("div.input-group", [
                                                m("input.form-control[type='text'][placeholder='Apellidos y Nombres']", {
                                                    oninput: (e) => {
                                                        BuscadorMedicos.searchField = e.target.value;
                                                    },

                                                }),
                                                m("div.input-group-append",
                                                    m("button.btn.btn-outline-light[type='button']", {
                                                        onclick: (e) => {
                                                            if (BuscadorMedicos.searchField.length !== 0) {
                                                                BuscadorMedicos.fetchSearch();
                                                            } else {
                                                                alert('Ingrese Apellidos y Nombres para continuar.')
                                                            }
                                                        }
                                                    },
                                                        "Buscar"
                                                    ),
                                                    m("button.btn.btn-outline-light[type='button']", {
                                                        onclick: (e) => {
                                                            Calendario.buscarMedicos = !Calendario.buscarMedicos;
                                                        }
                                                    },
                                                        m("i.fas.fa-times-circle"),
                                                    )
                                                )
                                            ]),

                                        ]),




                                        m("div.row", [
                                            m("div.col-12",
                                                // m(BuscadorMedicos)
                                            ),

                                        ])

                                    ),


                                ]),
                                m("div", {
                                    class: (!Calendario.buscarItems ? 'd-none' : '')
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
                                                            Calendario.buscarItems = !Calendario.buscarItems;
                                                        }
                                                    },
                                                        m("i.fas.fa-times-circle"),
                                                    )
                                                )
                                            ])
                                        ]),

                                        m("div.row", [
                                            m("div.col-12",
                                                // m(BuscadorItems)
                                            ),

                                        ])

                                    ),


                                ]),
                                m("div", {
                                    class: (Calendario.buscarPacientes || Calendario.buscarMedicos || Calendario.buscarItems ? 'd-none' : '')
                                }, [
                                    m("div.form-group.d-none",
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Tipo:"
                                        ),
                                        m("div.input-group", [
                                            m("div.custom-control.custom-radio", [
                                                m("input.custom-control-input[type='radio'][id='tipoCitaUpdate1'][name='tipoCitaUpdate']", {
                                                    onclick: (e) => {
                                                        Cita.tipoCita = 1;
                                                    },
                                                    onupdate: (el) => {
                                                        if (Cita.tipoCita == 1) {
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
                                                        Cita.tipoCita = 2;
                                                    },
                                                    onupdate: (el) => {
                                                        if (Cita.tipoCita == 2) {
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
                                                    value: Cita.start
                                                })
                                            ),
                                            m("div.col-6",
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                                    "Fecha y Hora de Fin"
                                                ),
                                                m("input.form-control[type='text'][value=''][disabled='disabled']", {
                                                    value: Cita.end

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
                                                value: (Cita.paciente !== undefined ? Cita.nhc + ' - ' + Cita.paciente : ''),
                                                oninput: (e) => {
                                                    e.preventDefault();
                                                },
                                                disabled: (Cita.paciente !== undefined ? 'disabled' : '')
                                            }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-primary[type='button']", {
                                                    onclick: (e) => {
                                                        Calendario.buscarPacientes = !Calendario.buscarPacientes;
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
                                            "Médico:"
                                        ),
                                        m("div.input-group", [
                                            m("input.form-control[type='text'][placeholder='Prestador']", {
                                                value: (Cita.prestador !== undefined ? Cita.codMedico + ' - ' + Cita.prestador : ''),
                                                oninput: (e) => {
                                                    e.preventDefault();
                                                },
                                                disabled: (Cita.prestador !== undefined ? 'disabled' : '')

                                            }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-primary[type='button']", {
                                                    onclick: (e) => {
                                                        Calendario.buscarMedicos = !Calendario.buscarMedicos;
                                                    }
                                                }, [
                                                    m("i.fas.fa-search.mg-r-2"),
                                                    " Buscar Médicos "
                                                ])
                                            )
                                        ]),

                                    ),
                                    m("div.form-group",
                                        m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Estudio:"
                                        ),
                                        m("div.input-group", [
                                            m("input.form-control[type='text'][placeholder='Items/Estudio']", {
                                                value: (Cita.codItem !== undefined ? Cita.codItem + ' - ' + Cita.estudio : ''),
                                                oninput: (e) => {
                                                    e.preventDefault();
                                                },
                                                disabled: (Cita.codItem !== undefined ? 'disabled' : '')

                                            }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-primary[type='button']", {
                                                    onclick: (e) => {



                                                        Calendario.buscarItems = !Calendario.buscarItems;
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
                                            value: Cita.comentarios,
                                            oninput: (e) => {
                                                Cita.comentarios = e.target.value;
                                            }
                                        })
                                    )
                                ])

                            ])



                        ]),
                        m("div.modal-footer", [
                            m("button.btn.btn-primary.mg-r-5", {
                                onclick: () => {

                                    console.log(22, Cita)
                                    Calendario.validarReagendamiento();

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
            m(".modal.calendar-modal-event[id='modalCalendarEvent'][role='dialog'][aria-hidden='true']",
                m(".modal-dialog.modal-dialog-centered.modal-xl[role='document']",
                    m("div.modal-content", [
                        m("div.modal-header", [
                            m("h6.event-title"),
                            m("nav.nav.nav-modal-event", [

                                m("a.nav-link[href='#'][data-dismiss='modal']",
                                    m("i[data-feather='x']")
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
                                Cita.paciente,
                                m('br'),
                                Cita.estudio,
                                m('br'),
                                Cita.prestador,
                                m('br'),
                            ]),
                            m("p.event-desc.tx-gray-900.mg-b-40"),
                            (!Cita.editable ? [
                                m("button.btn.btn-primary.mg-r-5[data-dismiss='modal']", {
                                    onclick: () => {
                                        console.log(Cita)
                                        Calendario.trackReAgendar();
                                    }
                                },
                                    "Reagendar Cita"
                                ),
                            ] : [
                                m("button.btn.btn-primary.mg-r-5[data-dismiss='modal']", {
                                    onclick: () => {
                                        console.log(Cita)
                                        Calendario.trackCancelReAgendar();
                                    }
                                },
                                    "Cancelar Reagendamiento"
                                ),
                            ]),

                            m("button.btn.btn-danger.mg-r-5", {
                                onclick: () => {
                                    Calendario.cancelarCita();
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
            )

        ];
    }

    static vMenu() {
        return m(Sidebar);
    }

    static fetchAgendas() {
        Calendario.loader = true;
        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/agendadas",
            params: {
                idFiltro: Calendario.idCalendar
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (res) {
                Calendario.loader = false;
                Calendario.citas = {
                    status: res.status,
                    data: res.citasAgendadas
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

    static fetchPerfilAgenda() {

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
                        Calendario.idCalendar = res.data.data.idCalendar
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

    oninit(_data) {

        if (_data.attrs.idCalendar !== undefined) {
            Calendario.idCalendar = decodeURIComponent(_data.attrs.idCalendar);
            Calendario.fetchAgendas();
        } else {
            Calendario.fetchPerfilAgenda();
        }


    }

    oncreate() {
        document.body.classList.add('app-calendar');
    }

    static page() {
        return [
            Calendario.vHeader(),
            Calendario.vMain()
        ];
    }



}

class CalendarioEndo extends Calendario {
    constructor() {
        super();
    };
};

export default CalendarioEndo;