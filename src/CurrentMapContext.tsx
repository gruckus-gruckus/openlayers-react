import React from 'react';
import olMap from 'ol/Map';

export interface CurrentMapContextProps {
    map: olMap;
}
export const CurrentMapContext = React.createContext<CurrentMapContextProps | null>(null);
