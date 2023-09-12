// Crea una clase de JavaScript para administrar en una SPA la autenticación en JWT y un sistema de control de accesos, roles y perfiles y un ejemplo de su funcionamiento.

import ApiHTTP from "./ApiHTTP";
import App from "./App";


// La clase se llama AuthManager y tiene los siguientes atributos y métodos:

// - token: almacena el token JWT obtenido al iniciar sesión.
// - user: almacena el objeto con la información del usuario autenticado, incluyendo su rol y su perfil.
// - login: recibe un objeto con el email y la contraseña del usuario y hace una petición al servidor para obtener el token JWT. Si la petición es exitosa, guarda el token y el usuario en los atributos correspondientes y devuelve true. Si la petición falla, devuelve false.
// - logout: borra el token y el usuario de los atributos y del almacenamiento local del navegador.
// - isAuthenticated: devuelve true si el token y el usuario están presentes y el token no ha expirado, y false en caso contrario.
// - hasRole: recibe un rol como argumento y devuelve true si el usuario tiene ese rol, y false en caso contrario.
// - hasProfile: recibe un perfil como argumento y devuelve true si el usuario tiene ese perfil, y false en caso contrario.

class AuthManager {


    constructor() {

        this.token = (localStorage.getItem('userToken') == undefined ? null : localStorage.getItem('userToken'));
        this.user = (localStorage.getItem('userToken') == undefined ? null : JSON.parse(atob(localStorage.getItem('userToken').split(".")[1])).data);
    }

    async login(credentials) {
        try {

            App.messageError = null;
            // Hacer la petición al servidor con las credenciales
            let response = await fetch(ApiHTTP.apiUrl + "/v2/auth", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': credentials.usrToken
                },
            });
            // Si la respuesta es exitosa, extraer el token y el usuario
            if (response.ok) {
                let res = await response.json();

                if (!res.status) {
                    localStorage.clear();
                    App.messageError = res.message;
                    return false;
                }

                this.token = res.data.jwt;
                // Guardar el token y el usuario en el almacenamiento local
                // Objeto Token del User 
                localStorage.clear();
                localStorage.setItem("userToken", this.token);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }


    logout() {
        // Borrar el token y el usuario de los atributos
        this.token = null;
        this.user = null;
        // Borrar el token y el usuario del almacenamiento local
        localStorage.removeItem("userToken");
    }

    isAuthenticated() {


        // Comprobar si el token y el usuario están presentes
        if (this.token && this.user) {
            // Comprobar si el token ha expirado
            let payload = JSON.parse(atob(this.token.split(".")[1]));
            let expiration = payload.exp * 1000;
            let now = Date.now();
            if (now < expiration) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    hasRole(role) {
        // Comprobar si el usuario tiene el rol indicado
        if (this.user && this.user.role === role) {
            return true;
        } else {
            return false;
        }
    }

    hasProfile(profile) {
        // Comprobar si el usuario tiene el perfil indicado
        if (this.user && this.user.profile.includes(profile)) {
            return true;
        } else {
            return false;
        }
    }
}

export default AuthManager;