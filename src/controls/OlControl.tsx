import React from 'react';
import olControlZoom, { Options as olZoomOptions } from 'ol/control/Zoom';
import olMap from 'ol/Map';
import { ObjectEvent } from 'ol/Object';

import { MapContext, CurrentMapContext } from '../Map';

export interface ControlEvents {
    onchange?: (evt: Event) => void;
    onpropertychange?: (evt: ObjectEvent) => void;
}

export interface ZoomControlProps extends Omit<olZoomOptions, 'target'>, ControlEvents {
    mapId?: string;
} 

export function ZoomControl(props: ZoomControlProps) {
    const ctrlRef = React.useRef<HTMLDivElement>(null);
    const mapCtx = React.useContext(MapContext);
    const currentMapCtx = React.useContext(CurrentMapContext);

    let matchingMap: olMap | undefined;
    if (mapCtx && props.mapId) {
        matchingMap = mapCtx.maps.get(props.mapId);
    } else if (currentMapCtx) {
        matchingMap = currentMapCtx.map;
    }

    React.useLayoutEffect(() => {
        const ctrl = new olControlZoom({
            ...props,
            target: undefined,
        });
    
        if (matchingMap) {
            matchingMap.addControl(ctrl);
            // ctrl.setMap(matchingMap);
        }
        if (ctrlRef.current) {
            ctrl.setTarget(ctrlRef.current);
        }

        return () => {
            matchingMap && matchingMap.removeControl(ctrl);
            // ctrl.setTarget(undefined);
        };
    }, [matchingMap]);
    return (<div ref={ctrlRef}></div>);
}

export const OlControl = () => {
    // TODO: Use type guards, just have one control class
    const divEle = React.createRef<HTMLDivElement>();
    return (
        <div ref={divEle}></div>
    );
}