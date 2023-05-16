import m from "mithril";

// App
class App {

  static title;
  static name;
  static version;
  static auth;
  static offline;
  static public;

  constructor() {
    this.name = " | MetroPlus";
    this.version = " v1.0.0";
    this.view = this.loader;
    this.isAuth();
  }

  isAuth() {
    try {
      if (window.localStorage.getItem('accessToken') !== undefined && window.localStorage.getItem('accessToken')) {
        if (m.route.get() === '/') {
          this.getInicio();
        }
      } else {


        throw "NO AUTH";
      }
    } catch (error) {
      this.logout();
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

  logout() {
    this.auth = false;
    window.localStorage.removeItem('accessToken');
    m.route.set('/');
  }

  getInicio() {
    this.auth = true;
    m.route.set('/inicio');
  }

  loader() {
    return [
      m("div.text-center.mg-t-300",
        m(".spinner-grow.text-dark[role='status']",
          m("span.sr-only",
            "Cargando..."
          )
        )
      )
    ];
  }

  oncreate() {
    document.title = this.title + this.name + this.version;
  }

  view() { }
}

export default App;
