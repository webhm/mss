import m from "mithril";
import App from "../../models/App";

// Admisiones

class Admisiones extends App {

    constructor() {
        super();
        this.title = "Admisiones";
        this.view = this.page;
    }

    page() {
        return m("h1", this.title + " Hospital Metropolitano");
    }
}

export default Admisiones;
