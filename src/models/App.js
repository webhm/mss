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
    this.name = " | MetroPlus";
    this.version = " v2.0.0";
    this.view = this.loader;
    App.isAuth();
  }


  static isAuth() {
    try {
      if (
        window.localStorage.getItem("accessToken") !== undefined &&
        window.localStorage.getItem("accessToken")
      ) {
        App.auth = true;
        if (m.route.get() === "/") {
          App.getInicio();
        }
      } else {
        throw "NO AUTH";
      }
    } catch (error) {
      App.logout();
    }
  }

  isOffline() {
    this.offline = true;
    return this.offline;
  }

  isPublic() {
    this.public = true;
    return this.public;
  }

  static logout() {
    this.auth = false;
    window.localStorage.removeItem("accessToken");
    m.route.set("/");
  }

  static getInicio() {
    App.auth = true;
    m.route.set("/inicio");
  }

  static login() {
    window.localStorage.accessToken = "hola";
    App.getInicio();
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
    document.title = this.title + this.name + this.version;
  }

  view() {}
}

export default App;
