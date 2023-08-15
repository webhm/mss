import m from "mithril";
import App from "../../models/App";

// Admisiones

class Admisiones extends App {

    constructor() {
        super();
        this.isAuthenticated();
        this.title = "Admisiones";
    }

    page() {
        return m("h1", this.title + " Hospital Metropolitano");
    }

    view() {
        return [this.page()];
    }
}

export default Admisiones;