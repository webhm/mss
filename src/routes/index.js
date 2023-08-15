import m from 'mithril';
import Admisiones from "../views/admisiones/admisiones";
import Login from "../views/login/login";
import Inicio from "../views/inicio/inicio";

// Crear una instancia de la clase
// const authManager = new AuthManager();
/*

// Iniciar sesión con un usuario válido
authManager.login({ email: "user@example.com", password: "123456" }).then((result) => {
  if (result) {
    console.log("Login exitoso");
    console.log("Token:", authManager.token);
    console.log("Usuario:", authManager.user);
  } else {
    console.log("Login fallido");
  }
});

// Comprobar si el usuario está autenticado
console.log("Autenticado:", authManager.isAuthenticated());

// Comprobar si el usuario tiene un rol o un perfil específico
console.log("Rol admin:", authManager.hasRole("admin"));
console.log("Perfil editor:", authManager.hasProfile("editor"));

// Cerrar sesión
authManager.logout();
console.log("Logout exitoso");

*/

// Routes here
const Routes = {
  "/": Login,
  "/inicio": Inicio,
  "/admisiones": Admisiones,
  "/salir": () => {
    localStorage.clear();
    m.route.set('/');
  },


};

const DefaultRoute = "/";

export { Routes, DefaultRoute };