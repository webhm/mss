import m from "mithril";
import App from "../../models/App";
import HeaderPublic from "../layout/headerPublic";
import FormLogin from "./formLogin";

// Login
class Login extends App {

  constructor() {
    super();
    if (App.isPublic()) {
      App.title = "Inicia Sesión";
    }

  }


  vForm() {
    return m(FormLogin);
  }

  vHeader() {
    return m(HeaderPublic);
  }

  view() {
    return [
      this.vHeader(),
      this.vForm()
    ];
  }


}

export default Login;
