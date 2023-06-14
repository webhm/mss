import m from "mithril";
import App from "../../models/App";

// HeaderPublic
class HeaderPublic {
  view() {
    return [
    
      m("header.navbar.navbar-header.navbar-header-fixed", [
       
      
        m(
          "div.navbar-brand",
          m(m.route.Link, { 
            href: "/", 
            class: "df-logo " + (App.offline ? 'd-none': '')
           }, [
            "Metro",
            m("span", "Plus+"),
          ])
        ),
        m(
          "div.wd-100p.alert.alert-solid.alert-warning.pd-15.mg-0.bd-0.rounded-0[id='alertConnect'][role='alert']",
          [
            m(
              "div",
              m(m.route.Link, { href: "/", class: "df-logo" }, [
                "Metro",
                m("span", "Plus+"),
              ])
            ),,
            m(
              ".spinner-grow.spinner-grow-sm[role='status']",
              m("span.sr-only", "Procesando...")
            ),
            m(
              "b",
              "Tu conexión a Internet es deficiente. Intentaremos conectarnos en unos minutos."
            ),
          ]
        ),
      ]),
    ];
  }
}

export default HeaderPublic;
