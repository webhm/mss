import m from "mithril";
import App from "../../models/App";
import HeaderPrivate from "../layout/headerPrivate";
import SidebarAdmin from "./sidebarAdmin";

// Administración

class Administracion extends App {

    constructor() {
        super();
        this.isAuthenticated();
        if (this.hasProfile('ADM_USUARIOS_METROPLUS')) {
            this.title = "Administración";
            this.view = this.page;
        }
    }

    vHeader() {
        return m(HeaderPrivate, { userName: this.userName });
    }

    vMain() {
        return [

            m("div.content.content-components", {

            },
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/", }, [
                                "MetroPlus"

                            ]),

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            this.title
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        this.title + ":"
                    ),

                    m("div.row.tx-14", [



                    ]),

                ])
            ),
        ];
    }

    vMenu() {
        return m(SidebarAdmin);
    }

    page() {
        return [
            this.vHeader(),
            this.vMenu(),
            this.vMain()
        ];
    }



}

export default Administracion;