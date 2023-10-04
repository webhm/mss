import App from "../../models/App";

class SingOut extends App {
    constructor() {
        super();
        try {
            App.auth.logout();
            App.logout();
        } catch (error) {
            m.route.set("/");
        }

    }

    view() {

    }
}

export default SingOut;