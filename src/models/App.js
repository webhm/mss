import m from "mithril";
import AuthManager from "./Auth";

// App
class App {
  static title;
  static name;
  static version;
  static offline;
  static public;
  static auth = null;

  constructor() {
    this.auth = new AuthManager();
    this.name = "MetroPlus Flebotomista";
    this.version = " v1.0.0";
  }

  isAuthenticated() {
    if (!this.auth.isAuthenticated()) {
      this.logout();
    }
    return this.auth.isAuthenticated();
  }

  isPublic() {
    if (this.auth.isAuthenticated()) {
      this.getInicio();
    }
    return !this.auth.isAuthenticated();

  }

  logout() {
    this.auth.logout();
    m.route.set("/");
  }

  getInicio() {
    m.route.set("/inicio");
  }

  login() {
    this.auth.login({ email: "user@example.com", password: "123456" }).then((result) => {
      if (result) {
        console.log("Login exitoso");
        console.log("Token:", this.auth.token);
        console.log("Usuario:", this.auth.user);
        this.getInicio();
      } else {
        console.log("Login fallido");
      }
    });
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
