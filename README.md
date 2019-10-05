# openlayers-react

Currently, a minimal [React](https://facebook.github.io/react/) 
wrapper of [OpenLayers 5](https://openlayers.org/)
written in [TypeScript](https://www.typescriptlang.org/).

Goal is to redo the DOM rendering/resolution, and eventing purely in React components.

## Install

    npm install openlayers-react --save

## Usage

Give the Map component a ol/Map config:
    
    const mapOptions = {
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
    export const BasicMapExample = () => {
        return (<OlMap initialMapOptions={mapOptions}></OlMap>)
    }

See [Examples](./examples/) for some basic scenarios.