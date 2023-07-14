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
    this.name = "MetroPlus Flebotomista";
    this.version = " v1.0.0";
    this.public = true;
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

  view() { }
}

export default App;
