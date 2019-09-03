import React from 'react';
import olMap from 'ol/Map';

export interface MapContextProps {
    maps: Map<string, olMap>;
    registerMap: (map: olMap, id: string) => void;
}

export const MapContext = React.createContext<MapContextProps | null>(null);
