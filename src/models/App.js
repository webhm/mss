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
    static usrToken = null;

    constructor() {
        this.auth = new AuthManager();
        this.name = "MetroPlus";
        this.version = " v2.0.0";
        if (this.auth.isAuthenticated()) {
            this.userName = this.auth.user.user;
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

    login(usrToken) {

        this.auth.login({ usrToken: usrToken }).then((result) => {
            if (result) {
                console.log("Login exitoso");
                this.getInicio();
            } else {
                console.log("Login fallido");
            }
        });
    }

    loginMSA() {

        let _this = this;
        let _msa = new AuthMSA();

        // Crea Objeto para el Login de MSA
        _msa.myMSALObj.loginPopup(_msa.loginRequest)
            .then((loginResponse) => {
                console.log(1, loginResponse);
                _this.login(loginResponse.idToken.rawIdToken);
            }).catch(function (error) {
                console.log(error);
            });
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