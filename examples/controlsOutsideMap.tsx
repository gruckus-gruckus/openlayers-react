import * as React from 'react';
import olMap from 'ol/Map';
import olControl, { Options as ControlOptions } from 'ol/control/Control';
import TileWMS from 'ol/source/TileWMS';
import TileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import olControlZoom from 'ol/control/Zoom';
import ZoomSlider from 'ol/control/ZoomSlider';
import Rotate from 'ol/control/Rotate';
import { OlMap, Control, MapContext } from "openlayers-react";

interface ExampleCustomControlOpts {
    zoomButtons: number[];
    target: HTMLDivElement;
}
class ExampleCustomControl extends olControl {
    constructor(opts: ExampleCustomControlOpts) {
        const element = document.createElement('div');
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

export function ControlsOutsideMapExample() {
    const maps = new Map<string, olMap>();
    const registerMap = (map: olMap, id: string) => {
        maps.set(id, map);
    };

    return (
        <MapContext.Provider value={{ maps: maps, registerMap: registerMap }}>
            <div>
                <OlMap mapId={'customMap'} initialMapOptions={{
                    controls: [],
                    layers: [
                        new TileLayer({
                            source: new TileWMS({
                                url: 'https://wms.geo.admin.ch/',
                                crossOrigin: 'anonymous',
                                attributions: '© <a href="http://www.geo.admin.ch/internet/geoportal/en/home.html">Pixelmap 1:1000000 / geo.admin.ch</a>',
                                params: {
                                    'LAYERS': 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',
                                    'FORMAT': 'image/jpeg'
                                },
                                serverType: 'mapserver'
                            }),
                        }),
                    ],
                    view: new OlView({
                        center: [0, 0],
                        zoom: 4,
                    }),
                }} />
            </div>
            <div>
                <Control mapId={'customMap'} controlType={olControlZoom} controlProps={{}} />
                <Control mapId={'customMap'} controlType={ZoomSlider} controlProps={{}} />
                <Control mapId={'customMap'} controlType={Rotate} controlProps={{}} />
            </div>
        </MapContext.Provider>
    );
}