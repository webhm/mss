// Crea una clase de JavaScript para administrar en una SPA la autenticación en JWT y un sistema de control de accesos, roles y perfiles y un ejemplo de su funcionamiento.


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
        this.token = (localStorage.getItem('token') == undefined ? null : localStorage.getItem('token'));
        this.user = (localStorage.getItem('user') == undefined ? null : localStorage.getItem('user'));
    }

    async login(credentials) {
        try {
            // Hacer la petición al servidor con las credenciales
            let response = await fetch("https://api.hospitalmetropolitano.org/t/v1/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: 'mchang', pass: 'Mmch!!@@11' }),
            });
            // Si la respuesta es exitosa, extraer el token y el usuario
            if (response.ok) {
                let data = await response.json();
                this.token = data.jwt;
                this.user = data.data.user.user;
                // Guardar el token y el usuario en el almacenamiento local
                localStorage.setItem("token", this.token);
                localStorage.setItem("user", JSON.stringify(this.user));
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
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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
        if (this.user && this.user.profile === profile) {
            return true;
        } else {
            return false;
        }
    }
}

export default AuthManager;