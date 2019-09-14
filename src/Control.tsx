import React from 'react';
import olControl, { Options as olControlOptions } from 'ol/control/Control';
import olMap from 'ol/Map';
import { ObjectEvent } from 'ol/Object';

import { MapContext } from "./MapContext";
import { CurrentMapContext } from "./CurrentMapContext";

export interface ControlEvents {
    onchange?: (evt: Event) => void;
    onpropertychange?: (evt: ObjectEvent) => void;
}

export interface ControlProps<T extends olControl, O extends Omit<olControlOptions, 'target'>> {
    controlType: { new(opts: O): T ;};
    controlProps: O;
    mapId?: string;
};

export function Control<T extends olControl, O>(props: ControlProps<T, O>) {

    const mapCtx = React.useContext(MapContext);
    const currentMapCtx = React.useContext(CurrentMapContext);
    const ctrlRef = React.useRef<HTMLDivElement>(null);

    let matchingMap: olMap | undefined;
    if (mapCtx && props.mapId) {
        matchingMap = mapCtx.maps.get(props.mapId);
    } else if (currentMapCtx) {
        matchingMap = currentMapCtx.map;
    }

    React.useEffect(() => {
        const ctrlInstace = new props.controlType({
            ...props.controlProps,
            target: ctrlRef.current,
        });

        // if (ctrlRef.current) {
        //     ctrlInstace.setTarget(ctrlRef.current);
        // }
        if (matchingMap) {
            ctrlInstace.setMap(matchingMap);
            matchingMap.addControl(ctrlInstace);
        }

        return () => {
            matchingMap && matchingMap.removeControl(ctrlInstace);
        };
    }, [matchingMap]);
    return (<div ref={ctrlRef}></div>);
}