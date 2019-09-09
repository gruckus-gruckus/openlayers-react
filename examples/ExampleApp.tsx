import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { BasicMap } from "./basic";

import 'ol/ol.css'

const history = createBrowserHistory();

ReactDOM.render(<BasicMap />, document.getElementById('appTarget'));