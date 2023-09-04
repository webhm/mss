class AuthMSA {

    static loginRequest;
    static myMSALObj;
    static msalConfig;
    static myMSALObj;

    constructor() {

        this.loginRequest = {
            scopes: ["openid", "profile", "User.Read"],
        };

        this.myMSALObj = null;

        // Objeto Configuración 
        this.msalConfig = {
            auth: {
                clientId: "a29bcf0f-e889-4181-b2d5-62d630d502ee", // this is a fake id
                authority: "https://login.microsoftonline.com/266e577b-cdf0-42b2-9523-4dac3f7f4bc7",
                redirectUri: window.location.origin,
            },
            cache: {
                cacheLocation: "localStorage", // This configures where your cache will be stored
                storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
            },
        };

        // Inicializa el Objeto MSAL
        this.myMSALObj = new Msal.UserAgentApplication(this.msalConfig);


    }


}

export default AuthMSA;