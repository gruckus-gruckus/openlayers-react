import * as React from 'react';
import { OlMap } from 'openlayers-react';

const mapOptions = {};
export const BasicMap = () => {
    return (<OlMap initialMapOptions={mapOptions}></OlMap>)
}