import olControl, { Options as ControlOptions } from 'ol/control/Control';

interface MultiZoomCustomControlOpts extends ControlOptions {
    zoomButtons: number[];
}

export class MultiZoomCustomControl extends olControl {
    constructor(opts: MultiZoomCustomControlOpts) {
        const element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.bottom = '0px';
        element.style.left = '50%';
        element.style.transform = 'translateX(-50%)';
        
        super({ target: opts.target, element });

        opts.zoomButtons.forEach((zoomLevel, index) => {
            const zoomButton = document.createElement('button');
            zoomButton.textContent = zoomLevel.toString();
            zoomButton.addEventListener("click", (ev) => {
                ev.preventDefault();
                const map = this.getMap();
                const view = map.getView();
                if (!view) {
                // the map does not have a view, so we can't act upon it
                return;
                }
                view.setZoom(zoomLevel);
            });
            element.appendChild(zoomButton);
        })
    }
}