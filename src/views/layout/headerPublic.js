import m from "mithril";

// HeaderPublic
class HeaderPublic  {
    view() {
        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [

                m("div.navbar-brand",
                    m(m.route.Link, { href: "/", class: "df-logo" }, [
                        "Metro",
                        m("span",
                            "Plus+ v2.0"
                        ),
                    ]),
                ),

            ])
        ];
    }
}

export default HeaderPublic;