import Admisiones from "../views/admisiones/admisiones";
import Inicio from "../views/inicio/inicio";
import Login from "../views/login/login";

// Routes here
const Routes = {
  "/": Login,
  "/inicio": Inicio,
  "/admisiones": Admisiones,



};

const DefaultRoute = "/";

export { Routes, DefaultRoute };
