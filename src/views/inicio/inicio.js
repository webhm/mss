import m from "mithril";
import App from "../../models/App";

// Inicio

class Inicio extends App {
  constructor() {
    super();
    this.title = "Inicio";
    this.isAuth();
  }

  oninit() {
    this.view = this.loader;
    setTimeout(() => {
      this.setPage();
    }, 3000);
  }

  setPage() {
    if (this.auth) {
      this.view = this.page;
      m.redraw();
    }
  }

  page() {
    return m("h1", this.title + " Hospital Metropolitano");
  }
}

export default Inicio;
