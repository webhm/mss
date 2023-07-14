class Reproductor {
    // El constructor recibe la url del xtream code y crea un elemento de video
    constructor(url) {
        this.url = url;
        this.video = document.createElement("video");
        this.video.src = this.url;
        this.video.controls = true;
    }

    // El método play inicia la reproducción del video
    play() {
        this.video.play();
    }

    // El método pause pausa la reproducción del video
    pause() {
        this.video.pause();
    }

    // El método stop detiene la reproducción del video y lo reinicia
    stop() {
        this.video.pause();
        this.video.currentTime = 0;
    }

    view() {
        return [
            m(this.video)
        ]
    }
}