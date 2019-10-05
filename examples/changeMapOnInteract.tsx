import * as React from 'react';
import olMap from 'ol/Map';
import TileWMS from 'ol/source/TileWMS';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import Zoom from 'ol/control/Zoom';
import ScaleLine from 'ol/control/ScaleLine';
import ZoomSlider from 'ol/control/ZoomSlider';
import { OlMap, Control, MapContext } from "openlayers-react";
import { transform } from 'ol/proj';

const mapOptions = {
    controls: [
        new ScaleLine({
            units: 'imperial'
        }),
        new Zoom(),
        new ZoomSlider(),
    ],
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
    view: new View({
        center: [0, 0],
        zoom: 4,
        projection: 'EPSG:4326'
    }),
};
export function ChangeMapOnInteractExample() {
    const maps = new Map<string, olMap>();
    const registerMap = (map: olMap, id: string) => {
        maps.set(id, map);
    };
    return (
        <MapContext.Provider value={{ maps: maps, registerMap: registerMap }}>
            <div style={{ display: "flex", flexDirection: "row", height: "100%", width: "100%",  }}>
                <div style={{ padding: "1rem" }}>
                    <div>
                        <label>
                            Change perspective
                            <select defaultValue={'EPSG:4326'} onChange={(ev) => {
                                const map = maps.get('changeMap');
                                if (map && ev.target.value) {
                                    const oldView = map.getView();
                                    const newView = new View({
                                        projection: ev.target.value,
                                        zoom: oldView.getZoom(),
                                    });
                                    const center = oldView.getCenter();
                                    if (center) {
                                        newView.setCenter(transform(center, oldView.getProjection(), newView.getProjection()));
                                    }
                                    map.setView(newView);
                                    oldView.dispose();
                                    map.render();
                                    const layer = map.getLayers().item(0) as TileLayer;
                                    const source = layer.getSource() as TileWMS;
                                    source.refresh();
                                }
                            }}>
                                <option value={"EPSG:4326"}>EPSG:4326</option>
                                <option value={"EPSG:3857"}>EPSG:3857</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div style={{ flex: "1 1 auto", }}>
                    <OlMap mapId={'changeMap'} initialMapOptions={mapOptions}></OlMap>
                </div>
            </div>
        </MapContext.Provider>
    );
}
