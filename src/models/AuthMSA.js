class AuthMSA {

    static loginRequest;
    static myMSALObj;
    static msalConfig;
    static myMSALObj;

    constructor() { }


    static login() {

        this.loginRequest = {
            scopes: ["openid", "profile", "User.Read"],
        };

        this.myMSALObj = null;

        // Objeto Configuración 
        this.msalConfig = {
            auth: {
                clientId: "a29bcf0f-e889-4181-b2d5-62d630d502ee", // this is a fake id
                authority: "https://login.microsoftonline.com/266e577b-cdf0-42b2-9523-4dac3f7f4bc7",
                redirectUri: "http://localhost:3000/",
            },
            cache: {
                cacheLocation: "localStorage", // This configures where your cache will be stored
                storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
            },
        };

        // Inicializa el Objeto MSAL
        this.myMSALObj = new Msal.UserAgentApplication(this.msalConfig);

        // Crea Objeto para el Login de MSA
        this.myMSALObj.loginPopup(this.loginRequest)
            .then((loginResponse) => {
                console.log(loginResponse)
                localStorage.setItem("token", localStorage.getItem('msal.idtoken'));
                localStorage.setItem("user", JSON.stringify({
                    userName: loginResponse.account.userName,
                    role: 1,
                    profile: [
                        'ADM_USUARIOS_METROPLUS',
                        'ADMISIONES_METROPLUS',
                        'EMERGENCIA_METROPLUS',
                        'FARMACIA_METROPLUS',
                        'IMAGEN_METROPLUS',
                        'LABORATORIO_METROPLUS',
                        'HOSPITALIZACION_METROPLUS',
                        'TR_METROPLUS',
                        'NEURO_METROPLUS',
                        'BCO_SANGRE_METROPLUS',
                        'ENDOSCOPIA_METROPLUS',
                        'CONTA_METROPLUS',
                        'TF_METROPLUS',
                        'CARDIO_METROPLUS',


                    ]
                }));
                // Se recarga la pagina un avez hecho el Inicio de Sesion se redirige al Inicio
                window.location.reload();
            }).catch(function (error) {
                console.log(error);
            });

    }


}

export default AuthMSA;