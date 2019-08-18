import React, { Ref } from 'react';
import olMap from 'ol/Map';
import { MapOptions } from 'ol/PluggableMap';
import { MapBrowserEvent, MapEvent } from 'ol';
import { ObjectEvent } from 'ol/Object';
import RenderEvent from 'ol/render/Event';

export function getRandomInt(min: number, max: number): number {
    const fmin = Math.ceil(min);
    const fmax = Math.floor(max);
    return Math.floor(Math.random() * (fmax - fmin)) + fmin;
}

export interface MapEvents {
    onchange: (evt: Event) => void;
    onchangeLayerGroup: (evt: ObjectEvent) => void;
    onchangeSize: (evt: ObjectEvent) => void;
    onchangeTarget: (evt: ObjectEvent) => void;
    onchangeView: (evt: ObjectEvent) => void;
    onclick: (evt: MapBrowserEvent) => void;
    ondblclick: (evt: MapBrowserEvent) => void;
    onmovestart: (evt: MapEvent) => void;
    onmoveend: (evt: MapEvent) => void;
    onpointerdrag: (evt: MapBrowserEvent) => void;
    onpointermove: (evt: MapBrowserEvent) => void;
    onpostcompose: (evt: RenderEvent) => void;
    onpostrender: (evt: MapEvent) => void;
    onprecompose: (evt: RenderEvent) => void;
    onpropertychange: (evt: ObjectEvent) => void;
    onrendercomplete: (evt: RenderEvent) => void;
    onsingleclick: (evt: MapBrowserEvent) => void;
}

export interface MapProps extends MapEvents {
    id?: string;
    children?: React.ReactNode;
    initialMapOptions: Omit<MapOptions, 'target'>;
}


export interface MapContextProps {
    maps: Map<string, olMap>;
}
const defaultMapContextProps: MapContextProps = {
    maps: new Map(),
}
export const MapContext = React.createContext(defaultMapContextProps);

export const OlMap = (props: MapProps & {forwardedRef?: Ref<HTMLDivElement>}) => {
    const mapId = props.id || `map${getRandomInt(100000, 999999)}`;
    const mapElementRef = props.forwardedRef || React.useRef<HTMLDivElement>(null);
    
    const mapObj = new olMap({
        controls: props.initialMapOptions.controls,
        interactions: props.initialMapOptions.interactions,
        layers: props.initialMapOptions.layers,
        view: props.initialMapOptions.view,
        overlays: props.initialMapOptions.overlays,
    });

    React.useEffect(() => {
        props.onchange && mapObj.on('change', props.onchange);
        props.onchangeLayerGroup && mapObj.on('change:layerGroup', props.onchangeLayerGroup);
        props.onchangeTarget && mapObj.on('change:target', props.onchangeTarget);
        props.onchangeView && mapObj.on('change:view', props.onchangeView);
        props.onclick && mapObj.on('click', props.onclick);
        props.ondblclick && mapObj.on('dblclick', props.ondblclick);
        props.onmovestart && mapObj.on('movestart', props.onmovestart);
        props.onmoveend && mapObj.on('moveend', props.onmoveend);
        props.onpointerdrag && mapObj.on('pointerdrag', props.onpointerdrag);
        props.onpointermove && mapObj.on('pointermove', props.onpointermove);
        props.onpostcompose && mapObj.on('postcompose', props.onpostcompose);
        props.onpostrender && mapObj.on('postrender', props.onpostrender);
        props.onprecompose && mapObj.on('precompose', props.onprecompose);
        props.onpropertychange && mapObj.on('propertychange', props.onpropertychange);
        props.onrendercomplete && mapObj.on('rendercomplete', props.onrendercomplete);
        props.onsingleclick && mapObj.on('singleclick', props.onsingleclick);
        
        mapObj.setTarget(mapId);

        return function cleanup() {
            mapObj.setTarget(undefined);
        };
    });
    
    return (
        <div id={mapId} ref={mapElementRef}>
            {props.children}
        </div>
    );
};

export const SingleMap = React.forwardRef<HTMLDivElement, MapProps>((props, ref) => (
    <MapContext.Consumer>
        {() => (
            <OlMap {...props} forwardedRef={ref}>
                {props.children}
            </OlMap>
        )}
    </MapContext.Consumer>
));
SingleMap.displayName = 'SingleMap';