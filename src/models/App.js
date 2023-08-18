import m from "mithril";
import AuthManager from "./Auth";
import AuthMSA from "./AuthMSA";



// App
class App {
    static title;
    static name;
    static version;
    static offline;
    static public;
    static userName;
    static auth = null;

    constructor() {
        this.auth = new AuthManager();
        this.name = "MetroPlus";
        this.version = " v2.0.0";
        if (this.auth.isAuthenticated()) {
            this.userName = this.auth.user;
            let name = this.userName.userName.split("@");
            this.userName = name[0];
        }

    }


    hasProfile(profile) {
        return this.auth.hasProfile(profile);
    }

    isAuthenticated() {
        if (!this.auth.isAuthenticated()) {
            this.logout();
        }
        this.setTitle();
        return this.auth.isAuthenticated();
    }

    isPublic() {
        if (this.auth.isAuthenticated()) {
            this.getInicio();
        }
        this.setTitle();
        return !this.auth.isAuthenticated();
    }

    logout() {
        this.auth.logout();
        m.route.set("/");
    }

    getInicio() {
        m.route.set("/inicio");
    }

    login() {
        this.auth.login({ email: "user@example.com", password: "123456" }).then((result) => {
            if (result) {
                console.log("Login exitoso");
                console.log("Token:", this.auth.token);
                console.log("Usuario:", this.auth.user);
                this.getInicio();
            } else {
                console.log("Login fallido");
            }
        });
    }

    loginMSA() {
        return AuthMSA.login();
    }

    loader() {
        return [
            m(
                "div.text-center.mg-t-300",
                m(
                    ".spinner-grow.text-dark[role='status']",
                    m("span.sr-only", "Cargando...")
                )
            ),
        ];
    }

    oncreate() {
        document.title = this.title + " | " + this.name + this.version;
    }

    setTitle() {
        document.title = this.title + " | " + this.name + this.version;
    }

    view() { }

}




export default App;