import m from "mithril";
import App from "../../../models/App";
import HeaderPrivate from "../../layout/headerPrivate";
import SidebarAdmin from "../sidebarAdmin";
import Table from "../../utils/table";

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
                    m("div.row", {
                        oncreate: () => {
                            this.fetchData();
                        }
                    }, [

                        this.vTableUsuarios()


                    ]),

                ])
            ),
        ];
    }
    vMenu() {
        return m(SidebarAdmin, { page: 'administracion/metrovirtual' });
    }
    fetchData() {


        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/t/v1/terapia-respiratoria/pedidos?idFiltro=1",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {
                this.usuarios = result.data;
            })
            .catch(function (e) {
                // setTimeout(function () { PedidosTR.fetchPedidos(); }, 2000);
            });

    }


    vTableUsuarios() {
        if (this.usuarios.length !== 0) {
            return m(Table, { idTable: '#table-usr', dataTable: this.usuarios });
        }

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