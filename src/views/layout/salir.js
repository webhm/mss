import m from 'mithril';

class Salir {
    oninit() {
        localStorage.clear();
        m.route.set('/');
    }
    view() {

    }
}

export default Salir;