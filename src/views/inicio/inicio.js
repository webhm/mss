import m from "mithril";
import App from "../../models/App";

// Inicio

class Inicio extends App {

  constructor() {
    super();
    this.title = "Inicio";
    this.view = this.page;
  }

  page() {
    return [
      m("h1", this.title + " Hospital Metropolitano"),
      m("a", {
        href: "/admisiones"
      }, "admisiones")
    ];
  }
}

export default Inicio;
