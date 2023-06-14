import m from "mithril";

// App
class App {
  static title;
  static name;
  static version;
  static auth = false;
  static offline;
  static public;

  constructor() {
    this.name = "MetroPlus";
    this.version = " v2.0.0";
    this.public = true;
    this.isOffline();
    this.view = this.loader;
    // Is Auth
    if (
      window.localStorage.getItem("accessToken") !== undefined &&
      window.localStorage.getItem("accessToken")
    ) {
      this.auth = true;
      if (m.route.get() === "/") {
        this.getInicio();
      }
    } else {
      this.logout();
    }
  }
  

  isOffline() {
    let _app = this;
    window.addEventListener("offline", function (e) {
      console.log("offline");
      _app.offline = !_app.offline;
      console.log("Ud esta desconectado.");
      document.body.classList.add("control");
      document.querySelector('#alertConnect').classList.remove('d-none');
    });
    window.addEventListener("online", function (e) {
      console.log("online");
      _app.offline = !_app.offline;
      document.body.classList.remove("control");
      document.querySelector('#alertConnect').classList.add('d-none');
      console.log(1,_app)
    });
    _app.offline = navigator.onLine;
    _app.offline = !_app.offline;
    return _app.offline;
  }

  isPublic() {
    this.public = true;
    return this.public;
  }

  logout() {
    this.auth = false;
    window.localStorage.removeItem("accessToken");
    m.route.set("/");
  }

  getInicio() {
    this.auth = true;
    m.route.set("/inicio");
  }

  login() {
    window.localStorage.accessToken = "hola";
    this.getInicio();
  }

  loader() {
    return [
      m(
        "div.text-center.mg-t-300",
        m(
          ".spinner-grow.text-dark[role='status']",
          m("span.sr-only", "Cargando...")
        )
      ),
    ];
  }

 

  oncreate() {
    document.title = this.title + " | " + this.name + this.version;
  }

  view() {}
}

export default App;
