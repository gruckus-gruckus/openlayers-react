# openlayers-react

Currently, a minimal [React](https://facebook.github.io/react/) 
wrapper of [OpenLayers 5](https://openlayers.org/)
written in [TypeScript](https://www.typescriptlang.org/).

Goal is to redo the DOM rendering/resolution, and eventing purely in React components.

## Install

    npm install openlayers-react --save

## Usage

There are thin wrapper components to handle the rendering of Map, and Control. They do nothing else.
The CurrentMapContext allows you to do any further processing on the enclosing ol/Map, while the MapContext keeps track of any Map controls within it, and can be used for further manipulation.

See [examples](./examples/) for some basic scenarios.

Give the Map component a ol/Map config, exluding the target/element properties:
    
    const mapOptions = {
        controls: [
            new ScaleLine({ units: 'imperial' }), // You can use ol/Controls as normal
        ],
        layers: [
            new TileLayer({
                source: new TileWMS({
                    ...
                }),
            }),
        ],
        view: new OlView({
            center: [0, 0],
            zoom: 4,
        }),
    };
    export const BasicMapExample = (props) => {
        return (
            <div>
                <OlMap initialMapOptions={mapOptions} mapId={'MyMap'}>
                    {/* or you can render it with a wrapper in the enclosing map */}
                    <Control controlType={ZoomSlider} controlProps={{}} />
                </OlMap>
            </div>
        );
    }
