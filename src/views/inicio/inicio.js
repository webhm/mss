import m from "mithril";
import App from "../../models/App";
import HeaderPublic from "../layout/headerPublic";

// Inicio
class Inicio extends App {
  constructor() {
    super();
    this.title = "Inicio";
    this.getMenu().then(() => {
      this.view = this.page;
      m.redraw();
      console.log(1, this);
    });
  }


  getMenu() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve("hello");
        // las para router
      }, 3000);
    });
  }

  vHeader() {
    return m(HeaderPublic);
  }



  vMain() {
    return [
      m("h1.mg-t-150.tx-center", "AAAAAAAA"),
      m("a.wd-50p.btn.btn-primary.btn-block.send-f[href='/salir']", " Entrar "),
    ];
  }

  page() {
    return [this.vHeader(), this.vMain()];
  }
}

export default Inicio;
