import React from 'react';
import OlMap from 'ol/Map';
import OlView from 'ol/View';
import { Coordinate as OlCoordinate } from 'ol/coordinate';
import OlControl from 'ol/control/Control';
import OlCollection from 'ol/Collection';
import OlBaseLayer from 'ol/layer/Base';
import OlInteraction from 'ol/interaction/Interaction';
import OlLayerGroup from 'ol/layer/Group';
import OlOverlay from 'ol/Overlay';

export function getRandomInt(min: number, max: number): number {
    const fmin = Math.ceil(min);
    const fmax = Math.floor(max);
    return Math.floor(Math.random() * (fmax - fmin)) + fmin;
}

export interface MapProps {
    id?: string;
    children: React.ReactNode;
    initialZoom: number;
    initialCenter: OlCoordinate;
    controls?: OlCollection<OlControl> | OlControl[];
    interactions?: OlCollection<OlInteraction> | OlInteraction[];
    layers?: OlBaseLayer[] | OlCollection<OlBaseLayer> | OlLayerGroup;
    overlays?: OlCollection<OlOverlay> | OlOverlay[];
}

export function Map(props: MapProps) {
    const mapId = props.id || `map${getRandomInt(100000, 999999)}`;
    const mapElement = React.useRef(null);
    React.useEffect(() => {
        const olMap = new OlMap({
            controls: props.controls,
            interactions: props.interactions,
            layers: props.layers,
            view: new OlView({
                center: props.initialCenter,
                zoom: props.initialZoom,
            }),
            target: mapId,
            overlays: props.overlays,
        })
        return function cleanup() {
            olMap.setTarget(undefined);
        };
    });
    return (
        <div id={mapId} ref={mapElement}>
            {props.children}
        </div>
    );
}