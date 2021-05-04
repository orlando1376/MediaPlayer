import MediaPlayer from '../MediaPlayer'

class AutoPause {
    private threshold: number;
    player: MediaPlayer;

    constructor() {
        this.threshold = 0.25; // 25%

        // dejar permanente el this a la instancia del objeto
        this.handleIntersection = this.handleIntersection.bind(this);
        this.handleVisibilitychange = this.handleVisibilitychange.bind(this);
    }

    run(player) {
        this.player = player;

        // determina cuanto tamaño del vido está visble, si se ve menos de 25% se pausa
        const observer = new IntersectionObserver(this.handleIntersection, { threshold: this.threshold });

        observer.observe(this.player.media);

        // determina si el video está en una pantalla activa, para activar o pausar el video
        document.addEventListener("visibilitychange", this.handleVisibilitychange);
    }

    private handleIntersection(entries: IntersectionObserverEntry[]) {
        const entry = entries[0];

        const isVisible = entry.intersectionRatio >= this.threshold;

        if (isVisible) {
            this.player.play();
        } else {
            this.player.pause();
        }
    }

    private handleVisibilitychange() {
        const isVisible = document.visibilityState === "visible";
        if (isVisible) {
            this.player.play();
        } else {
            this.player.pause();
        }
    }
}

export default AutoPause;