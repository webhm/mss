class AuthMSA {

    static loginRequest;
    static myMSALObj;
    static msalConfig;
    static myMSALObj;

    constructor() {}


    static login() {

        this.loginRequest = {
            scopes: ["openid", "profile", "User.Read"],
        };

        this.myMSALObj = null;

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

        this.myMSALObj = new Msal.UserAgentApplication(this.msalConfig);


        this.myMSALObj.loginPopup(this.loginRequest)
            .then((loginResponse) => {
                console.log(loginResponse)
                localStorage.setItem("token", localStorage.getItem('msal.idtoken'));
                localStorage.setItem("user", JSON.stringify({
                    userName: loginResponse.account.userName,
                    rol: 1
                }));

                window.location.reload();
            }).catch(function(error) {
                console.log(error);
            });

    }


}

export default AuthMSA;