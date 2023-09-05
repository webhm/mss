import m from "mithril";
import App from "../../models/App";

// Admisiones

class Admisiones extends App {

    constructor() {
        super();
        App.isAuthenticated();
        App.title = "Admisiones";
    }

    page() {
        return m("h1", App.title + " Hospital Metropolitano");
    }

    view() {
        return [this.page()];
    }
}

export default Admisiones;