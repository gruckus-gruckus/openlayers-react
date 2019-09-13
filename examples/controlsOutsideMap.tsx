import * as React from 'react';
import olMap from 'ol/Map';
import olControl, { Options as ControlOptions } from 'ol/control/Control';
import TileWMS from 'ol/source/TileWMS';
import TileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import olControlZoom from 'ol/control/Zoom';
import { OlMap, OlControl, MapContext } from "openlayers-react";

interface ExampleCustomControlOpts extends ControlOptions {

}
class ExampleCustomControl extends olControl {
    constructor(opts: ExampleCustomControlOpts) {
        super(opts);
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
                <OlControl mapId={'customMap'} controlType={ExampleCustomControl} controlProps={{}} />
                <OlControl mapId={'customMap'} controlType={olControlZoom} controlProps={{}} />
            </div>
        </MapContext.Provider>
    );
}