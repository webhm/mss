import m from "mithril";
import AuthManager from "./Auth";
import AuthMSA from "./AuthMSA";
import VentanaTemporizada from "../views/utils/ventanaTemp";





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
    static _msa = null;
    static messageError = null;

    constructor() {
        App.auth = new AuthManager();
        App._msa = new AuthMSA();
        App.name = "MetroPlus";
        App.version = " v2.0.0";
        if (App.auth.isAuthenticated()) {
            App.userName = App.auth.user.user;
        }


    }


    static hasProfile(profile) {
        return App.auth.hasProfile(profile);
    }

    static isAuthenticated() {
        if (!App.auth.isAuthenticated()) {
            App.logout();
        }
        App.setTitle();
        return App.auth.isAuthenticated();
    }

    static isPublic() {
        if (App.auth.isAuthenticated()) {
            App.getInicio();
        }
        App.setTitle();
        return !App.auth.isAuthenticated();
    }

    static logout() {
        return m.route.set("/");
    }


    static async _logoutMsi() {

        await App._msa.myMSALObj.initialize();
        await App._msa.myMSALObj.logoutPopup(App._msa.logoutRequest);

    }

    static getInicio() {
        return m.route.set("/inicio");
    }

    static login(usrToken) {
        App.auth.login({ usrToken: usrToken }).then((result) => {
            if (result) {
                console.log("Login exitoso");
                App.getInicio();
            } else {
                m.redraw();
                console.log("Login fallido");
            }
        });
    }

    static autorizarApp(usr, nombreApp) {

        let userToken = localStorage.userToken;
        localStorage.clear();
        localStorage.setItem('userToken', userToken);
        localStorage.setItem('authToken' + nombreApp, JSON.stringify({
            usr: usr,
            app: nombreApp
        }));

        // Redireccionar
        if (nombreApp == 'Flebotomista') {
            m.route.set('/laboratorio/flebotomista');
        }

    }



    static async loginMSA() {

        await App._msa.myMSALObj.initialize();

        // Crea Objeto para el Login de MSA
        App._msa.myMSALObj.loginPopup(App._msa.loginRequest)
            .then((loginResponse) => {
                App._msa.accountId = loginResponse.account.homeAccountId;
                console.log(1, loginResponse);
                App.login(loginResponse.idToken);
            }).catch(function (error) {
                console.log(error);
            });
    }

    static autorizarMSA(nombreApp) {


        if (localStorage.getItem('authToken' + nombreApp) == undefined) {

            // Crea Objeto para el Login de MSA
            App._msa.myMSALObj.loginPopup(App._msa.loginRequest)
                .then((loginResponse) => {
                    App.autorizarApp('mchang@hmetro.med.ec', nombreApp);
                }).catch(function (error) {
                    console.log(error);
                });
        }

    }

    static loader() {
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
        document.title = App.title + " | " + App.name + App.version;
    }

    static setTitle(_title) {
        App.title = _title;
        document.title = App.title + " | " + App.name + App.version;
    }

    view() { }

}




export default App;