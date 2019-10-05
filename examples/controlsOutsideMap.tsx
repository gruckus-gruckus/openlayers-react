import * as React from 'react';
import olMap from 'ol/Map';
import TileWMS from 'ol/source/TileWMS';
import TileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import Zoom from 'ol/control/Zoom';
import ZoomSlider from 'ol/control/ZoomSlider';
import { OlMap, Control, MapContext } from "openlayers-react";
import { MultiZoomCustomControl } from './MultiZoomCustomControl';

export function ControlsOutsideMapExample() {
    const maps = new Map<string, olMap>();
    const registerMap = (map: olMap, id: string) => {
        maps.set(id, map);
    };

    return (
        <MapContext.Provider value={{ maps: maps, registerMap: registerMap }}>
            <div style={{ position: "relative", width: '100%', height: '100%', }}>
                <div style={{ position: "absolute", width: '100%', height: '100%', zIndex: 1, }}>
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
                            enableRotation: true,
                        }),
                    }} />
                </div>
                <div style={{ position: "absolute", width: '100%', height: '100%', pointerEvents: "none", zIndex: 1, }}>
                    <Control mapId={'customMap'} controlType={Zoom} controlProps={{}} style={{ zIndex: 2, pointerEvents: "initial" }} />
                    <Control mapId={'customMap'} controlType={ZoomSlider} controlProps={{}} style={{ zIndex: 2, pointerEvents: "initial", }} />
                    <Control mapId={'customMap'} controlType={MultiZoomCustomControl} controlProps={{ zoomButtons: [1, 4, 7, 11] }} style={{ zIndex: 2, pointerEvents: "initial", }} />
                </div>
            </div>
        </MapContext.Provider>
    );
}