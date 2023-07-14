import Admisiones from "../views/admisiones/admisiones";
import Flebotomista from "../views/flebotomista/flebotomista";
import Login from "../views/login/login";

// Routes here
const Routes = {
  "/": Login,
  "/inicio": Flebotomista,
  "/admisiones": Admisiones,
};

const DefaultRoute = "/";

export { Routes, DefaultRoute };
