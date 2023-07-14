import m from "mithril";
import RTCMessenger from "./PDFViewer";


// HeaderPublic
class HeaderPublic {

  static offline;

  mas = [];

  constructor() {
    window.addEventListener("offline", () => {
      this._offline()
      m.redraw();
    });
    window.addEventListener("online", () => {
      this._online()
      m.redraw();
    });
    window.addEventListener("user:data-message", (event) => {
      console.log(event)
      console.log(this)
      localStorage.setItem('user:data-message', JSON.stringify(this));


    });
    window.addEventListener("storage", (event) => {
      console.log('storage', event)
    });


  }

  loop() {
    try {
      console.log('hhhhhhh')
    } catch (error) {

    } finally {
      setTimeout(() => {
        this.loop();
      }, 5000);
    }
  }

  _offline() {
    console.log("offline");
    console.log("Ud esta desconectado.");
    document.body.classList.add("control");
    this.offline = true;
  }


  _online() {
    console.log("online");
    document.body.classList.remove("control");
    this.offline = false;
  }

  oncreate(el) {


    if (localStorage.getItem('user:data-message') == undefined) {
      localStorage.setItem('user:data-message', JSON.stringify(this));
    } else {
      localStorage.setItem('user:data-message', JSON.stringify(this));
    }
  }

  view() {




    return [
      m("header.navbar.navbar-header.navbar-header-fixed", {
        onclick: (el) => {
          const messageEvent = new CustomEvent("user:data-message", {
            detail: { from: "Manz", message: "Hello!" },
            bubbles: true,
            composed: true
          });
          this.mas.push(messageEvent.detail);
          el.target.dispatchEvent(messageEvent);
        }
      }, [
        (!this.offline ? [
          m(
            "div.navbar-brand",
            m(m.route.Link, {
              href: "/",
              class: "df-logo "
            }, [
              "Metro",
              m("span", "Plus+"),
            ])
          )
        ] : [
          m(
            "div.wd-100p.alert.alert-solid.alert-warning.pd-15.mg-0.bd-0.rounded-0[id='alertConnect'][role='alert']",
            [
              m(
                "div",
                m(m.route.Link, { href: "/", class: "df-logo" }, [
                  "Metro",
                  m("span", "Plus+"),
                ])
              ), ,
              m(
                ".spinner-grow.spinner-grow-sm[role='status']",
                m("span.sr-only", "Procesando...")
              ),
              m(
                "b",
                "Tu conexión a Internet es deficiente. Intentaremos conectarnos en unos minutos."
              ),
            ]
          )
        ])
      ]),
    ];
  }
}

export default HeaderPublic;
