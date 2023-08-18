import m from "mithril";
import App from "../../../models/App";
import HeaderPrivate from "../../layout/headerPrivate";
import SidebarAdmin from "../sidebarAdmin";
import Table from "../../utils/table";
import Loader from "../../utils/loader";

// Administración MV

class usrMV extends App {
    usuarios = null;
    constructor() {
        super();
        this.isAuthenticated();
        if (this.hasProfile('ADM_USUARIOS_METROPLUS')) {
            this.title = "Usuarios MetroVirtual";
            this.view = this.page;
        }
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
                    m("div", {
                        oncreate: () => {
                            this.fetchData().then((_data) => {
                                this.usuarios = _data;
                            });
                        }
                    }, [
                        (this.usuarios !== null ? [
                            this.vTableUsuarios('table-usr', this.usuarios)
                        ] : [
                            m(Loader)
                        ])
                    ]),

                ])
            ),
        ];
    }
    vMenu() {
        return m(SidebarAdmin, { page: 'administracion/metrovirtual' });
    }
    fetchData() {

        return m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/t/v1/terapia-respiratoria/pedidos?idFiltro=1",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {
                return result.data;
            })
            .catch(function (e) {
                // setTimeout(function () { PedidosTR.fetchPedidos(); }, 2000);
            });

    }
    vTableUsuarios(idTable, dataTable) {
        return [
            m(Table, { idTable: idTable, dataTable: dataTable })
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

export default usrMV;