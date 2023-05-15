import m from "mithril";

// App
class App {
  static title;
  static name;
  static version;
  static auth = false;

  constructor() {
    this.name = " | MetroPlus";
    this.version = " v1.0.0";
  }

  isAuth() {
    this.auth = true;
  }

  loader() {
    return m("h1",  " Cargando Hospital Metropolitano");
  }

  oncreate() {
    document.title = this.title + this.name + this.version;
  }

  view() {}
}

export default App;
