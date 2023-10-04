
class VentanaTemporizada {
    constructor(url, tiempo) {
        // Guarda los parámetros como propiedades de la instancia
        this.url = url;
        this.tiempo = tiempo;
        // Crea una variable para almacenar la referencia a la ventana
        this.ventana = null;
    }

    // Define un método para abrir la ventana
    abrir() {
        // Usa el método window.open para crear una ventana nueva con la url especificada
        this.ventana = window.open(this.url, "_blank");
        // Usa el método window.setTimeout para ejecutar una función después del tiempo especificado
        window.setTimeout(() => this.cerrar(), this.tiempo);
    }

    // Define un método para cerrar la ventana
    cerrar() {
        // Usa el método window.close para cerrar la ventana si existe
        if (this.ventana) {
            this.ventana.sessionStorage.clear();
            this.ventana.close();

            this.ventana = null;
        }
    }
}

export default VentanaTemporizada;