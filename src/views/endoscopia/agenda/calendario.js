import m from "mithril";
import App from "../../../models/App";
import HeaderPrivate from "../../layout/headerPrivate";
import Sidebar from "./sidebar";
import Menu from "./menu";
import Loader from "../../utils/loader";


class MainCalendarioEndo {
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


// CalendarioEndo

class CalendarioEndo extends App {

    constructor() {
        super();
        if (App.isAuthenticated()) {
            App.setTitle("Agenda Centralizada");
            this.view = CalendarioEndo.page;
        }
    }

    static vHeader() {
        return m(HeaderPrivate, { userName: App.userName });
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
            selectLongPressDelay: 100,
            editable: false,
            nowIndicator: true,
            defaultView: 'listMonth',
            minTime: '06:00:00',
            maxTime: '21:00:00',
            slotDuration: '00:15:00',
            slotLabelInterval: 15,
            slotLabelFormat: 'HH:mma',
            slotMinutes: 15,
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

            eventSources: [],
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
            calendar.changeView('month');
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

                AgendaImagen.cita = calEvent;
                AgendaImagen.cita.horaInicio = moment(calEvent.start).format('dddd, DD-MM-YYYY HH:mm');
                AgendaImagen.cita.horaFin = moment(calEvent.end).format('dddd, DD-MM-YYYY HH:mm');
                AgendaImagen.loadDetalle = true;

                m.route.set('/imagen/agendamiento/cita/', {
                    id: AgendaImagen.cita.id,
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

                AgendaImagen.cita = calEvent;
                AgendaImagen.cita.horaInicio = moment(calEvent.start).format('dddd, DD-MM-YYYY HH:mm');
                AgendaImagen.cita.horaFin = moment(calEvent.end).format('dddd, DD-MM-YYYY HH:mm');
                m.route.set('/imagen/agendamiento/nueva-cita/', {
                    id: AgendaImagen.cita.id,
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
                            m("input.form-control[type='search'][placeholder='Buscar por Apellidos y Nombres']")
                        ]),
                        m("a.btn btn-sm btn-primary btn-icon calendar-add", [
                            m("div[data-toggle='tooltip']", [
                                m("i.tx-white[data-feather='plus']")
                            ])
                        ])
                    ]),
                    m("div.calendar-sidebar-body[id='calendarSidebarBody']", {
                        oncreate: () => {
                            CalendarioEndo.setSidebar();
                        }
                    }, [

                        m("div.calendar-inline", [
                            m("div[id='calendarInline']"),

                        ]),
                        m("div.pd-t-0.pd-l-20.pd-r-20", [
                            m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03.mg-b-15",
                                "Filtro CalendarioEndos: "
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
                    m('div.pd-20', [
                        m(Loader)
                    ]),
                    m("div.calendar-content-body[id='calendar']", {
                        oncreate: () => {
                            CalendarioEndo.setCalendar();
                        }
                    }),
                ]),




            ]),

        ];
    }

    static vMenu() {
        return m(Sidebar);
    }

    static page() {
        return [
            CalendarioEndo.vHeader(),
            CalendarioEndo.vMain()
        ];
    }



}

export default CalendarioEndo;