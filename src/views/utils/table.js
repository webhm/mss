import m from "mithril";

class Table {
    idTable = '';
    dataTable = null;
    arqTable = {};
    constructor(_data) {
        this.idTable = _data.attrs.idTable;
        this.dataTable = _data.attrs.dataTable;
        this.arqTable = _data.attrs.arqTable;
    }
    oncreate() {

        $.fn.dataTable.ext.errMode = "none";

        this.arqTable.data = this.dataTable;
        let table = $("#" + this.idTable).DataTable(this.arqTable);

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity
        });

        $('#searchField').keyup(function (e) {
            table.search($('#searchField').val()).draw();
        });

        return table;
    }
    view() {
        if (this.dataTable.length !== null) {
            return [

                m('div.row', [
                    m('div.col-12', [
                        m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.mg-t-10", [
                            m("div.d-flex.align-items-center.justify-content-between.mg-b-75.mg-t-10", [
                                m('div.d-none')
                            ]),
                            m("div.wd-100p.filemgr-content-header", [
                                m("i.fas.fa-search.tx-color-03.mg-r-15"),
                                m("div.search-form",
                                    m("input.form-control[type='search'][placeholder=' Buscar'][id='searchField']")
                                ),
                            ]),
                            m("table.table.table-sm[width='100%']", {
                                id: this.idTable

                            })
                        ])
                    ])
                ])


            ]
        }

    }
}


export default Table;