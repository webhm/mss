import m from "mithril";

class Table {
    idTable = '';
    dataTable = [];
    constructor() { }
    oninit(_data) {
        this.idTable = _data.attrs.idTable;
        this.dataTable = _data.attrs.dataTable;
    }
    oncreate() {
        let table = $('#table-usr').DataTable();
        console.log(table)
        //table.search(this.dataTable).draw();
    }
    view() {
        return m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [
            m("table.table.table-sm.tx-11[width='100%']", {
                id: this.idTable

            })
        ]);
    }
}


export default Table;