import * as React from 'react';
import { OlMap, CurrentMapContext } from 'openlayers-react';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OlView from 'ol/View';

function ReactFullScreenControl() {
    const [isFullscreenState, setState] = React.useState(false);
    const mapCtx = React.useContext(CurrentMapContext);
    if (!mapCtx) {
         return null;
    }
    const onFullscreenClick = () => {
        if (isFullscreenState) {
            document.exitFullscreen();
        } else {
            mapCtx.map.getTargetElement().requestFullscreen();
        }
        setState(!isFullscreenState);
    };
    React.useEffect(() => {
        const fullscreenListener = () => {
            const docIsFullscreen = Boolean(document.fullscreenElement);
            if (docIsFullscreen !== isFullscreenState) {
                setState(docIsFullscreen);
            }
        };
        document.addEventListener('fullscreenchange', fullscreenListener);
        return () => {
            document.removeEventListener('fullscreenchange', fullscreenListener);
        }
    }, [mapCtx.map]);

    return (
        <button onClick={onFullscreenClick}>{!isFullscreenState ? "Show fullscreen" : "Exit fullscreen"}</button>
    );
}

const mapOptions = {
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
};
export function NonOlControlExample() {
    return (
        <OlMap initialMapOptions={mapOptions}>
            <div style={{ position: "absolute", zIndex: 1 }}><ReactFullScreenControl /></div>
        </OlMap>
    );
}