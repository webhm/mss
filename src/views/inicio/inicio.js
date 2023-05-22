import m from "mithril";
import App from "../../models/App";
import HeaderPublic from "../layout/headerPublic";

// Inicio
class Inicio extends App {
  constructor() {
    super();
    // Is Private
    this.title = "Inicio";
    if (App.auth) {
      this.view = this.page;
    }
  }

  page() {
    return [m(HeaderPublic), m("h1.mg-t-150.tx-center", "AAAAAAAA")];
  }
}

export default Inicio;
