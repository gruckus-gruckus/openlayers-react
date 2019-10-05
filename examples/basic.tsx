import * as React from 'react';
import { OlMap } from 'openlayers-react';

import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import ScaleLineControl from 'ol/control/ScaleLine';
import ZoomSliderControl from 'ol/control/ZoomSlider';
import RotateControl from 'ol/control/Rotate';
import MousePositionControl from 'ol/control/MousePosition';
import OlView from 'ol/View';

const { mouseControl } = require('./basic.css');

const mapOptions = {
    controls: [
        new ScaleLineControl({
            units: 'imperial'
        }),
        new ZoomSliderControl(),
        new RotateControl({}),
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
        center: [0, 0],
        zoom: 4,
    }),
};
export const BasicMapExample = () => {
    return (<OlMap initialMapOptions={mapOptions}></OlMap>)
}