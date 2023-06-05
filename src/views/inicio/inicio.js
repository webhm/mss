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
      this.getMenu().then(()=> {
        this.view = this.page;
      });
    }
  }

  getMenu(){
    return m.request("https://jsonplaceholder.typicode.com/todos/1");
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
