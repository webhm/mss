import m from "mithril";
import App from "../../models/App";
import HeaderPublic from "../layout/headerPublic";



// Inicio
class Inicio extends App {
  constructor() {
    super();
    // Is Private
    App.title = "Inicio";
    this.view = App.loader;
    if (App.auth) {
      this.getMenu().then(() => {
        this.view = this.page;
        m.redraw();
      });
    }
  }

  getMenu() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve("hello")
      }, 1000)
    });
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
