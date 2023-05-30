import m from "mithril";
import App from "../../models/App";
import HeaderPublic from "../layout/headerPublic";

// Inicio
class Inicio extends App {
  constructor() {
    super();
    // Is Private
    App.title = "Inicio";
    if (App.auth) {
      this.view = this.page;
    }
  }

  vHeader() {
    return m(HeaderPublic);
  }

  vMain() {
    return m("h1.mg-t-150.tx-center", "AAAAAAAA");
  }

  page() {
    return [
      this.vHeader(),
      this.vMain()
    ];
  }



}

export default Inicio;
