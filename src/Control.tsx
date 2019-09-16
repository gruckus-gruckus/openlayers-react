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

export interface ControlProps<T extends olControl, O extends Omit<olControlOptions, 'target'>> extends React.HTMLAttributes<HTMLDivElement> {
    controlType: { new(opts: O): T ;};
    controlProps: O;
    mapId?: string;
};

export function Control<T extends olControl, O>(props: ControlProps<T, O>) {
    const {
        controlType,
        controlProps,
        mapId,
        ...divProps
    } = props;

    const mapCtx = React.useContext(MapContext);
    const currentMapCtx = React.useContext(CurrentMapContext);
    const ctrlRef = React.useRef<HTMLDivElement>(null);

    let matchingMap: olMap | undefined;
    if (mapCtx && mapId) {
        matchingMap = mapCtx.maps.get(mapId);
    } else if (currentMapCtx) {
        matchingMap = currentMapCtx.map;
    }

    React.useEffect(() => {
        const ctrlInstace = new controlType({
            ...controlProps,
            target: ctrlRef.current,
        });

        if (matchingMap) {
            ctrlInstace.setMap(matchingMap);
            matchingMap.addControl(ctrlInstace);
        }

        return () => {
            matchingMap && matchingMap.removeControl(ctrlInstace);
            ctrlInstace.dispose();
        };
    }, [matchingMap]);
    return (<div ref={ctrlRef} {...divProps}></div>);
}