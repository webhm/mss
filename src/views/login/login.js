import m from "mithril";
import App from "../../models/App";

// Login
class Login extends App {

    constructor() {
        super();
        this.title = "Inicia Sesión";
    }

    page() {
        return [
            m("h1", this.title + " Hospital Metropolitano"),
            m("a", {
                href: "/inicio"
            }, "inicio")
        ];
    }
}

export default Login;