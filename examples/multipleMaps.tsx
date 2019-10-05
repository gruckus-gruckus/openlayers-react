import * as React from 'react';
import { OlMap, MapContext } from 'openlayers-react';

import olMap from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OlView from 'ol/View';

import ZoomSliderControl from 'ol/control/ZoomSlider';
import MousePositionControl from 'ol/control/MousePosition';

const { mouseControl } = require('./basic.css');

const mapOptionsA = {
    controls: [
        new ZoomSliderControl(),
        new MousePositionControl({
            projection: 'EPSG:3857',
            className: `ol-mouse-position ${mouseControl}`
        }),
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
    view: new OlView({
        center: [934366, 5904607],
        zoom: 4,
        projection: "EPSG:3857",
    }),
};

const mapOptionsB = {
    controls: [
        new ZoomSliderControl(),
        new MousePositionControl({
            projection: 'EPSG:4326',
            className: `ol-mouse-position ${mouseControl}`
        }),
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
    view: new OlView({
        center: [8.3, 46.5],
        zoom: 4,
        projection: "EPSG:4326",
    }),
};

export function MultipleMapsExample() {
    const maps = new Map<string, olMap>();
    const registerMap = (map: olMap, id: string) => {
        maps.set(id, map);
    };

    const onClickDoubleZoomIn = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault();
        for (let map of maps.values()) {
            const view = map.getView();
            view.setZoom((view.getZoom() || 1) + 1);
        }
    };

    const onClickDoubleZoomOut = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault();
        for (let map of maps.values()) {
            const view = map.getView();
            view.setZoom((view.getZoom() || 2) - 1);
        }
    };

    return (
        <MapContext.Provider value={{ maps: maps, registerMap: registerMap }}>
            <div style={{ display: "flex", flexDirection: "row", height: "100%", width: "100%",  }}>
                <div style={{ padding: "1rem" }}>
                    <button style={{ padding: "1rem", whiteSpace: "nowrap" }} onClick={onClickDoubleZoomIn}>Double zoom +</button>
                    <button style={{ padding: "1rem", whiteSpace: "nowrap" }} onClick={onClickDoubleZoomOut}>Double zoom -</button>
                </div>
                <div style={{ flex: "1 1 auto", }}>
                    <div style={{ height: '50%', border: 'inset', boxSizing: "border-box", }}><OlMap mapId={'mapA'} initialMapOptions={mapOptionsA}></OlMap></div>
                    <div style={{ height: '50%', border: 'inset', boxSizing: "border-box", }}><OlMap mapId={'mapB'} initialMapOptions={mapOptionsB}></OlMap></div>
                </div>
            </div>
        </MapContext.Provider>
    );
}