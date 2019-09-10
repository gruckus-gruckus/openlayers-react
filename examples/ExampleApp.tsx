import React, { ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { BasicMapExample } from "./basic";
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import 'ol/ol.css'
import { MultipleMapsExample } from './multipleMaps';
import { ChangeMapOnInteractExample } from './changeMapOnInteract';
import { ControlsOutsideMapExample } from './controlsOutsideMap';
import { CustomControlsExample } from './customControls';

  
const history = createBrowserHistory();

enum ExampleType {
    Basic,
    ControlOutsideMap,
    ModifyMap,
    MultipleMaps,
    CustomControls,
}
  
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
}));

function RootComponent() {
    const classes = useStyles();
    const [value, setValue] = React.useState(ExampleType.Basic);

    function handleChange(event: ChangeEvent<{}>, newValue: ExampleType) {
        setValue(newValue);
    }

    let TabPanel;
    switch (value) {
        case ExampleType.Basic:
            TabPanel = <BasicMapExample />;
            break;
        case ExampleType.CustomControls:
            TabPanel = <CustomControlsExample />;
            break;
        case ExampleType.ControlOutsideMap:
            TabPanel = <ControlsOutsideMapExample />;
            break;
        case ExampleType.ModifyMap:
            TabPanel = <ChangeMapOnInteractExample />;
            break;
        case ExampleType.MultipleMaps:
            TabPanel = <MultipleMapsExample />;
            break;
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Basic demo" value={ExampleType.Basic} />
                    <Tab label="Modify map demo" value={ExampleType.ModifyMap} />
                    <Tab label="Controls outside map demo" value={ExampleType.ControlOutsideMap} />
                    <Tab label="Custom Controls demo" value={ExampleType.CustomControls} />
                    <Tab label="Multiple maps demo" value={ExampleType.MultipleMaps} />
                </Tabs>
            </AppBar>
            {TabPanel}
        </div>
    )
}

ReactDOM.render(<RootComponent />, document.getElementById('appTarget'));