import React from 'react';
import olControlZoom, { Options as olZoomOptions } from 'ol/control/Zoom';
import olControl, { Options as olControlOptions } from 'ol/control/Control';
import olMap from 'ol/Map';
import { ObjectEvent } from 'ol/Object';

import { MapContext } from "../MapContext";
import { CurrentMapContext } from "../CurrentMapContext";

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

export interface ControlProps<T extends olControl, O extends Omit<olControlOptions, 'target'>> {
    controlType: { new(opts: O): T ;};
    controlProps: O;
    mapId?: string;
};

export function OlControl<T extends olControl, O>(props: ControlProps<T, O>) {

    const mapCtx = React.useContext(MapContext);
    const currentMapCtx = React.useContext(CurrentMapContext);
    const ctrlRef = React.useRef<HTMLDivElement>(null);

    let matchingMap: olMap | undefined;
    if (mapCtx && props.mapId) {
        matchingMap = mapCtx.maps.get(props.mapId);
    } else if (currentMapCtx) {
        matchingMap = currentMapCtx.map;
    }

    React.useLayoutEffect(() => {
        const ctrlInstace = new props.controlType({
            ...props.controlProps,
            target: undefined,
        });
    
        if (matchingMap) {
            matchingMap.addControl(ctrlInstace);
        }
        if (ctrlRef.current) {
            ctrlInstace.setTarget(ctrlRef.current);
        }

        return () => {
            matchingMap && matchingMap.removeControl(ctrlInstace);
        };
    }, [matchingMap]);
    return (<div ref={ctrlRef}></div>);
}