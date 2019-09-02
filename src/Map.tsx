import React from 'react';
import olMap from 'ol/Map';
import { MapOptions } from 'ol/PluggableMap';
import { MapBrowserEvent, MapEvent } from 'ol';
import { ObjectEvent } from 'ol/Object';
import RenderEvent from 'ol/render/Event';
import { getRandomInt } from './getRandomInt';

export interface MapEvents {
    onchange?: (evt: Event) => void;
    onchangeLayerGroup?: (evt: ObjectEvent) => void;
    onchangeSize?: (evt: ObjectEvent) => void;
    onchangeTarget?: (evt: ObjectEvent) => void;
    onchangeView?: (evt: ObjectEvent) => void;
    onclick?: (evt: MapBrowserEvent) => void;
    ondblclick?: (evt: MapBrowserEvent) => void;
    onmovestart?: (evt: MapEvent) => void;
    onmoveend?: (evt: MapEvent) => void;
    onpointerdrag?: (evt: MapBrowserEvent) => void;
    onpointermove?: (evt: MapBrowserEvent) => void;
    onpostcompose?: (evt: RenderEvent) => void;
    onpostrender?: (evt: MapEvent) => void;
    onprecompose?: (evt: RenderEvent) => void;
    onpropertychange?: (evt: ObjectEvent) => void;
    onrendercomplete?: (evt: RenderEvent) => void;
    onsingleclick?: (evt: MapBrowserEvent) => void;
}

export interface MapProps extends MapEvents {
    id?: string;
    children?: React.ReactNode;
    initialMapOptions: Omit<MapOptions, 'target'>;
}


export interface CurrentMapContextProps {
    map: olMap;
}
export const CurrentMapContext = React.createContext<CurrentMapContextProps | null>(null);

export interface MapContextProps {
    maps: Map<string, olMap>;
    registerMap: (map: olMap, id: string) => void;
}
const defaultMapContextProps = null;

export const MapContext = React.createContext<MapContextProps | null>(defaultMapContextProps);

export const OlMap = (props: MapProps) => {
    const mapId = props.id || `map${getRandomInt(100000, 999999)}`;

    const mapElementRef = React.useRef<HTMLDivElement>(null);
    
    const mapObj = new olMap({
        controls: props.initialMapOptions.controls,
        interactions: props.initialMapOptions.interactions,
        layers: props.initialMapOptions.layers,
        view: props.initialMapOptions.view,
        overlays: props.initialMapOptions.overlays,
    });

    const mapContext = React.useContext(MapContext);
    if (mapContext) {
        mapContext.registerMap(mapObj, mapId);
    }

    React.useLayoutEffect(() => {
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
        
        if (mapElementRef.current) {
            mapObj.setTarget(mapElementRef.current);
        }

        return function cleanup() {
            mapObj.setTarget(undefined);
        };
    });
    
    return (
        <CurrentMapContext.Provider value={{ map: mapObj }}>
            <div id={mapId} ref={mapElementRef}>
                {props.children}
            </div>
        </CurrentMapContext.Provider>
    );
};
