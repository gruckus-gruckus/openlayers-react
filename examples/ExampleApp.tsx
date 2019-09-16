import React, { ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import 'ol/ol.css'

import { BasicMapExample } from "./basic";
import { MultipleMapsExample } from './multipleMaps';
import { ChangeMapOnInteractExample } from './changeMapOnInteract';
import { ControlsOutsideMapExample } from './controlsOutsideMap';
import { NonOlControlExample } from './nonOlControlExample';

enum ExampleType {
    Basic,
    ControlOutsideMap,
    ModifyMap,
    MultipleMaps,
    CustomControls,
    NonOlControlExample,
}
  
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    content: {
        height: '100%',
    }
}));

function RootComponent() {
    const classes = useStyles();
    const [value, setValue] = React.useState(ExampleType.Basic);

    function handleChange(event: ChangeEvent<{}>, newValue: ExampleType) {
        setValue(newValue);
    }

    let TabPanel = null;
    switch (value) {
        case ExampleType.Basic:
            TabPanel = <BasicMapExample />;
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
        case ExampleType.NonOlControlExample:
            TabPanel = <NonOlControlExample />;
            break;
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Basic demo" value={ExampleType.Basic} />
                    <Tab label="Modify map demo" value={ExampleType.ModifyMap} />
                    <Tab label="Controls outside map demo" value={ExampleType.ControlOutsideMap} />
                    <Tab label="Non-Ol control demo" value={ExampleType.NonOlControlExample} />
                    <Tab label="Multiple maps demo" value={ExampleType.MultipleMaps} />
                </Tabs>
            </AppBar>
            <div className={classes.content}>
                {TabPanel}
            </div>
        </div>
    )
}

ReactDOM.render(<RootComponent />, document.getElementById('appTarget'));