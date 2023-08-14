import m from "mithril";
import App from "../../models/App";
import HeaderPublic from "../layout/headerPublic";
import FormLogin from "./formLogin";

// Login
class Login extends App {

  constructor() {
    super();
    if (this.isPublic()) {
      this.view = this.page;
    }

  }


  vForm() {
    return m(FormLogin);
  }

  vHeader() {
    return m(HeaderPublic);
  }

  page() {
    return [
      this.vHeader(),
      this.vForm()
    ];
  }


}

export default Login;
